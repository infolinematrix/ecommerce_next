"use client";

import { create } from "zustand";
import React, { useState, createContext, useContext } from "react";

const createAttributeStore = (state: any | null) =>
  create((set) => {
    return {
      ...state,
      add_value: (value: string) => {
        console.log("Property Deleted..", value);

        set((state: any) => ({
          values: [...state.values, value],
        }));
      },
      reset_values: () => {
        set((state: any) => ({
          values: [],
        }));
      },
      delete_value: (index: number) =>
        set((state: any) => ({
          values: [
            ...state.values.slice(0, index),
            ...state.values.slice(index + 1),
          ],
        })),
    };
  });

const AttributeContext = createContext<ReturnType<
  typeof createAttributeStore
> | null>(null);

export const useAttriubteStore = () => {
  if (!AttributeContext)
    throw new Error("useType must be used within a TypeProvider");

  return useContext(AttributeContext)!;
};

export const AttriubteStoreProvider = ({
  initState,
  children,
}: {
  initState: any;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createAttributeStore(initState));
  console.log("---Initial State--------", store);

  return (
    <AttributeContext.Provider value={store}>
      {children}
    </AttributeContext.Provider>
  );
};
