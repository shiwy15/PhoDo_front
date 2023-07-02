import React from "react";
function Pre(props) {
  return( 
  <div id={props.load ? "preloader" : "preloader-none"}>
    {props.text}
  </div>
  )
}

export default Pre;
