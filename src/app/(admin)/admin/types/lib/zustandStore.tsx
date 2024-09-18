"use client";
import React, { useState, createContext, useContext } from "react";
import { create } from "zustand";

const createStore = (count: number) =>
  create<{
    count: number;
    setCount: (cart: number) => void;
  }>((set) => ({
    count,
    setCount(count: number) {
      set({ count });
    },
  }));

const CountContext = createContext<ReturnType<typeof createStore> | null>(null);

export const useCount = () => {
  if (!CountContext)
    throw new Error("useCount must be used within a CountProvider");
  return useContext(CountContext)!;
};

const CountProvider = ({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(count));
  return (
    <CountContext.Provider value={store}>{children}</CountContext.Provider>
  );
};

export default CountProvider;

//==========================================================================================
//-- type store

const createTypeStore = (state: null) => {};

const TypeContext = createContext<ReturnType<typeof createTypeStore>>;

export const useType = () => {
  if (!TypeContext)
    throw new Error("useType must be used within a TypeProvider");
  return useContext(CountContext)!;
};

export const TypeProvider = ({
  initState,
  children,
}: {
  initState: any;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(initState));
  return (
    <CountContext.Provider value={store}>{children}</CountContext.Provider>
  );
};
