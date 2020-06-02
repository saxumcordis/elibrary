import React from 'react';
import Styles from '../Styles/styles.css';

const Favorites = () => {
    const[visible, setVisibility] = React.useState(true);

    return (
        visible ?
        <div className="favorites_main">
            <h1>Favorites</h1>
        </div>
            :
            ""
    )
}

export {Favorites}