import { Button } from '@mui/material';
import { WalletConnection } from 'near-api-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { FaHome, FaTasks, FaPlus, FaSignInAlt, FaSignOutAlt, FaInfoCircle } from 'react-icons/fa'
import { IoMdApps } from 'react-icons/io'
import { APP_NAME, CONTRACT_NAME } from '../../app/appConfig';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter();
  const signIn = () => {
    window.walletConnection.requestSignIn(CONTRACT_NAME, APP_NAME);
  }
  const signOut_ = () => {
    window.walletConnection.signOut();
    window.location.reload()
  }
  useEffect(() => {
    if (window.walletConnection) {
      const loggedinstatus = window.walletConnection.isSignedIn()
      setLoggedIn(loggedinstatus)
    }
  }, [])
  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Near ToDo App</a>
        <button className="navbar-toggler shadow-none outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <IoMdApps />
        </button>
        <div className="collapse navbar-collapse custom-bg" id="navbarSupportedContent">
          <ul className="navbar-nav mx-start mx-md-auto mb-2 mb-lg-0">
            <li className="nav-item me-md-4">
              <Link href={"/"}>
                <a className={`nav-link ${router.pathname === '/' && 'active'}`} aria-current="page" href="#">
                  <span>
                    <FaHome />
                  </span>
                  <span className='ms-1'>Home</span>
                </a>
              </Link>
            </li>
            {
              loggedIn && (
                <>
                  <li className="nav-item me-md-4">
                    <Link href={"/todos"}>
                      <a className={`nav-link ${router.pathname === '/todos' && 'active'}`} href="#">
                        <span>
                          <FaTasks />
                        </span>
                        <span className='ms-1'>Todos</span>
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item me-md-4">
                    <Link href={"/addtodo"}>
                      <a className={`nav-link ${router.pathname === '/addtodo' && 'active'}`} href="#" aria-disabled="true">
                        <span>
                          <FaPlus />
                        </span>
                        <span className='ms-1'>Add Todo</span>
                      </a>
                    </Link>
                  </li>
                </>
              )
            }
            <li className="nav-item me-md-4">
              <Link href={"/about"}>
                <a className={`nav-link ${router.pathname === '/about' && 'active'}`} href="#" aria-disabled="true">
                  <span>
                    <FaInfoCircle />
                  </span>
                  <span className='ms-1'>About</span>
                </a>
              </Link>
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