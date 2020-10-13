import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';

export const Nav: FC = () => {
  return (
    <nav>
      <NavLink exact to="/form" activeClassName="is-active">
        Add Position
      </NavLink>
      <NavLink exact to="/" activeClassName="is-active">
        Pie Chart
      </NavLink>
    </nav>
  );
};
