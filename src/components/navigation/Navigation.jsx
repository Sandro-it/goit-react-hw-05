import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  const location = useLocation();

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.navLinkItem, isActive && css.active);
  };

  return (
    <nav className={css.navigationContainer}>
      <NavLink
        to="/"
        className={buildLinkClass({ isActive: location.pathname === "/" })}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={buildLinkClass({
          isActive: location.pathname.includes("/movies"),
        })}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
