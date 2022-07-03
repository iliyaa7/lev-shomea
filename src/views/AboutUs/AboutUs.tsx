import { useRef } from "react";
import CloseMenuByPageClick from "../../hooks/CloseMenuByPageClick";
import "./AboutUs.scss";

export const AboutUs: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  // This style is for testing the close menu on "page" click, REMOVE after styling this page
  const testStyle = { marginTop: "100px", height: "1000px" };
  CloseMenuByPageClick(pageRef);

  return (
    <div style={testStyle} ref={pageRef}>
      AboutUs - Pictures, text and paragraph
    </div>
  );
};
