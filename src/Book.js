import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

    state = {
        id: this.props.id,
        bookImage: this.props.image,
        bookAuthors: this.props.authors,
        bookTitle: this.props.title,
        bookShelf: this.props.bookShelf
    }

    handleMoveBook(book_id, shelf) {
        //console.log(book_id + " " + shelf);
        BooksAPI.update({ id: book_id }, shelf).then(res => this.props.updateShelfs(res))
        this.setState({bookShelf: shelf})
        
    }

    render() {
         return (
            <div id={this.state.id} className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.state.bookImage + ')' }}></div>
                    <div className="book-shelf-changer">
                         <select value={this.state.bookShelf != 'None' ? this.state.bookShelf : 'none'} onChange={(e) => this.handleMoveBook(this.state.id, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.state.bookTitle}</div>
                <div className="book-authors">{this.state.bookAuthors}</div>
            </div>
        )
    }
}

export default Book