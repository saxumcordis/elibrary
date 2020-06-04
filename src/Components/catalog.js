import React from 'react';
import Styles from '../Styles/styles.css';
import data from '../books.json';

const manageBooks = () => {
    let books = [];
    if (localStorage.getItem('books'))
        books = JSON.parse(localStorage.getItem('books'));
    else {
        books = data.map(book => {
            let temp = book.date.split('.').map(e => +e);
            temp[0] = [temp[1], temp[1] = temp[0]][0];
            book.date = temp;
            return book;
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
    return books;
};

const Book = (props) => {
    const [rate, setRate] = React.useState(props.book.rate);
    const [rateVisibility, setRateVisibility] = React.useState(true);
    const [favButtonVisible, setButtonVisible] = React.useState(true);
    return (
        <article className="catalog_book">
            <h1>{props.book.name}</h1>
            <h3>Rate: {rate}</h3>
            <h3>Date: {props.book.date.join('.')}</h3>
            {rateVisibility && (!localStorage.getItem('myRates') || !JSON.parse(localStorage.getItem('myRates')).find(e => e.id == props.book.id)) ?
                <span className="rateButtons"><p onClick={() => {
                    setRate(rate + 1);
                    setRateVisibility(false);
                    updateBookRate(props.book.id, rate + 1, 'up')
                }}>+</p>
                <p onClick={() => {
                    setRate(rate - 1);
                    setRateVisibility(false);
                    updateBookRate(props.book.id, rate - 1, 'down')
                }}>-</p>
        </span>
                : <span><p className="rated">Вы уже поставили оценку</p></span>
            }
            {(!localStorage.getItem('favs') || !JSON.parse(localStorage.getItem('favs')).find(e => e['id'] == props.book.id)) ?
                <button className="favorite_button"onClick={() => {
                    addFavorite(props.book);
                    setButtonVisible(!favButtonVisible);
                    props.favProps.setVisibility(!props.favProps.favVisibility);
                    setTimeout(props.favProps.setVisibility, 4, true);
                }}>Добавить в избранное</button>
                : <p>В избранном</p>
            }
        </article>
    )
}

const addFavorite = (book) => {
    const favs = localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : [];
    favs.push(book);
    localStorage.setItem('favs', JSON.stringify(favs));

};

const updateBookRate = (id, newRate, mark) => {
    const books = JSON.parse(localStorage.getItem('books'));
    books.find(e => e['id'] == id)['rate'] = newRate;
    localStorage.setItem('books', JSON.stringify(books));
    const myRates = localStorage.getItem('myRates') ? JSON.parse(localStorage.getItem('myRates')) : [];
    myRates.push({id: id, mark: mark});
    localStorage.setItem('myRates', JSON.stringify(myRates));
};

const sortBooks = (books, sign, direction = 0) => {
    if (sign == 'date')
        books.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1);
    else if (sign == 'rate')
        books.sort((a, b) => a.rate - b.rate);
    else
        books.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    return direction == 0 ? books : books.reverse()
};

const filterBooks = (sign, value) => {
    if (sign != 'date')
        return manageBooks().filter(book => book[sign] == value);
    return manageBooks().filter(book => book.date[2] == value);
};

const Catalog = (props) => {
    const books = props.filterValue ? filterBooks(props.filterSign, props.filterValue) : manageBooks();
    const [sortSign, setSortSign] = React.useState('name');
    const [order, setOrder] = React.useState(0);

    return (
        <div className="catalog_content">
            <button onClick={() => setSortSign('rate')}>По рейтингу</button>
            <button onClick={() => setSortSign('name')}>По имени</button>
            <button onClick={() => setSortSign('date')}>По дате издания</button>
            <button onClick={() => setOrder(!order)}>По возрастанию/Убыванию</button>
            <ul className="catalog_books">
                {sortBooks(books, sortSign, order).map(book => (
                    <li key={book.id}>
                        <Book book={book} favProps={props}/>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export {Catalog, manageBooks}