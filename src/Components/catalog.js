import React from 'react';
import Styles from '../Styles/styles.css';
import data from '../books.json';

const manageBooks = () => {
    let books = [];
    if (localStorage.getItem('books'))
        books = JSON.parse(localStorage.getItem('books'));
    else {
        books = data;
        localStorage.setItem('books', JSON.stringify(books));
    }
    return books;
};

const Book = ({book}) => {
    const[rate, setRate] = React.useState(book.rate);
    const[rateVisibility, setRateVisibility] = React.useState(true);
    const[favButtonVisible, setButtonVisible] = React.useState(true);
    return (
    <article>
        <h1>{book.name}</h1>
        <h3>Rating: {rate}</h3>
        {rateVisibility && (!localStorage.getItem('myRates') || !JSON.parse(localStorage.getItem('myRates')).find(e => e == book.id)) ?
            <span className="rateButtons"><p onClick={() => {
                setRate(rate + 1);
                setRateVisibility(false);
                updateBookRate(book.id, rate + 1)
            }}>+</p>
                <p onClick={() => {
                    setRate(rate - 1);
                    setRateVisibility(false);
                    updateBookRate(book.id, rate - 1)
                }}>-</p>
        </span>
            : null
        }
        {(!localStorage.getItem('favs') || !JSON.parse(localStorage.getItem('favs')).find(e => e['id'] == book.id)) ?
            <button onClick={() => {addFavorite({book}); setButtonVisible(!favButtonVisible);}}>Добавить в избранное</button>
            : null
        }
    </article>
    )
}

const addFavorite = ({book}) => {
    const favs =  localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : [];
    favs.push(book);
    localStorage.setItem('favs', JSON.stringify(favs));

};

const updateBookRate = (id, newRate) => {
    const books = JSON.parse(localStorage.getItem('books'));
    books.find(e => e['id'] == id)['rate'] = newRate;
    localStorage.setItem('books', JSON.stringify(books));
    const myRates = localStorage.getItem('myRates') ? JSON.parse(localStorage.getItem('myRates')) : [];
    myRates.push(id);
    localStorage.setItem('myRates', JSON.stringify(myRates));
};

const Catalog = () => {
    const books = manageBooks();

    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    <Book book={book}/>
                </li>
            ))}
        </ul>
    )
}

export {Catalog}