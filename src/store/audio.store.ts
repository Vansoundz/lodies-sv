import { writable } from "svelte/store";
import type { Track } from "../models/track.model";

interface AudioStore {
  audio: HTMLAudioElement;
  current?: Track;
  loading: boolean;
}

const createStore = () => {
  const { subscribe, update, set } = writable<AudioStore>({
    audio: undefined,
    current: undefined,
    loading: false,
  });

  return {
    subscribe,
    createPlayer: () =>
      set({ audio: new Audio(), current: undefined, loading: false }),
    selectTrack: (track: Track) =>
      update(({ audio, current }) => {
        if (current?._id !== track._id) {
          audio.src = track.source;
          current = track;
        }

        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }

        return {
          audio,
          current,
          loading: false,
        };
      }),
    playOrPause: () =>
      update((state) => {
        const { audio } = state;

        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
        return {
          ...state,
          loading: false,
        };
      }),
    updateTime: (time: number) =>
      update((state) => {
        const { audio } = state;
        audio.currentTime = time;
        return { ...state };
      }),
  };
};

export const audioStore = createStore();
