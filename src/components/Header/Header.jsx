import "./Header.scss";
import logolev from "../../assets/photos/logolev.png";
import { NavLink, useLocation } from "react-router-dom";
import { InputRefContext } from "../../Context/InputRefContext/InputRefContext";
import { useContext } from "react";
import { IsHeaderOpenContext } from "../../Context/IsHeaderOpen/IsHeaderOpenContext";

const mountedStyle = {
  animation: "inAnimation 250ms ease-in",
};
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out",
  animationFillMode: "forwards",
};

export const Header = () => {
  const { pathname } = useLocation();
  const inputRef = useContext(InputRefContext);
  const { isHeaderOpen, dispatchHeader } = useContext(IsHeaderOpenContext);

  const isAdmin = true;

  const closeMenu = () => {
    dispatchHeader({ type: "TOGGLE_ISHEADEROPEN" });
    inputRef.current.checked = false;
  };

  return (
    <div className="header-container">
      <div className="logo">
        <img src={logolev} alt="" />
      </div>
      <input
        ref={inputRef}
        id="menu-toggle"
        type="checkbox"
        onClick={() => {
          dispatchHeader({ type: "TOGGLE_ISHEADEROPEN" });
        }}
      />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
        <li activeclassname="selected">
          <NavLink onClick={closeMenu} to="/shop">
            להזמנות
          </NavLink>
        </li>
        <li activeclassname="selected">
          <NavLink onClick={closeMenu} to="/about">
            קצת עלינו
          </NavLink>
        </li>
        <li activeclassname="selected">
          <NavLink onClick={closeMenu} to="/donates">
            לתרומות
          </NavLink>
        </li>
        {isAdmin && (
          <li activeclassname="selected">
            <NavLink onClick={closeMenu} to="/admin">
              אדמין פאנל
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
