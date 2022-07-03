import { useContext } from "react";
import React, { useEffect } from "react";
import { InputRefContext } from "../Context/InputRefContext/InputRefContext";
import { IsHeaderOpenContext } from "../Context/IsHeaderOpen/IsHeaderOpenContext";

const CloseMenuByPageClick = (pageRef: React.RefObject<HTMLElement>): void => {
  const inputRef = useContext(InputRefContext);
  const { isHeaderOpen, dispatchHeader } = useContext(IsHeaderOpenContext);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;
    const closeMenu = (): void => {

      inputRef.current.checked = false;
      dispatchHeader({ type: "TOGGLE_ISHEADEROPEN" });
    };
    if (!isHeaderOpen) {
      page.removeEventListener("click", closeMenu);
      return;
    }

    page.addEventListener("click", closeMenu);

    return () => {
      page.removeEventListener("click", closeMenu);
    };
  }, [inputRef, isHeaderOpen, dispatchHeader, pageRef]);
};

export default CloseMenuByPageClick;
