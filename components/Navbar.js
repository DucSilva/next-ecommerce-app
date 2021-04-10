
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState';
import Cookie from 'js-cookie';


function Navbar() {
    const router = useRouter();
    const { state, dispatch } = React.useContext(DataContext);
    const {auth, cart} = state;
    const isActive = (r) => {
        if (r === router?.pathname) {
            return " active"
        } else { return "" }
    }

    React.useEffect(() => {
        if(Object.keys(auth).length !== 0) router.push("/")
        else router.push("/signin")
    }, [auth])

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin');
        dispatch({ type: 'AUTH', payload: { } })
        dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })
    }

    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth?.user?.avatar} alt={auth?.user?.avatar} 
                    style={{
                        borderRadius: '50%', width: '30px', height: '30px',
                        transform: 'translateY(-3px)', marginRight: '3px'
                    }} /> {auth?.user?.name}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            </li>
        )
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
                                <i className="fa fa-shopping-cart position-relative" aria-hidden="true">
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
                                        {cart.length}
                                    </span>
                                </i> Cart
                        </a>
                        </Link>
                    </li>
                    {
                        Object.keys(auth).length === 0
                            ? <li className="nav-item">
                                <Link href="/signin">
                                    <a className={"nav-link" + isActive("/signin")}>
                                        <i className="fa fa-user-secret" aria-hidden="true"></i> Sign in
                                    </a>
                                </Link>
                            </li>
                            : loggedRouter()
                    }
                </ul>
            </div>
        </nav>
    )
}

Navbar.propTypes = {

}

export default Navbar
