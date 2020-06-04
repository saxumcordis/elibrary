import React from 'react';
import Styles from '../Styles/styles.css';
import data from '../books.json';
import {Catalog} from './catalog.js';

const FilterField = (field, filterBooks, oldFilterValue) => {
    let books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : data;
    console.log(data);
    if (field == 'date')
        books = books.map(book => book.date[2]).sort((a, b) => a - b);
    else
        books = books.map(book => book[field]).sort();
    const [filterValue, setFilterValue] = React.useState((books[0]));

    const handleFilterValue = (event) => setFilterValue(event.target.value);
    console.log(field + " " + filterValue + " " + oldFilterValue);
    if (filterValue == oldFilterValue && filterValue != books[0] && !books.includes(filterValue)) {
        setFilterValue(books[0])
    }
    return (
        <article className="filter_content">
            <select value={filterValue} onChange={handleFilterValue}>
                {books.filter((e, pos) => books.indexOf(e) == pos).map(field => (
                    <option key={books.indexOf(field)}>
                        {field}
                    </option>
                    ))}
            </select>
            <button onClick={() => filterBooks(filterValue)}>Показать выбранные</button>
            <button onClick={() => filterBooks(null)}>Показать все книги</button>
        </article>
    )
}


const Filtered = (props) => {
    const[filterSign, setFilterSign] = React.useState('date');
    const[filterValue, setFilterValue] = React.useState(null);

    const handleFilterSign = event => (setFilterSign(event.target.value));
    const handleFilterValue = value => setFilterValue(value);

    return (<div className="catalog_main">
        <Catalog favVisibility={props.favVisibility} setVisibility={props.setVisibility} filterSign={filterSign} filterValue={filterValue}/>
        <div className="catalog_filter">
                <select onChange={handleFilterSign} className="filter_content">
                    <option key="1" value="date">Год издания</option>
                    <option key="2" value="author" >Автор</option>
                    <option key="3" value="publisher">Издательство</option>
                </select>
            {FilterField(filterSign, handleFilterValue, filterValue)}
        </div>
    </div>)
};


export {Filtered}