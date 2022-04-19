import React from "react";
import {Link} from "react-router-dom";
import ReactPaginate from 'react-paginate'

class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }
    render(){
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Available Copies</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Options</th>
                                <th scope={"col"}>Order book</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books}
                            </tbody>
                        </table>

                        <div className="col mb-3">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new book</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <ReactPaginate previousLabel={"back"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="/#">...</a>}
                                   breakClassName={"break-me"}
                                   pageClassName={"ml-1"}
                                   pageCount={pageCount}
                                   marginPagesDisplayed={5}
                                   pageRangeDisplayed={2}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination m-4 justify-content-center"}
                                   activeClassName={"active"}/>
            </div>
        )
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }


    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((term, index) => {
                return (
                    <tr className={term.availableCopies==0 ? "bg-danger text-white" : null}>
                        <td>{term.name}</td>
                        <td>{term.category}</td>
                        <td>{term.availableCopies}</td>
                        <td>{term.author.name}</td>
                        <td>
                            <button title={"Delete"}
                                    className={"btn btn-dark"}
                                    onClick={() => this.props.onDelete(term.id)}
                            >Delete</button>

                            <Link className={"btn btn-outline-dark ml-2"}
                                  onClick={() => this.props.onEdit(term.id)}
                                  to={`/books/edit/${term.id}`}>
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => this.props.onOrder(term.id)}
                                    className={"btn btn-outline-dark"}
                                    disabled={term.availableCopies==0}>Take</button>
                        </td>
                    </tr>
                );
            }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })

    }
}

export default Books;