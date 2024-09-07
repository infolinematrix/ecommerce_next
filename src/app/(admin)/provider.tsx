"use client";

import { useState } from "react";

// import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const [data, setData] = useState("Admin Root Provider");

  console.log("Provider service started.....", data);

  return <>{children}</>;
}
