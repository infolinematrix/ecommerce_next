"use client";

import React, { useState, createContext, useContext, useRef } from "react";
import { set } from "zod";
import { create } from "zustand";

//==========================================================================================
//-- type store

const createTypeStore = (state: any | null) =>
  create((set) => {
    return {
      ...state,

      add_property: (index: number) => {
        console.log("Property Deleted..", state.properties);
      },

      delete_property: (index: number) =>
        set((state: any) => ({
          properties: [
            ...state.properties.slice(0, index),
            ...state.properties.slice(index + 1),
          ],
        })),
    };
  });

const TypeContext = createContext<ReturnType<typeof createTypeStore> | null>(
  null
);

export const useTypeStore = () => {
  if (!TypeContext)
    throw new Error("useType must be used within a TypeProvider");

  return useContext(TypeContext)!;
};

export const TypeProvider = ({
  initState,
  children,
}: {
  initState: any;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createTypeStore(initState));

  return <TypeContext.Provider value={store}>{children}</TypeContext.Provider>;
};
