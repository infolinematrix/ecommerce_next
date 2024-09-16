"use client";
import { create } from "zustand";

interface Props {
  children: React.ReactNode;
  data: any;
}

export default function StoreProvider({ data, children }: Props) {
  //--initial state
  useTypes.setState({
    attributes: data,
  });

  // ...
  return <>{children}</>;
}

export const useTypes = create((set): any => ({
  attributes: [],
  type_attributes: [],
  add: () => set((state: any) => ({ count: state.count + 1 })),

  attribute_remove: (index: number) =>
    set((state: any) => ({
      type_attributes: [
        ...state.type_attributes.slice(0, index),
        ...state.type_attributes.slice(index + 1),
      ],
    })),
}));
