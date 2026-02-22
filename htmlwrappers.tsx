import React, { createElement, JSX } from "react"

export class HTMLElements {
  title: keyof JSX.IntrinsicElements;
  prop: Record<string, unknown>;
  children: React.ReactNode| React.ReactNode[]=null;

  constructor(
    title: keyof JSX.IntrinsicElements,
    prop: Record<string, unknown> = {},
    children: React.ReactNode| React.ReactNode[] = null
  ) {
    this.title = title;
    this.prop = prop;
    this.children = children;
  }

  toJSX(): React.ReactElement {
    return React.createElement(this.title, this.prop, this.children);
  }
}

// usage
//const inner = new HTMLElements("span", "Inner text");
//const outer = new HTMLElements("div", { className: "box" },inner.toJSX());

//const jsx = outer.toJSX(); // <div class="box"><span>Inner text</span></div>
export function divWrapperElements(elements:React.ReactElement[],divprop:Record<string,unknown>,angleStep=0){
  const group: React.ReactElement[] = [];
  let angle = 0;

  for (const element of elements) {
    const propsWithRotation = {
      ...divprop,
      style: {
        ...(divprop.style as Record<string, unknown>),
        transform: `rotate(${angle}deg)`,
        transformOrigin: "center",
      },
    };

    group.push(new HTMLElements("div", propsWithRotation, element).toJSX());
    angle += angleStep;
  }
  return group
}

export function divWrap(
  element: React.ReactElement | React.ReactElement[],
  style: React.CSSProperties = {}
) {
  return createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...style,
      },
    },
    element
  );
}