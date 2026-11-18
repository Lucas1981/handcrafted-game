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
    console.log(e.key);
    this.keys[e.key] = true;
  }

  getKeyStatus(key: string) {
    return this.keys[key];
  }
}
