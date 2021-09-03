import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink exact to="/" className={s.nav_link} activeClassName={s.nav_link__active}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.nav_link} activeClassName={s.nav_link__active}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
