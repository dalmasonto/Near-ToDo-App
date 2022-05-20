import { Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { FaHome, FaTasks, FaPlus, FaSignInAlt, FaSignOutAlt, FaInfoCircle } from 'react-icons/fa'
import { IoMdApps } from 'react-icons/io'
import { APP_NAME, CONTRACT_NAME } from '../../app/appConfig';
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

const CustomNavLink = ({ navlink, iconvisible }) => {
  let resolved = useResolvedPath(navlink.link);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={navlink.link}
      className={`nav-link ${match ? "active" : " "
        }`}
    >
      {iconvisible && <span>{navlink.icon}</span>}
      <span className="ms-2">{navlink.name}</span>
    </NavLink>
  );
};

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const signIn = () => {
    window.walletConnection.requestSignIn(CONTRACT_NAME, APP_NAME);
  }
  const signOut_ = () => {
    window.walletConnection.signOut();
    window.location.reload()
  }
  useEffect(() => {
    setTimeout(() => {
      if (window.walletConnection) {
        const loggedinstatus = window.walletConnection.isSignedIn()
        setLoggedIn(loggedinstatus)
      }
    }, 5000)
  }, [])
  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Near ToDo App</a>
        <button className="navbar-toggler shadow-none outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <IoMdApps />
        </button>
        <div className="collapse navbar-collapse custom-bg" id="navbarSupportedContent">
          <ul className="navbar-nav mx-start mx-md-auto mb-2 mb-lg-0">
            <li className="nav-item me-md-4">
              <CustomNavLink navlink={{ link: "/", name: 'Home', icon: <FaHome /> }} iconvisible={true} />
            </li>
            {
              loggedIn && (
                <>
                  <li className="nav-item me-md-4">
                    <CustomNavLink navlink={{ link: "/todos", name: 'Todos', icon: <FaTasks /> }} iconvisible={true} />
                  </li>
                  <li className="nav-item me-md-4">
                    <CustomNavLink navlink={{ link: "/addtodo", name: 'Add Todo', icon: <FaPlus /> }} iconvisible={true} />
                  </li>
                </>
              )
            }
            <li className="nav-item me-md-4">
              <CustomNavLink navlink={{ link: "/about", name: 'About', icon: <FaInfoCircle /> }} iconvisible={true} />
            </li>
          </ul>
          <div className="ms-auto">
            {
              loggedIn ? (
                <Button className="nav-btn" onClick={signOut_}>
                  <FaSignOutAlt />
                  <span className='ms-2'>
                    Sign Out
                  </span>
                </Button>
              ) : (
                <Button className="nav-btn" onClick={signIn}>
                  <FaSignInAlt />
                  <span className='ms-2'>
                    Get Started
                  </span>
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar