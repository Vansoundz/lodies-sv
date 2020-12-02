// import ss from 'socket.io-stream';
// import socketClient from 'socket.io-client';
import { io } from "../socket";
import { withWaveHeader, appendBuffer } from "./wave-heared";

// const url = process.env.NODE_ENV === 'production' ?
//   `${window.location.hostname}:${window.location.port}` : `${window.location.hostname}:3001`;
// const socket = socketClient(url);

const getAudioContext = () => {
  // AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();

  return { audioContext, analyser };
};

const loadFile = ({ frequencyC, sinewaveC }, styles, props) =>
  new Promise(async (resolve, reject) => {
    try {
      const { changeAudionState, setDuration } = props;
      let source = null;
      let playWhileLoadingDuration = 0;
      let startAt = 0;
      let audioBuffer = null;
      let activeSource = null;

      // create audio context
      const { audioContext, analyser } = getAudioContext();
      const gainNode = audioContext.createGain();

      analyser.fftSize = styles.fftSize;
      let frequencyDataArray = new Uint8Array(analyser.frequencyBinCount);
      let sinewaveDataArray = new Uint8Array(analyser.fftSize);
      const frequencyСanvasCtx = frequencyC.getContext("2d");
      frequencyСanvasCtx.clearRect(0, 0, frequencyC.width, frequencyC.height);
      const sinewaveСanvasCtx = sinewaveC.getContext("2d");
      sinewaveСanvasCtx.clearRect(0, 0, sinewaveC.width, sinewaveC.height);

      // draw frequency - bar
      const drawFrequency = function () {
        analyser.getByteFrequencyData(frequencyDataArray);
        requestAnimationFrame(drawFrequency);
        frequencyСanvasCtx.fillStyle = styles.fillStyle;
        frequencyСanvasCtx.fillRect(0, 0, frequencyC.width, frequencyC.height);
        frequencyСanvasCtx.beginPath();

        const barWidth = (frequencyC.width / analyser.frequencyBinCount) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < analyser.frequencyBinCount; i++) {
          barHeight = frequencyDataArray[i];

          frequencyСanvasCtx.fillStyle = styles.strokeStyle;
          frequencyСanvasCtx.fillRect(
            x,
            frequencyC.height - barHeight / 2,
            barWidth,
            barHeight / 2
          );

          x += barWidth + 1;
        }
      };

      // draw Sinewave
      const drawSinewave = function () {
        analyser.getByteTimeDomainData(sinewaveDataArray);
        requestAnimationFrame(drawSinewave);
        sinewaveСanvasCtx.fillStyle = styles.fillStyle;
        sinewaveСanvasCtx.fillRect(0, 0, sinewaveC.width, sinewaveC.height);
        sinewaveСanvasCtx.lineWidth = styles.lineWidth;
        sinewaveСanvasCtx.strokeStyle = styles.strokeStyle;
        sinewaveСanvasCtx.beginPath();

        const sliceWidth = (sinewaveC.width * 1.0) / analyser.fftSize;
        let x = 0;

        for (let i = 0; i < analyser.fftSize; i++) {
          const v = sinewaveDataArray[i] / 128.0; // byte / 2 || 255 / 2
          const y = (v * sinewaveC.height) / 2;

          if (i === 0) {
            sinewaveСanvasCtx.moveTo(x, y);
          } else {
            sinewaveСanvasCtx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        sinewaveСanvasCtx.lineTo(sinewaveC.width, sinewaveC.height / 2);
        sinewaveСanvasCtx.stroke();
      };

      const playWhileLoading = (duration = 0) => {
        source.connect(audioContext.destination);
        source.connect(gainNode);
        source.connect(analyser);
        source.start(0, duration);
        activeSource = source;
        drawFrequency();
        drawSinewave();
      };

      const play = (resumeTime = 0) => {
        // create audio source
        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        source.connect(audioContext.destination);

        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        source.connect(analyser);
        source.start(0, resumeTime);

        drawFrequency();
        drawSinewave();
      };

      const whileLoadingInterval = setInterval(() => {
        if (startAt) {
          const inSec = (Date.now() - startAt) / 1000;
          if (playWhileLoadingDuration && inSec >= playWhileLoadingDuration) {
            playWhileLoading(playWhileLoadingDuration);
            playWhileLoadingDuration = source.buffer.duration;
          }
        } else if (source) {
          playWhileLoadingDuration = source.buffer.duration;
          startAt = Date.now();
          playWhileLoading();
        }
      }, 500);

      const stop = () => source && source.stop(0);
      const setVolume = (level) =>
        gainNode.gain.setValueAtTime(level, audioContext.currentTime);

      // load file while socket
      //  socket.emit('track', (e) => {});
      //  io.on('song', (stream, { stat }) => {

      io.on("song", async (data) => {
        let rate = 0;
        let isData = false;
        const audioBufferChunk = await audioContext.decodeAudioData(
          withWaveHeader(data.buffers, 2, 44100)
        );
        const newaudioBuffer =
          source && source.buffer
            ? appendBuffer(source.buffer, audioBufferChunk, audioContext)
            : audioBufferChunk;
        source = audioContext.createBufferSource();
        source.buffer = newaudioBuffer;

        //  const loadRate = (data.length * 100 ) / stat.size;
        //  rate = rate + loadRate;
        //  changeAudionState({ loadingProcess: rate, startedAt: startAt });

        if (rate >= 100) {
          clearInterval(whileLoadingInterval);
          audioBuffer = source.buffer;
          const inSec = (Date.now() - startAt) / 1000;
          activeSource.stop();
          play(inSec);
          resolve({ play, stop, setVolume });
        }
        isData = true;
        // first time load
        //  && rate === loadRate
        if (isData) {
          // (100 / loadRate) *
          const duration = audioBufferChunk.duration;
          setDuration(duration);
        }
      });
      //  });
    } catch (e) {
      reject(e);
    }
  });

export { getAudioContext, loadFile };
