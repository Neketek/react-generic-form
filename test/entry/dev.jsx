import ReactDOM from "react-dom";
import React from "react";
import Root from "src/index";


const render = (Component)=>{
  ReactDOM.render(<Component/>, document.getElementById('root'));
}


render(Root);
if(module.hot){
  module.hot.accept("src/index", ()=>{
    const NextRoot = require('src/index').default;
    render(NextRoot);
  });
}
