import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// adicional component
import {DebounceInput} from 'react-debounce-input';
import Book from './Book'

//api
import * as BooksAPI from '../api/BooksAPI'

class SearchBooks extends React.Component {
    state = {
      findBooks: [],
      query: ""
    };
  
    handleSearch(e) {
      if (e.target.value !== "") {
        this.setState({ query: e.target.value });
        BooksAPI.search(this.state.query).then(findBooks => {
          this.setState({ findBooks: !findBooks || findBooks.error ? [] : findBooks });
        });
      } else {
        this.setState({ findBooks: [] });
      }
    }
  
    render() {
      const shelvedBooks = this.props.shelvedBooks;
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
            <DebounceInput
                        type="text"
                        minLength={3}
                        debounceTimeout={300}
                        placeholder="Search by title or author"
                        onChange={this.handleSearch.bind(this)} 
                    />
            </div>
          </div>
          {this.state.findBooks !== undefined && (
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.findBooks.map(book => (
                  <Book
                    book={book}
                    key={book.id}
                    changeShelf={this.props.changeShelf}
                    shelvedBooks={shelvedBooks}
                  />
                ))}
              </ol>
            </div>
          )}
        </div>
      );
    }
  }
export default SearchBooks