import React from "react";

function Pre(props) {
  return (
    <div id={props.load ? "preloader" : "preloader-none"} className="flex items-end justify-center h-screen">
      <p className="text-4xl text-white mb-60">{props.text}</p>
    </div>
  )
}

export default Pre;
