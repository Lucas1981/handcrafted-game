export class Music {
  offset = 0;
  audioCtx: AudioContext;
  trackSource: AudioBufferSourceNode | null = null;

  constructor() {
    this.audioCtx = new AudioContext();
  }

  playTrack() {
    if (this.trackSource === null) {
      throw new Error("Music track not loaded");
    }

    if (this.offset === 0) {
      this.trackSource.start();
      this.offset = this.audioCtx.currentTime;
    } else {
      this.trackSource.start(0, this.audioCtx.currentTime - this.offset);
    }
  }

  runAutoplayPolicy() {
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  pauseTrack() {
    this.trackSource?.stop();
  }

  resetTrack() {
    this.offset = 0;
  }

  async loadTrack(filepath: string) {
    const response = await fetch(`./assets/music/${filepath}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
    this.trackSource = this.audioCtx.createBufferSource();
    this.trackSource.buffer = audioBuffer;
    this.trackSource.connect(this.audioCtx.destination);
  }
}
