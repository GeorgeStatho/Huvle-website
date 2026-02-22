import React, { createElement, JSX } from "react"
import { createRoot } from "react-dom/client";
import { HTMLElements, divWrapperElements, divWrap } from "./htmlwrappers.js";



const ellipse = new HTMLElements("ellipse", {
  cx: 66,
  cy: 53.5,
  fill: "var(--fill-0, #D9D9D9)",
  rx: 40,
  ry: 39.5,
});

const rect=new HTMLElements("rect",{fill: "var(--fill-0, #D9D9D9)", height: 19 ,width: 83 ,x: 62 ,y: 44})


function createCircRect(x:number,y:number){
    let group=[];
    let shape=new HTMLElements("rect",{fill: "var(--fill-0, #D9D9D9)",height: 19 ,width: 83 ,x: x ,y: y});
    group.push(shape.toJSX());
    shape=new HTMLElements("ellipse", {cx: x,cy: y,fill: "var(--fill-0, #D9D9D9)",rx: 40,ry: 39.5,});
    group.push(shape.toJSX());
    return new HTMLElements("g", { clipPath: "url(#clip0)" }, group).toJSX();
}




function createCircRectCol(x: number, y: number, count: number): React.ReactElement[] {
  const svgs: React.ReactElement[] = [];
  let svgElement:React.ReactElement;
  for (let i = 0; i < count; i++) {
    svgElement=
      new HTMLElements(
        "svg",
        { width: 200, height: 114 },[createCircRect(x, y)]).toJSX();

      svgs.push(svgElement);
  }

  return svgs;
}



const svgColumn=createCircRectCol(66,53.5,6)

let leftCircles=divWrapperElements(svgColumn,{
      style: {width: 127,display: "inline-block",alignSelf: "flex-end" }
    },50)

const rightCircles = divWrapperElements(
  svgColumn,
  { style: { width: 127, display: "inline-block", alignSelf: "flex-end" } },
  50
);

const root = createRoot(document.getElementById("root")!);
root.render(
  createElement(
    "div",
    {
      style: {
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
      },
    },
    divWrap(leftCircles, { alignItems: "flex-start" }),
    divWrap(rightCircles, { transform: "scaleX(-1)", transformOrigin: "center" })
  )
);