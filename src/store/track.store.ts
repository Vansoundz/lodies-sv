import { writable } from "svelte/store";

const createStore = () => {
  const { subscribe, update } = writable({ name: "", uploaded: 0 });

  return {
    subscribe,
    upload: (name: string, value: number) =>
      update(() => {
        return {
          name,
          uploaded: value,
        };
      }),
  };
};

export const uploadStore = createStore();
