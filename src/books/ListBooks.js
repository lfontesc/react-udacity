import React, { Component } from 'react'
import Book from './Book'


class ListBooks extends React.Component {
    render() {
      const books = this.props.books;
      const shelf = this.props.shelf;
  
      return (
        <div className="bookShelf">
          <h2 className="bookshelf-title">{shelf.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map(book => (
                <Book
                  book={book}
                  shelf={shelf}
                  key={book.id}
                  changeShelf={this.props.changeShelf}
                />
              ))}
            </ol>
          </div>
        </div>
      );
    }
  }
  

export default ListBooks