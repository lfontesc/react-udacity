import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import { Route, Switch, Link } from 'react-router-dom'

/* Custom Components */
import SearchBooks from './books/SearchBooks'
import ListBooks from './books/ListBooks'
import NotFound from './NotFound'

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    shelves: [
      {
        id: "currentlyReading",
        name: "Lendo Atualmente"
      },
      {
        id: "wantToRead",
        name: "Quero Ler"
      },
      {
        id: "read",
        name: "Leitura concluida"
      }
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then(shelvedBooks => {
      this.setState({ shelvedBooks });
    });
  }
  changeShelf = (bookToAdd, shelf) => {
    this.setState(state => {
          const nextState = state.shelvedBooks.filter(book => book.id !== bookToAdd.id).concat( [{...bookToAdd, shelf}] );
          return { shelvedBooks: nextState };
        });
      }

  render() {
    return (
      <div className="app">
      <Switch>
        <Route path="/search"
          render={() => (
            <SearchBooks
              shelvedBooks={this.state.shelvedBooks}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.shelves.map(shelf => (
                  <ListBooks
                    key={shelf.id}
                    shelf={shelf}
                    shelvedBooks={this.state.shelvedBooks}
                    books={this.state.shelvedBooks.filter(shelvedBooks => {
                      return shelvedBooks.shelf === shelf.id;
                    })}
                    changeShelf={this.changeShelf}
                  />
                ))}
              </div>
              <div className="open-search">
                    <Link className='close-create-contact' to='/search'>
                        <button>Buscar</button>
                    </Link>
              </div>
            </div>
          )}
        />
         <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp
