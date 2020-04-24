import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
    state = {
        Books: this.props.Books,
        shelf: this.props.shelf,
        title: this.props.shelf_title
    }
    render(){

        const BooksList = this.state.Books.map(book => {
            if (book.shelf === this.state.shelf) {
                return (
                  <Book data={book} key={book.id} id={book.id}/>
                )
            }
        })
    
        return (
            <div className="bookshelf" >
                <h2 className="bookshelf-title">{this.state.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {BooksList}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf;