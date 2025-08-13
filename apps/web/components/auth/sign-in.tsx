"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("github");
    } finally {
      //
    }
  };
  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      className="relative"
      loading={loading}
      onClick={handleSignIn}
    >
      <FaGithub />
      Sign in with GitHub
    </Button>
  );
}
