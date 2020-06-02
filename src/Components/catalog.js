import React from 'react';
import Styles from '../Styles/styles.css';

const createBook = (book) => {
    return (
        '<div className="catalog_book">'
            + '<h2> some book </h2>'
        + '</div>'
    )
};

const renderBooks = () => {
    let books = new Array(7).fill(createBook());
    console.log(books);
    return books;
}


const Catalog = () => {
    return (
        <div className="catalog_main">
            <div className="catalog_content">
                <h1>Books</h1>
                <div className="catalog_books">
                    {renderBooks()}
                </div>
            </div>
            <div className="catalog_filter">
                <h1>Search</h1>
            </div>
        </div>
    )
}

export {Catalog}