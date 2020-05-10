import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import Swal from 'sweetalert2'


class Search extends Component {

    state = {
        searchResults: []
    }

    handleSearch = (keyword) => {

        if (keyword !== '') {

            BooksAPI.search(keyword).then(res => {
                //console.log(res)
                if (res != null && res.error == null) {
                    res = res.filter(book => {
                        if (book.imageLinks == null) { //checking whether the book has a thumbnail or not
                            book.imageLinks = { thumbnail: 'https://cdn1.iconfinder.com/data/icons/matticons-sembilan-solid/64/matticons_solid_No_image_no_photo-128.png' }
                        }
                        return book;
                    })
                    this.setState({ searchResults: res })
                } else if (res != null && res.error == 'empty query') { 
                    this.setState({ searchResults: [] })
                }
            })
        } else {
            this.setState({ searchResults: [] })
        }
    }


    updateFunc = (res) => {

        console.log(res);

        this.setState({
            newBooks: res
        })

        Swal.fire({
            icon: 'success',
            title: 'Adding Book',
            text: 'The book has been added to the shelf successfully!',

        })
    }
 
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' ><button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button></Link>
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
                                    let myReadBooks = this.props.location.state.books
                                    let MyReadBook = myReadBooks.find(myBook => myBook.id == book.id)
                                    let bookShelf = MyReadBook != null ? MyReadBook.shelf : 'None'
                                    //console.log(book.id + ", " + book.title);
                                    return (
                                        <li key={book.id} >
                                            <Book key={book.id} bookShelf={bookShelf} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} updateShelfs={this.updateFunc} />
                                        </li>
                                    )
                                })) : ('No Results !!')
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search