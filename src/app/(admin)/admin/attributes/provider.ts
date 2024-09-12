"use client";

import { createContext, useContext } from "react";

export const AttributeContext = createContext<any>({});

// Make useAttributeContext Hook to easily use our context throughout the application
export function useAttributeContext() {
  return useContext(AttributeContext);
}
