import { api } from "../api/tracks.api";
import type { Track } from "../models/track.model";

const getTracks = async () => {
  try {
    let resp = (await api.getTracks()).data;
    return resp;
  } catch (error) {
    return {};
  }
};

const createTrack = async ({
  audio,
  cover,
  track,
}: {
  track: Track;
  cover: File;
  audio: File;
}) => {
  try {
    let form = new FormData();
    form.append("title", track.title);
    form.append("type", track.type);
    form.append("cover", cover);
    form.append("track", audio);

    let data = (await api.createTrack(form)).data;
    return data;
  } catch (error) {
    console.log(error.response);
    return {};
  }
};

export { getTracks, createTrack };
