"use client";

import { useState } from "react";

// import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function AdminProviders({ children }: Props) {
  const [data, setData] = useState("Started ... Admin Root Provider");

  // console.log(data);

  return <>{children}</>;
}
