export const H: number = 400;
export const W: number = 400;
export class XY {
  x: number;
  y: number;
  constructor(x: number, y: number, should_rev: boolean = false) {
    this.x = x;
    this.y = should_rev ? H - 1 - y : y;
    if (this.x < 10) {
      this.x = 0;
    }
    if (this.x > W - 10) {
      this.x = W;
    }
    if (this.y < 10) {
      this.y = 0;
    }
    if (this.y > H - 10) {
      this.y = H;
    }
  }
}
export class Rect {
  xy1: XY;
  xy2: XY;
  constructor(xy1: XY, xy2: XY) {
    this.xy1 = new XY(Math.min(xy1.x, xy2.x), Math.min(xy1.y, xy2.y));
    this.xy2 = new XY(Math.max(xy1.x, xy2.x), Math.max(xy1.y, xy2.y));
  }
  to_str() {
    return `${this.xy1.x} ${this.xy1.y} ${this.xy2.x} ${this.xy2.y}`;
  }
}
export class RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  to_str() {
    return `rgba(${this.r},${this.g},${this.b},${this.a / 255})`;
  }
  to_str_for_output() {
    return `${this.r} ${this.g} ${this.b} ${this.a}`;
  }
}

// https://stackoverflow.com/questions/71873824/copy-text-to-clipboard-cannot-read-properties-of-undefined-reading-writetext
function unsecuredCopyToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    // WARNING deprecated
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
}

export function copy_data() {
  unsecuredCopyToClipboard((document.getElementById("output_data") as HTMLElement).innerText);
}
