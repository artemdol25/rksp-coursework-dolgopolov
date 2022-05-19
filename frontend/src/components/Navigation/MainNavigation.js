import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>Система для онлайн-записи на мероприятия</h1>
            <h3>Долгополов Артём, ИКБО-02-19</h3>
          </div>
          <nav className="main-navigation__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth">Авторизация</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">Мероприятия</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/bookings">Записи</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Выход</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;