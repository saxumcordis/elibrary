import React from 'react';
import {Favorites} from './favorites.js';


const Header = (props) => {
    return (
        <nav className="header_nav">
            <h1>Welcome to the lib</h1>
            <button onClick={() => props.setVisibility(!props.favVisibility)}>Избранное (показать/скрыть)</button>
            {props.favVisibility ?
                <Favorites className="favorites"/>
                : null
            }
        </nav>
    )
}

export {Header}