import React, { createElement } from "react";
import { createRoot } from "react-dom/client";
class HTMLElements {
    constructor(title, prop = {}, children = null) {
        this.children = null;
        this.title = title;
        this.prop = prop;
        this.children = children;
    }
    toJSX() {
        return React.createElement(this.title, this.prop, this.children);
    }
}
// usage
//const inner = new HTMLElements("span", "Inner text");
//const outer = new HTMLElements("div", { className: "box" },inner.toJSX());
//const jsx = outer.toJSX(); // <div class="box"><span>Inner text</span></div>
const ellipse = new HTMLElements("ellipse", {
    cx: 66,
    cy: 53.5,
    fill: "var(--fill-0, #D9D9D9)",
    rx: 40,
    ry: 39.5,
});
const rect = new HTMLElements("rect", { fill: "var(--fill-0, #D9D9D9)", height: 19, width: 83, x: 62, y: 44 });
function createCircRect(x, y, angle) {
    let group = [];
    let shape = new HTMLElements("rect", { fill: "var(--fill-0, #D9D9D9)", transform: `rotate(${angle} ${x} ${y})`, height: 19, width: 83, x: x, y: y });
    group.push(shape.toJSX());
    shape = new HTMLElements("ellipse", { cx: x, cy: y, fill: "var(--fill-0, #D9D9D9)", rx: 40, ry: 39.5, });
    group.push(shape.toJSX());
    return new HTMLElements("g", { clipPath: "url(#clip0)" }, group).toJSX();
}
function createCircRectCol(x, y, angle_rotation, count) {
    const svgs = [];
    let angle = 0;
    for (let i = 0; i < count; i++) {
        svgs.push(new HTMLElements("svg", { width: 200, height: 114 }, [createCircRect(x, y, angle)]).toJSX());
        angle += angle_rotation;
    }
    return svgs;
}
const svgColumn = createCircRectCol(66, 53.5, 30, 6);
const root = createRoot(document.getElementById("root"));
root.render(createElement("div", { style: { height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" } }, svgColumn));
