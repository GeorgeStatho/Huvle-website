import React, { createElement } from "react"
import { createRoot } from "react-dom/client";
import {JSX } from "react"
class HTMLElements {
  name: keyof JSX.IntrinsicElements;
  prop: Record<string, unknown>;
  children: HTMLElements[];

  constructor(
    name: keyof JSX.IntrinsicElements,
    prop: Record<string, unknown> = {},
    children: HTMLElements[] = []
  ) {
    this.name = name;
    this.prop = prop;
    this.children = children;
  }
}

function renderElement(element: HTMLElements, key: string): React.ReactElement {
  const children = element.children.map((child, index) =>
    renderElement(child, `${key}-${index}`)
  );
  return createElement(element.name, { key, ...element.prop }, children);
}

function groupHTMlElements(
  parent: React.ReactElement[],
  elements: HTMLElements[],
  keyPrefix = "el"
) {
  for (let i = 0; i < elements.length; i++) {
    parent.push(renderElement(elements[i], `${keyPrefix}-${i}`));
  }
}

function buildSvg(angle: number, index: number) {
  const clipId = `clip_${index}`;
  return new HTMLElements(
    "svg",
    { viewBox: "0 0 127 114", width: 127, height: 114 },
    [
      new HTMLElements("g", { clipPath: `url(#${clipId})` }, [
        new HTMLElements("ellipse", { cx: 66, cy: 53.5, rx: 40, ry: 39.5, fill: "#D9D9D9" }),
        new HTMLElements("g", { transform: `rotate(${angle} 66 53.5)` }, [
          new HTMLElements("rect", { x: 62, y: 44, width: 83, height: 19, fill: "#D9D9D9" })
        ])
      ]),
      new HTMLElements("defs", {}, [
        new HTMLElements("clipPath", { id: clipId }, [
          new HTMLElements("rect", { width: 127, height: 114, fill: "white" })
        ])
      ])
    ]
  );
}

const angles = [0, 25, 50, 75, 100];
const svgColumn: React.ReactElement[] = [];

angles.forEach((angle, i) => {
  svgColumn.push(renderElement(buildSvg(angle, i), `svg-${i}`));
});

const root = createRoot(document.getElementById("root")!);
root.render(
  createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: 12 } },
    svgColumn
  )
);
