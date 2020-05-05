import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Search from './Search'
import MyReads from './MyReads'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path='/search' component={Search} />
            <Route path='/' component={MyReads} />
          </Switch>
        </BrowserRouter>
      </div>

    )
  }
}

export default BooksApp
