import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <SignUp
      path={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      afterSignUpUrl={"/home"}
    />
  );
};

export default SignUpPage;
