// Zustand Store

// import { createStore } from "zustand/vanilla";
import { useRef } from "react";
import { createStore } from "zustand";

export type CounterState = {
  count: number;
};
export type CounterActions = {
  add: () => void;
  delete: () => void;
};
export type CounterStoreApi = CounterState & CounterActions;
export const defaultInitState: CounterState = {
  count: 0,
};
export const createCounterStore = (
  initState: CounterState = defaultInitState
) => {
  return createStore<CounterStoreApi>()((set) => ({
    ...initState,
    add: () => set((state) => ({ count: state.count - 1 })),
    delete: () => set((state) => ({ count: state.count + 1 })),
  }));
};

// export const useTypes = createStore((set) => ({
//   count: 0,
//   // addToCart: () => set((state: any) => ({ count: state.count + 1 })),
//   // removeAllCart: () => set({ count: 0 }),
// }));

// export const TypesStoreProvider = ({ children }: any) => {
//   const storeRef = useRef<CounterStoreApi>();

//   if (!storeRef.current) {
//     storeRef.current = createCounterStore(initCounterStore());
//   }

//   return (
//     <CounterStoreContext.Provider value={storeRef.current}>
//       {children}
//     </CounterStoreContext.Provider>
//   );
// };
