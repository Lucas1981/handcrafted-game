const DEBUG = false;

export class Input {
  keys: Record<string, boolean> = {};

  constructor() {
    window.addEventListener("keyup", this.handleKeyup.bind(this));
    window.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  handleKeyup(e: KeyboardEvent) {
    this.keys[e.key] = false;
  }

  handleKeydown(e: KeyboardEvent) {
    if (DEBUG) {
      console.log(e.key);
    }

    this.keys[e.key] = true;
  }

  getKeyStatus(key: string) {
    return this.keys[key];
  }

  get up() {
    return this.keys["ArrowUp"];
  }

  get down() {
    return this.keys["ArrowDown"];
  }

  get left() {
    return this.keys["ArrowLeft"];
  }

  get right() {
    return this.keys["ArrowRight"];
  }

  get spaceBar() {
    return this.keys[" "];
  }
}
