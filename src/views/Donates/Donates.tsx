import { useEffect, useRef } from "react";
import CloseMenuByPageClick from "../../hooks/CloseMenuByPageClick";

import "./Donates.scss";

export const Donates = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  // This style is for testing the close menu on "page" click, REMOVE after styling this page
  const testStyle = { marginTop: "100px", height: "1000px" };

  CloseMenuByPageClick(pageRef);

  return (
    <div style={testStyle} ref={pageRef} className="donates-container">
      <h1>עזרו לנו לכלכל את המשפחות</h1>
      <div>Pai or grahp to show some data</div>
      <div>table of all donates, dates? names? </div>
    </div>
  );
};
