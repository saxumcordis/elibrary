import React from 'react';
import data from '../books.json';
import {Catalog, manageBooks} from './catalog.js';

const Filtered = (props) => {
    const[filterSign, setFilterSign] = React.useState('date');
    const[filterValue, setTempFilterValue] = React.useState(null);
    const[isFiltered, setFilter] = React.useState(false);
    const[supportValue, setSupportValue] = React.useState(null);
    const handleFilterSign = event => setFilterSign(event.target.value);
    const handleFilterValue = event => {
        setTempFilterValue(event.target.value);
        setSupportValue(event.target.value);
    };
    let books = manageBooks();
    if (filterSign == 'date')
        books = books.map(book => book.date[2]).sort((a, b) => a - b);
    else
        books = books.map(book => book[filterSign]).sort();
    if (!books.includes(filterValue))
        setTempFilterValue(books[0]);
    console.log(filterSign + " " + filterValue + " " + supportValue);
    console.log(books);
    console.log(+supportValue);
    return (<div className="catalog_main">
        <Catalog favVisibility={props.favVisibility} setVisibility={props.setVisibility} filterSign={filterSign}
                 filterValue={isFiltered ? books.includes(filterSign == 'date' ? +supportValue : supportValue) ? supportValue : filterValue : null}/>
        <div className="catalog_filter">
                <select onChange={handleFilterSign} className="filter_content">
                    <option key="1" value="date">Год издания</option>
                    <option key="2" value="author" >Автор</option>
                    <option key="3" value="publisher">Издательство</option>
                </select>
            <article className="filter_content">
                <select onChange={handleFilterValue}>
                    {books.filter((e, pos) => books.indexOf(e) == pos).map((field, pos) => (!pos ?
                            <option selected="selected" key={books.indexOf(field)}>{field}</option>
                            : <option key={books.indexOf(field)}>{field}</option>
                    ))}
                </select>
                <button onClick={() => setFilter(true)}>Показать выбранные</button>
                <button onClick={() => setFilter(false)}>Показать все книги</button>
            </article>
        </div>
    </div>)
};


export {Filtered}