import React from 'react';
import Styles from '../Styles/styles.css';
import {Favorites} from './favorites.js';


const Header = () => {
    return (
        <nav className="header_nav">
            <h1>Welcome to the lib</h1>
            <button onClick={Favorites()}>Favorites</button>
        </nav>
    )
}

export {Header}