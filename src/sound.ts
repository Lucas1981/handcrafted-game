const sounds: Record<string, string> = {
  bump: "bump.mp3",
};

const CHANNELS = 8;

export enum Sounds {
  bump = "bump",
}

export class Sound {
  queue: Sounds[] = [];
  promises: Promise<unknown>[] = [];
  sounds: Record<string, HTMLAudioElement> = {};
  channels: HTMLAudioElement[] = [];
  channelIndex: number = 0;

  constructor() {
    this.loadSounds();
    this.initiateChannels();
  }

  loadSounds() {
    for (const [key, value] of Object.entries(sounds)) {
      try {
        const audio = new Audio();
        audio.src = `./assets/sounds/${value}`;
        const promise = new Promise(
          (resolve) => (audio.oncanplaythrough = resolve),
        );
        this.promises.push(promise);
        this.sounds[key] = audio;
      } catch {
        throw new Error(`Could not load sound: ${key}`);
      }
    }
  }

  initiateChannels() {
    for (let i = 0; i < CHANNELS; i++) {
      this.channels[i] = new Audio();
    }
  }

  loaded() {
    return Promise.all(this.promises);
  }

  enqueue(sound: Sounds) {
    console.log("enqueueing ", sound);
    this.queue.push(sound);
  }

  playSounds() {
    let sound = this.queue.pop();
    while (sound) {
      this.playSound(sound);
      sound = this.queue.pop();
    }
  }

  playSound(sound: Sounds) {
    switch (sound) {
      case Sounds.bump:
        this.channels[this.channelIndex].src = this.sounds[Sounds.bump].src;
        this.channels[this.channelIndex].play();
        break;
      default:
        throw new Error("Unknown sound");
    }

    this.channelIndex = (this.channelIndex + 1) % CHANNELS;
  }
}
