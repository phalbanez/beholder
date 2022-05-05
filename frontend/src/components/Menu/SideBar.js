import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { doLogout } from '../../services/AuthService';
import SideBarItem from './SideBarItem';

function SideBar() {
  const history = useHistory();

  function cleanAndRedirect() {
    localStorage.removeItem('token');
    history.push('/');
  }

  function onLogoutClick(event) {
    doLogout(localStorage.getItem('token'))
      .then((response) => cleanAndRedirect())
      .catch((error) => {
        console.error(error);
        cleanAndRedirect();
      });
  }

  return (
    <nav
      id="sidebarMenu"
      className="sidebar d-lg-block bg-gray-800 text-white collapse"
      datasimplebar="true"
    >
      <div className="sidebar-inner px-4 pt-3">
        <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
          <div className="collapse-close d-md-none">
            <a
              href="#sidebarMenu"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <svg
                className="icon icon-xs"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <ul className="nav flex-column pt-3 pt-md-0">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className="nav-link d-flex align-items-center"
            >
              <span className="sidebar-icon">
                <img
                  src="/img/favicon/favicon-32x32.png"
                  height="32"
                  width="32"
                  alt="Beholder Logo"
                />
              </span>
              <span className="mt-1 ms-1 sidebar-text">Beholder 2.0</span>
            </Link>
          </li>
          <li className="nav-item">
            <span
              className="nav-link collapsed d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              data-bs-target="#submenu-intelligence"
            >
              <span>
                <span className="sidebar-icon">
                  <svg
                    className="icon icon-xs me-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                </span>
                <span className="sidebar-text">Intelligence</span>
              </span>
              <span className="link-arrow">
                <svg
                  className="icon icon-sm"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </span>
            <div
              className="multi-level collapse"
              role="list"
              id="submenu-intelligence"
            >
              <ul className="flex-column nav">
                <SideBarItem to="/dashboard" text="Dashboard" />
                <SideBarItem to="/reports" text="Reports" />
                <SideBarItem to="/wallet" text="Wallet" />
              </ul>
            </div>
          </li>
          <SideBarItem to="/orders" text="Orders">
            <svg
              className="icon icon-xs me-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </SideBarItem>
          <SideBarItem to="/automations" text="Automations">
            <svg
              className="icon icon-xs me-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </SideBarItem>
          <li className="nav-item">
            <span
              className="nav-link collapsed d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              data-bs-target="#submenu-templates"
            >
              <span>
                <span className="sidebar-icon">
                  <svg
                    className="icon icon-xs me-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </span>
                <span className="sidebar-text">Action Templates</span>
              </span>
              <span className="link-arrow">
                <svg
                  className="icon icon-sm"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </span>
            <div
              className="multi-level collapse"
              role="list"
              id="submenu-templates"
            >
              <ul className="flex-column nav">
                <SideBarItem to="/orderTemplates" text="Order" />
                <SideBarItem to="/withdrawTemplates" text="Withdraw" />
              </ul>
            </div>
          </li>
          <SideBarItem to="/monitors" text="Monitors">
            <svg
              className="icon icon-xs me-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                clipRule="evenodd"
              />
            </svg>
          </SideBarItem>

          <li className="nav-item">
            <span
              className="nav-link collapsed d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              data-bs-target="#submenu-settings"
            >
              <span>
                <span className="sidebar-icon">
                  <svg
                    className="icon icon-xs me-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="sidebar-text">Settings</span>
              </span>
              <span className="link-arrow">
                <svg
                  className="icon icon-sm"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </span>
            <div
              className="multi-level collapse"
              role="list"
              id="submenu-settings"
            >
              <ul className="flex-column nav">
                <SideBarItem to="/settings" text="Personal" />
                <SideBarItem to="/symbols" text="Symbols" />
              </ul>
            </div>
          </li>
          <li
            role="separator"
            className="dropdown-divider mt-4 mb-3 border-gray-700"
          ></li>
          <SideBarItem to="/" text="Logout" onClick={onLogoutClick}>
            <svg
              className="icon icon-xs me-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
          </SideBarItem>
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
