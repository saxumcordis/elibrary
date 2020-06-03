import React from 'react';
import Styles from '../Styles/styles.css';

const Fav = (props) => {
    return (
        <article>
            <h1>{props.book.name}</h1>
            <h3>Rate: {props.book.rate}</h3>
            <button onClick={() => {remove(props.book.id); props.setFavs(JSON.parse(localStorage.getItem('favs')));}}>Удалить</button>
        </article>
    )
}

const remove = id => {
    let favs = JSON.parse(localStorage.getItem('favs'));
    let removeIndex = favs.findIndex(e => e['id'] == id);
    favs.splice(removeIndex, 1);
    localStorage.setItem('favs', JSON.stringify(favs));
};

const Favorites = () => {
    const [favs, setFavs] = React.useState(JSON.parse(localStorage.getItem('favs')));
    return (
    <article>
        <h1>Избранное</h1>
        {favs && favs.length > 0 ?
            <ul className="favorites">
                {favs.map(book => (
                    <li key={book.id}>
                        <Fav book={book} favs={favs} setFavs={setFavs}/>
                    </li>
                ))}
            </ul>
            : <h2>Добавьте любимую книгу прямо сейчас!</h2>
        }
    </article>
    )
};

export {Favorites}