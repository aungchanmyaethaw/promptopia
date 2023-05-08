"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { DefaultSession } from "next-auth";

interface ProviderProps {
  children: ReactNode;
  session?: DefaultSession;
}

export default function Provider({ children, session }: ProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
