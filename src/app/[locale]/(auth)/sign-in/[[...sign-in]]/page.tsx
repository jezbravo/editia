import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return <SignIn path={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />;
};

export default SignInPage;
