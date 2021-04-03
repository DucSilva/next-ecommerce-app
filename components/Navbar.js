
import React from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';


function Navbar() {
    const router = useRouter();
    const isActive = (r) => {
        if (r === router?.pathname) {
            return " active"
        } else { return "" }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">E-commerce</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav p-1">
                    <li className="nav-item">
                        <Link href="/cart">
                            <a className={"nav-link" + isActive('/cart')}>
                                <i className="fa fa-shopping-cart" aria-hidden="true">
                                    <span className="position-absolute"
                                        style={{
                                            padding: '3px 6px',
                                            background: '#ed143dc2',
                                            borderRadius: '50%',
                                            top: '-10px',
                                            right: '-10px',
                                            color: 'white',
                                            fontSize: '14px'
                                        }}>
                                        {/* {cart.length} */}
                                    </span>
                                </i> Cart
                        </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/signin">
                            <a className={"nav-link" + isActive("/signin")}>
                                <i className="fa fa-user-secret" aria-hidden="true"></i> Sign in
                            </a>
                        </Link>
                    </li>
                    {/* {
                        Object.keys(auth).length === 0
                            ? <li className="nav-item">
                                <Link href="/signin">
                                    <a className={"nav-link" + isActive('/signin')}>
                                        <i className="fas fa-user" aria-hidden="true"></i> Sign in
                            </a>
                                </Link>
                            </li>
                            : loggedRouter()
                    } */}
                </ul>
            </div>
        </nav>
    )
}

Navbar.propTypes = {

}

export default Navbar
