import { createElement } from "react";
import { createRoot } from "react-dom/client";
let circleprop = { cx: 66, cy: 53.5, fill: "var(--fill-0,  #D9D9D9)", rx: 40, ry: 39.5 };
let rectprop = { fill: "var(--fill-0,  #D9D9D9)", height: 19, width: 83, x: 62, y: 44 };
const circle_shape = [];
for (let i = 0; i < 5; i++) {
    circle_shape.push(createElement("rect", {
        key: `r-${i}`,
        ...rectprop,
    }));
    circle_shape.push(createElement("ellipse", {
        key: `e-${i}`,
        ...circleprop,
    }));
    circleprop = { ...circleprop, cy: circleprop.cy + 60 };
    rectprop = { ...rectprop, y: rectprop.y + 60 };
}
const svg = createElement("svg", { width: 200, height: 200 }, circle_shape);
const root = createRoot(document.getElementById("root"));
root.render(svg);
