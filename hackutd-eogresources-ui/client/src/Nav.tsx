import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">HackUTD - eogresources</Link>
                    <Link className="navbar-brand" to="/raw">View Data</Link>
                </div>
            </nav>
        </header>
    );
}

export default Nav;
