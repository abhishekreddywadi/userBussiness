import React from "react";
import "./loader.scss";

function Loader({ loaderHeading }) {
  return (
    <>
      <div class="loader"></div>
      <p className="mt-4 mb-0 text-center">{loaderHeading}</p>
    </>
  );
}

export default Loader;
