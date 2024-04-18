import { NextRequest } from "next/server";
import crypto from "crypto";
import { handlePayment } from "@/lib/actions/transaction.actions";

// Función para extraer los parámetros de la consulta de la URL
function extractQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = url.split("?")[1]; // Obtener la cadena de consulta de la URL
  if (queryString) {
    const pairs = queryString.split("&"); // Dividir los pares clave=valor
    pairs.forEach((pair) => {
      const [key, value] = pair.split("="); // Separar clave y valor
      params[key] = decodeURIComponent(value); // Decodificar y asignar valor al objeto de parámetros
    });
  }
  return params;
}

// Función para extraer la firma del encabezado
function extractSignature(req: NextRequest): string | undefined {
  return req.headers.get("x-signature") as string | undefined;
}

// Función para extraer el ID de solicitud del encabezado
function extractRequestId(req: NextRequest): string | undefined {
  return req.headers.get("x-request-id") as string | undefined;
}

// Función para extraer el timestamp de la firma del encabezado
function extractTs(signature: string) {
  const parts = signature.split(","); // Dividir la firma en partes
  let ts = "";

  for (const part of parts) {
    const [key, value] = part.split("="); // Separar cada parte en clave y valor
    if (key === "ts") {
      ts = value;
    }
  }
  return ts;
}

// Función para verificar la firma HMAC
function verifyHmac(
  signature: string,
  secret: string,
  manifest: string,
): boolean {
  const parts = signature.split(","); // Dividir la firma en partes
  let ts = "";
  let hash = "";

  for (const part of parts) {
    const [key, value] = part.split("="); // Separar cada parte en clave y valor
    if (key === "ts") {
      ts = value; // Obtener el valor de 'ts' (timestamp)
      console.log("ts: ", ts);
    } else if (key === "v1") {
      hash = value; // Obtener el valor de 'v1' (clave encriptada)
      console.log("hash: ", hash);
      console.log("hash-length: ", hash.length);
    }
  }

  // Crear la firma HMAC utilizando el módulo crypto
  const sha = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");
  console.log("sha: ", sha); //contraclave
  console.log("sha-length: ", sha.length);
  if (sha === hash) {
    console.log("----- Validation has been successful -----");
  } else {
    console.log("----- Validation has not been passed -----");
  }
  return sha === hash; // Devolver true si la firma es válida, false de lo contrario
}

// Controlador de ruta /validation
export async function POST(req: NextRequest) {
  const body = await req.json();
  const signature = extractSignature(req); // Extraer la firma del encabezado
  const requestId = extractRequestId(req); // Extraer el ID de solicitud del encabezado
  const queryParams = req.url ? extractQueryParams(req.url) : {}; // Extraer los parámetros de la consulta
  const ts = extractTs(signature!); //Extraer el ts de la firma del encabezado

  // Verificar que todos los datos necesarios estén presentes en la solicitud
  if (!signature || !requestId || !queryParams["data.id"]) {
    return Response.json({ success: false }); // Finalizar la respuesta con un mensaje de error
  }

  const secret = process.env.MP_WEBHOOK_SECRET!;
  const manifest = `id:${queryParams["data.id"]};request-id:${requestId};ts:${ts};`; // Crear el manifiesto de datos

  // Verificar la firma HMAC
  if (verifyHmac(signature, secret, manifest)) {
    handlePayment(body);
    return Response.json({ success: true }); // Finalizar la respuesta con un mensaje de éxito
  } else {
    return Response.json({ success: false }); // Finalizar la respuesta con un mensaje de error
  }
}
