import React, { createElement } from "react"
import { createRoot } from "react-dom/client";

class HTMLElements{
  
  name:string;
  prop:Record<string,unknown>
  constructor(name:string,prop:Record<string,unknown>){
    this.name=name;
    this.prop=prop;
  }
}



let circleprop= new HTMLElements("circle",{cx:66, cy:53.5, fill:"var(--fill-0,  #D9D9D9)", rx:40, ry:39.5 });
let rectprop=new HTMLElements("rect",{fill:"var(--fill-0,  #D9D9D9)", height:19, width:83, x:62, y:44});


const circle_shape: React.ReactElement[] = [];

function groupHTMlElements(parent:React.ReactElement[],elements:HTMLElements[],count=0,prop:any=null,amount=0){
    for(const element of elements){
      parent.push(
        createElement(element.name, {
          key: `${element.name}-${count}`,
          ...element.prop,
        }));
        //check if there is a propety to change each loop, primarily to change position of shapes
      if(prop!=null){
      element.prop = { ...element.prop, prop: (element.prop as any).prop + amount };
      }
      count++;
    }
}


function createCircleCol(num:number){
  let circleprop= new HTMLElements("circle",{cx:66, cy:53.5, fill:"var(--fill-0,  #D9D9D9)", rx:40, ry:39.5 });
  let rectprop=new HTMLElements("rect",{fill:"var(--fill-0,  #D9D9D9)", height:19, width:83, x:62, y:44});
  let gprop=new HTMLElements("g",{clipPath:"url(#clip0_16_178)"});
  let defsprop= new HTMLElements("defs",{});
  let clipprop=new HTMLElements("clickPath",{});
  let rectprop2= new HTMLElements("rect",{fill:"white" ,height:114 ,width:127})

  const circle_shape: React.ReactElement[] = [];
  
  for(let i=0;i<num;i++){
    groupHTMlElements()
  }
}



const svg = createElement("svg", { width: 200, height: 200 }, circle_shape);

const root = createRoot(document.getElementById("root")!);
root.render(svg);