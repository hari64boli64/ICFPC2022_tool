import { H, XY, Rect, RGBA, copy_data } from "./util";

const INPUT = document.getElementById("input") as HTMLCanvasElement;
const INPUT_ctx = INPUT.getContext("2d") as CanvasRenderingContext2D;
const INPUT_RECT = document.getElementById("input_rect") as HTMLCanvasElement;
const INPUT_RECT_ctx = INPUT_RECT.getContext("2d") as CanvasRenderingContext2D;
const OUTPUT = document.getElementById("output") as HTMLCanvasElement;
const OUTPUT_ctx = OUTPUT.getContext("2d") as CanvasRenderingContext2D;

const SEED_INPUT = document.getElementById("seed") as HTMLInputElement;
const X_LOG = document.getElementById("X") as HTMLElement;
const Y_LOG = document.getElementById("Y") as HTMLElement;
const TD_HOVERD_COLOR = document.getElementById("hovered-color") as HTMLDataElement;
const TD_SELECTED_COLOR = document.getElementById("selected-color") as HTMLDataElement;
const OK_BUTTON = document.getElementById("ok_button") as HTMLInputElement;
const BACK_BUTTON = document.getElementById("back_button") as HTMLInputElement;
const CLEAR_BUTTON = document.getElementById("clear_button") as HTMLInputElement;
const DOWNLOAD_BUTTON = document.getElementById("download_button") as HTMLInputElement;
const RES = document.getElementById("output_data") as HTMLElement;
const RES_NUM = document.getElementById("output_data_num") as HTMLElement;

let seed = 1;
const img = new Image();
img.crossOrigin = "anonymous";
img.src = `/ICFPC2022_tool/input/${seed}.png`;

img.addEventListener("load", () => {
  INPUT_ctx.drawImage(img, 0, 0);
  img.style.display = "none";
});

SEED_INPUT.addEventListener("change", (event: Event) => {
  const { target } = event;
  if (!(target instanceof HTMLInputElement)) {
    throw new Error("AssertionError");
  }
  if (RES.children.length > 1) {
    if (!confirm("ok?")) {
      return;
    }
  }
  seed = parseInt(target.value, 10);
  img.src = `/ICFPC2022_tool/input/${seed}.png`;
  INPUT_ctx.drawImage(img, 0, 0);
  CLEAR_BUTTON.click();
});

let selected_rgba = new RGBA(255, 255, 255, 255);
function pick(event: MouseEvent, destination: HTMLDataElement, is_select: boolean) {
  const bounding = INPUT.getBoundingClientRect();
  const x = event.clientX - bounding.left;
  const y = event.clientY - bounding.top;
  const pixel = INPUT_ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;
  const rgba = new RGBA(data[0], data[1], data[2], data[3]);
  if (is_select) {
    selected_rgba = rgba;
  }
  destination.style.background = rgba.to_str();
  return rgba;
}

INPUT_RECT_ctx.setLineDash([5, 2]);

let orig: XY | undefined = undefined;
let now: XY | undefined = undefined;
let rect: Rect | undefined = undefined;

window.onmouseup = (event) => {
  if (orig === undefined || now === undefined) return;
  rect = new Rect(new XY(orig.x, orig.y, true), new XY(now.x, now.y, true));
  orig = undefined;
};
INPUT_RECT.addEventListener("mousedown", (event) => {
  orig = new XY(event.offsetX, event.offsetY);
});
INPUT_RECT.addEventListener("mousemove", (event) => {
  now = new XY(event.offsetX, event.offsetY);
  X_LOG.innerText = now.x.toString();
  Y_LOG.innerText = now.y.toString();
  pick(event, TD_HOVERD_COLOR, false);
  if (orig !== undefined) {
    INPUT_RECT_ctx.strokeStyle = "#ff0000";
    INPUT_RECT_ctx.lineWidth = 2;
    INPUT_RECT_ctx.clearRect(0, 0, INPUT_RECT.width, INPUT_RECT.height);
    INPUT_RECT_ctx.beginPath();
    INPUT_RECT_ctx.rect(orig.x, orig.y, now.x - orig.x, now.y - orig.y);
    INPUT_RECT_ctx.stroke();
  }
});
INPUT_RECT.addEventListener(
  "contextmenu",
  (event) => {
    event.preventDefault();
    pick(event, TD_SELECTED_COLOR, true);
    return false;
  },
  false
);

let operation_list: { color: string; rect: Rect }[] = [];
let res_len = 0;

OK_BUTTON.addEventListener("click", (event) => {
  if (rect === undefined) {
    alert("orig is undefined");
    return;
  }
  OUTPUT_ctx.fillStyle = selected_rgba.to_str();
  OUTPUT_ctx.fillRect(
    rect.xy1.x,
    H - 1 - rect.xy1.y,
    rect.xy2.x - rect.xy1.x,
    -rect.xy2.y + rect.xy1.y
  );
  operation_list.push({ color: selected_rgba.to_str(), rect });
  const child = document.createElement("div");
  child.innerText += rect.to_str() + " " + selected_rgba.to_str_for_output();
  child.style.color = selected_rgba.to_str();
  RES.appendChild(child);
  res_len++;
  RES_NUM.innerText = res_len.toString();
});
BACK_BUTTON.addEventListener("click", () => {
  now = undefined;
  orig = undefined;
  INPUT_RECT_ctx.clearRect(0, 0, INPUT_RECT.width, INPUT_RECT.height);
  OUTPUT_ctx.clearRect(0, 0, OUTPUT.width, OUTPUT.height);
  if (RES.children.length == 1 || !operation_list.length) {
    return;
  }
  RES.removeChild(RES.lastChild as HTMLElement);
  operation_list.pop();
  operation_list.forEach((op) => {
    OUTPUT_ctx.fillStyle = op.color;
    OUTPUT_ctx.fillRect(
      op.rect.xy1.x,
      H - 1 - op.rect.xy1.y,
      op.rect.xy2.x - op.rect.xy1.x,
      -op.rect.xy2.y + op.rect.xy1.y
    );
  });
  res_len--;
  RES_NUM.innerText = res_len.toString();
});
CLEAR_BUTTON.addEventListener("click", () => {
  while (RES.children.length > 1) {
    RES.removeChild(RES.lastChild as HTMLElement);
  }
  operation_list.length = 0;
  now = undefined;
  orig = undefined;
  INPUT_RECT_ctx.clearRect(0, 0, INPUT_RECT.width, INPUT_RECT.height);
  OUTPUT_ctx.clearRect(0, 0, OUTPUT.width, OUTPUT.height);
  res_len = 0;
  RES_NUM.innerText = res_len.toString();
});
window.onkeydown = function (event) {
  if (event.key === " ") {
    event.preventDefault();
    OK_BUTTON.click();
  }
  if (event.ctrlKey && event.key === "z") {
    event.preventDefault();
    BACK_BUTTON.click();
  }
  if (event.ctrlKey && event.key === "q") {
    event.preventDefault();
    CLEAR_BUTTON.click();
  }
};
DOWNLOAD_BUTTON.addEventListener("click", () => {
  copy_data();
});
