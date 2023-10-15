import React from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/images/logo.svg';

const Header = () => {
    return (
        <header>
            <Link to="/" className='brand'>
                <img src={logo} alt="Logo" />
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            Profil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            Réglage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            Communauté
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;