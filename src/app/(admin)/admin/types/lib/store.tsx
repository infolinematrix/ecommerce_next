"use client";
import { attributes } from "@/db/schema/attributes";
import { stat } from "fs";
import { createContext, ReactNode, useContext, useRef } from "react";
import { any } from "zod";
import { create, useStore, StateCreator, createStore } from "zustand";

interface Props {
  children: React.ReactNode;

  props: any;
}

export default function StoreProvider({ props, children }: Props) {
  //--initial state
  useTypes.setState({
    attributes: props.attributes && [],
  });

  // console.log(props.attributes, "---PROPS");

  // ...
  return <>{children}</>;
}

export const useTypes = create((set, get): any => ({
  // attributes: [],

  // attributes: get().attributes
  // attributes: set((state: any) => {
  //   return state?.initialState.attributes && [];
  // }),
  // properties: set((state: any) => {
  //   state.initailState?.properties && [];
  // }),
  // type_attributes: [],

  add: () => set((state: any) => ({ count: state.count + 1 })),

  attribute_remove: (index: number) =>
    set((state: any) => ({
      type_attributes: [
        ...state.type_attributes.slice(0, index),
        ...state.type_attributes.slice(index + 1),
      ],
    })),

  attribute_add: (item: any) => set((state: any) => ({})),
}));

//================VANILLA========================//
// import { createStore } from "zustand";

// export type TypesState = {
//   count: number;
// };

// export type TypesActions = {
//   decrementCount: () => void;
//   incrementCount: () => void;
// };

// export type TypesStore = TypesState & TypesActions;

// //--Init
// export const initTypesStore = (): TypesState => {
//   return { count: 2 };
// };
// export const defaultInitState: TypesState = {
//   count: 12,
// };

// export const createTypeStore = (initState: TypesState = defaultInitState) => {
//   return createStore<TypesStore>()((set) => ({
//     ...initState,
//     decrementCount: () => set((state) => ({ count: state.count - 1 })),
//     incrementCount: () => set((state) => ({ count: state.count + 1 })),
//   }));
// };

// //==========================================

// export type TypesStoreApi = ReturnType<typeof createTypeStore>;

// export const TypesStoreContext = createContext<TypesStoreApi | undefined>(
//   undefined
// );

// export interface TypesStoreProviderProps {
//   children: ReactNode;
// }

// export const TypesStoreProvider = ({ children }: TypesStoreProviderProps) => {
//   const storeRef = useRef<TypesStoreApi>();
//   if (!storeRef.current) {
//     storeRef.current = createTypeStore(initTypesStore());
//   }

//   return (
//     <TypesStoreContext.Provider value={storeRef.current}>
//       {children}
//     </TypesStoreContext.Provider>
//   );
// };

// export const useTypesStore = <T,>(selector: (store: TypesStore) => T): T => {
//   const typesStoreContext = useContext(TypesStoreContext);

//   if (!typesStoreContext) {
//     throw new Error(`useStore must be used within StoreProvider`);
//   }

//   return useStore(typesStoreContext, selector);
// };
