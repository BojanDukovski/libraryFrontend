import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Books from '../Books/books'
import Authors from '../Authors/authors';
import Countries from '../Countries/countries';
import libraryService from "../../repository/libraryRepository";
import Header from '../../Header/header';
import AddBook from '../AddBook/addBook';
import EditBook from '../EditBook/editBook';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: [],
            countries: [],
            categories: ["NOVEL",
                "THRILLER",
                "HISTORY",
                "FANTASY",
                "BIOGRAPHY",
                "CLASSICS",
                "DRAMA"],
            selectedBook: {}
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path="/books"
                                   element={<Books books={this.state.books}
                                                   onDelete={this.deleteBook}
                                                   onEdit={this.getBook}
                                                   onOrder={this.orderBook}/>}/>
                            <Route path="/"
                                   element={<Books books={this.state.books}
                                                   onDelete={this.deleteBook}
                                                   onEdit={this.getBook}
                                                   onOrder={this.orderBook}/>}/>

                            <Route path={"/books/add"} element={
                                <AddBook categories={this.state.categories}
                                         authors={this.state.authors}
                                         onAddBook={this.addBook}/>}/>

                            <Route path={"/books/edit/:id"} element={
                                <EditBook categories={this.state.categories}
                                          authors={this.state.authors}
                                          book={this.state.selectedBook}
                                          onEditBook={this.editBook}/>}/>

                            <Route path="/authors" element={<Authors authors={this.state.authors}/>}/>
                            <Route path="/countries" element={<Countries countries={this.state.countries}/>}/>
                        </Routes>
                    </div>
                </main>
            </BrowserRouter>


        )
    }

    componentDidMount() {
        this.loadAuthors();
        this.loadBooks();
        this.loadCountries();
    }

    loadBooks = () => {
        libraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }
    loadAuthors = () => {
        libraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }
    loadCountries = () => {
        libraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            })
    }

    deleteBook = (id) => {
        libraryService.deleteBook(id)
            .then(() => {
                this.loadBooks()
            })
    }
    addBook = (name, availableCopies, category, author, isTaken) => {
        libraryService.addBook(name, availableCopies, category, author, isTaken)
            .then(() => {
                this.loadBooks();
            })
    }
    getBook = (id) => {
        libraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }
    editBook = (id, name, availableCopies, category, author, isTaken) => {
        libraryService.editBook(id, name, availableCopies, category, author, isTaken)
            .then(() => {
                this.loadBooks();
            })
    }
    orderBook = (id) => {
        libraryService.orderBook(id)
            .then(() => {
                this.loadBooks();
            })
    }


}

export default App;
