import { writable } from "svelte/store";
import type { User } from "../models/user.model";

const createStore = () => {
  const { subscribe, update } = writable<{
    user?: User;
    loading: boolean;
  }>({
    user: undefined,
    loading: true,
  });

  return {
    subscribe,
    login: (user: User) =>
      update(() => ({
        loading: false,
        user,
      })),
    logout: () => update(() => ({ user: undefined, loading: false })),
  };
};

export const auth = createStore();
