"use client";

import { count } from "console";
import { useCart } from "./lib/store";

export default function TypeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  useCart.setState({
    count: 1,
  });
  return <div>{children}</div>;
}
