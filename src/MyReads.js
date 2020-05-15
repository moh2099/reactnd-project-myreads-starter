import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class MyReads extends Component {
    state = {
        books: [],
        
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
          }
        })
    
        //this.setState(this.state)
        this.forceUpdate() 
    }
    
    render() { 
        return (
            
            
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
                                (<Book updateShelfs={this.updateFunc} bookShelf={book.shelf} key={book.id} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} />) : ('')
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
                                (<Book updateShelfs={this.updateFunc} bookShelf={book.shelf} key={book.id} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} />) : ('')
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
                                (<Book updateShelfs={this.updateFunc} bookShelf={book.shelf} key={book.id} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} />) : ('')
                            )
                          })
                        }

                      </ol>
                    </div>
                  </div>
                </div>
              </div>
                  <div className="open-search">
              <Link to={{ pathname: '/search', state: this.state }}> {/*  to={{ pathname: '/search', state: this.state }}  this is used to pass the state from the routed component, and you can access it through this.props.location.state */}
                <button onClick={() => this.setState({ showSearchPage: true })}></button>
              </Link>
              </div>
            </div>

        )
    }

}
 
export default MyReads
