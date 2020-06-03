import React from 'react';
import Styles from '../Styles/styles.css';

const Fav = (props) => {
    return (
        <article>
            <h1>{props.book.name}</h1>
            <button onClick={() => {remove(props.book.id); props.setFavs(true);}}>Удалить</button>
        </article>
    )
}

const remove = id => {
    let favs = JSON.parse(localStorage.getItem('favs'));
    let removeIndex = favs.findIndex(e => e['id'] == id);
    favs.splice(removeIndex, 1);
    console.log(favs);
    localStorage.setItem('favs', JSON.stringify(favs));
};

const Favorites = () => {
    const [favs, setFavs] = React.useState(JSON.parse(localStorage.getItem('favs')));
    console.log(favs);
    return (
    <article>
        <h1>Избранное</h1>
        {favs ?
            <ul>
                {favs.map(book => (
                    <li key={book.id}>
                        <Fav book={book} favs={favs} setFavs={setFavs}/>
                    </li>
                ))}
            </ul>
            : null
        }
    </article>
    )
};

export {Favorites}