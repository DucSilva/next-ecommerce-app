import React from 'react'
import PropTypes from 'prop-types';
import Navbar from './Navbar';

function Layout({ children }) {
    return (
        <div className="container">
            <Navbar />
            {children}
        </div>
    )
}

Layout.propTypes = {

}

export default Layout
