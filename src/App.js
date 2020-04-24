import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({ books: res })
      //console.log(this.state);
    }
    )
  }


  handleSearch = (keyword) => { 
    BooksAPI.search(keyword).then(res => { 
      //console.log(res)
      if (res != null && res.error == null) {
        this.setState({ searchResults: res })
      }
    })
  }

  updateFunc = (res) => {
    /* 
    let fruits = ["Banana", "Orange", "Apple", "Mango"];
    let n = fruits.includes("Mango");
    n = true / false, whether the fruits has Mango or not

    ref: https://www.w3schools.com/jsref/jsref_includes_array.asp
    */

    console.log(res);
    this.state.books.map(book => {
      if (res.currentlyReading.includes(book.id)) {
        book.shelf = 'currentlyReading'
      } else if (res.wantToRead.includes(book.id)) {
        book.shelf = 'wantToRead'
      } else if (res.read.includes(book.id)) {
        book.shelf = 'read'
      } else { 
        console.log(res);
        
      }
    })

    this.setState(this.state)
     
  }

  render() {
    return (
      <div className="app">
        {
          this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={(e) => this.handleSearch(e.target.value)} placeholder="Search by title or author" />
              </div>
            </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {                    
                     this.state.searchResults.length !== 0 ? (
                          this.state.searchResults.map(book => {
                            //console.log(book);
                            return <li key={book.id} ><Book key={book.id} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} updateShelfs={this.updateFunc}  /></li>
                          })) : ('No Results !!')
                        }
              </ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          this.state.books.map(book => {
                            //console.log(book);
                            return (
                              book.shelf === 'currentlyReading' ?
                                (<Book updateShelfs={this.updateFunc} key={book.id} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} />) : ('')
                            )
                          })
                        }

                      </ol>
                    </div>


                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          this.state.books.map(book => {
                            //console.log(book);
                            return (
                              book.shelf === 'wantToRead' ?
                                (<Book updateShelfs={this.updateFunc} key={book.id} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} />) : ('')
                            )
                          })
                        }

                      </ol>
                    </div>

                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">

                        {
                          this.state.books.map(book => {
                            //console.log(book);
                            return (
                              book.shelf === 'read' ?
                                (<Book updateShelfs={this.updateFunc} key={book.id} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} />) : ('')
                            )
                          })
                        }

                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
