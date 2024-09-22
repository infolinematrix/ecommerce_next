//---Content Type Store
"use client";

import { create } from "zustand";
import React, { useState, createContext, useContext } from "react";

const CategoryStore = (state: any | null) =>
  create((set) => {
    return {
      ...state,
    };
  });

const CategoryContext = createContext<ReturnType<typeof CategoryStore> | null>(
  null
);

export const CategoryStoreProvider = ({
  initState,
  children,
}: {
  initState: any;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => CategoryStore(initState));
  console.log("---Initial State--------", initState);

  return (
    <CategoryContext.Provider value={store}>
      {children}
    </CategoryContext.Provider>
  );
};

//--handler
export const useType = () => {
  if (!CategoryContext)
    throw new Error("useType must be used within a TypeProvider");

  return useContext(CategoryContext)!;
};
