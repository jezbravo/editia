import { NextRequest } from "next/server";
import crypto from "crypto";
import { handlePayment } from "@/src/lib/actions/transaction.actions";

// Function to extract query parameters from URL
function extractQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = url.split("?")[1]; // Get query string from URL
  if (queryString) {
    const pairs = queryString.split("&"); // Split key=value pairs
    pairs.forEach((pair) => {
      const [key, value] = pair.split("="); // Separate key and value
      params[key] = decodeURIComponent(value); // Decode and assign value to parameters object
    });
  }
  return params;
}

// Function to extract header signature
function extractSignature(req: NextRequest): string | undefined {
  return req.headers.get("x-signature") as string | undefined;
}

// Function to extract request id from header
function extractRequestId(req: NextRequest): string | undefined {
  return req.headers.get("x-request-id") as string | undefined;
}

// Function to extract timestamp from header signature
function extractTs(signature: string) {
  const parts = signature.split(","); // Split the signature into parts
  let ts = "";

  for (const part of parts) {
    const [key, value] = part.split("="); // Separate each part into key and value
    if (key === "ts") {
      ts = value;
    }
  }
  return ts;
}

// Function to verify HMAC signature
function verifyHmac(
  signature: string,
  secret: string,
  manifest: string,
): boolean {
  const parts = signature.split(","); // Split the signature into parts
  let ts = "";
  let hash = "";

  for (const part of parts) {
    const [key, value] = part.split("="); // Separate each part into key and value
    if (key === "ts") {
      ts = value; // Get the value of 'ts' (timestamp)
      console.log("ts: ", ts);
    } else if (key === "v1") {
      hash = value; // Get the value of 'v1' (encrypted key)
      console.log("hash: ", hash);
      console.log("hash-length: ", hash.length);
    }
  }

  // Create HMAC signature using crypto module
  const sha = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");
  console.log("sha: ", sha); // Counterkey
  console.log("sha-length: ", sha.length);
  if (sha === hash) {
    console.log("----- Validation has been successful -----");
  } else {
    console.log("----- Validation has not been passed -----");
  }
  return sha === hash; // Return true if the signature is valid, false otherwise
}

// '/mp_validation' route handler
export async function POST(req: NextRequest) {
  const body = await req.json();
  const signature = extractSignature(req); // Extract header signature
  const requestId = extractRequestId(req); // Extract request id from header
  const queryParams = req.url ? extractQueryParams(req.url) : {}; // Extract query parameters
  const ts = extractTs(signature!); // Extract ts from header signature

  // Verify that all necessary data is present in the application
  if (!signature || !requestId || !queryParams["data.id"]) {
    return Response.json({ success: false }); // End the response with an error message
  }

  const secret = process.env.MP_WEBHOOK_SECRET!;
  const manifest = `id:${queryParams["data.id"]};request-id:${requestId};ts:${ts};`; // Create the data manifest

  // Verify HMAC Signature
  if (verifyHmac(signature, secret, manifest)) {
    handlePayment(body); //Redirect to payment controller
    return Response.json({ success: true }); // End the response with a success message
  } else {
    return Response.json({ success: false }); // End the response with an error message
  }
}
