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
                if (res != null && res.error == null) {
                    this.setState({ searchResults: res })
                } else {
                    console.log(res);

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
                                    //console.log(book);
                                    return (

                                        <li key={book.id} >

                                            <Book key={book.id} id={book.id} image={book.imageLinks.thumbnail} authors={book.authors} title={book.title} updateShelfs={this.updateFunc} />

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