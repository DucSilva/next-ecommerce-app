import React from 'react'
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Notify from './Notify'

function Layout({ children }) {
    return (
        <div className="container">
            <Navbar />
            <Notify />
            {children}
        </div>
    )
}

Layout.propTypes = {

}

export default Layout
