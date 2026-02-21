import React, { createElement } from "react"
import { createRoot } from "react-dom/client";
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

const svgTemplate = new HTMLElements(
  "svg",
  {
    className: "block size-full",
    fill: "none",
    preserveAspectRatio: "none",
    viewBox: "0 0 127 114",
    width: 127,
    height: 114,
    style: { display: "block", marginBottom: 12 },
  },
  [
    new HTMLElements(
      "g",
      { clipPath: "url(#clip0_16_178)" },
      [
        new HTMLElements("ellipse", {
          cx: 66,
          cy: 53.5,
          fill: "var(--fill-0, #D9D9D9)",
          rx: 40,
          ry: 39.5,
        }),
        new HTMLElements("rect", {
          fill: "var(--fill-0, #D9D9D9)",
          height: 19,
          width: 83,
          x: 62,
          y: 44,
        }),
      ]
    ),
    new HTMLElements("defs", {}, [
      new HTMLElements("clipPath", { id: "clip0_16_178" }, [
        new HTMLElements("rect", {
          fill: "white",
          height: 114,
          width: 127,
        }),
      ]),
    ]),
  ]
);

const svgColumn: React.ReactElement[] = [];
for (let i = 0; i < 5; i++) {
  groupHTMlElements(svgColumn, [svgTemplate], `svg-${i}`);
}

const root = createRoot(document.getElementById("root")!);
root.render(createElement("div", null, svgColumn));
oot(document.getElementById("root")!);
root.render(svg);