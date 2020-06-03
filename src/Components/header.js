import React from 'react';
import Styles from '../Styles/styles.css';
import {Favorites} from './favorites.js';


const Header = (props) => {
    return (
        <nav className="header_nav">
            <h1>Welcome to the lib</h1>
            <button onClick={() => props.setVisibility(!props.favVisibility)}>Избранное</button>
            {props.favVisibility ?
                <Favorites className="favorites"></Favorites>
                : null
            }
        </nav>
    )
}

export {Header}