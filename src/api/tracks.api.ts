import Axios from "axios";
import { uploadStore } from "../store/track.store";

export const api = {
  getTracks() {
    return Axios.get(`http://localhost:5000/api/tracks`);
  },

  createTrack(track: FormData) {
    return Axios.post(`/api/tracks`, track, {
      onUploadProgress: function (e) {
        const value = (e.loaded / e.total) * 100;
        uploadStore.upload(track.get("title").toString(), value);
      },
    });
  },
};
