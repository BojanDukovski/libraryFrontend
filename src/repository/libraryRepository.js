import axios from '../custom-axios/axios';

const libraryService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchCountries: () => {
        return axios.get("/countries");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name, availableCopies, category, author, isTaken) => {
        return axios.post("/books/add", null, {
                params: {
                    name,
                    availableCopies,
                    category,
                    author,
                    isTaken
                }
            }
        )
    },
    editBook: (id, name, availableCopies, category, author, isTaken) => {
        console.log("id" + typeof(id) + id + ",name" + typeof (name) + " " + name, "availableCopies" + typeof (availableCopies) + " " + availableCopies,
            "category" + typeof (category) + " " + category,"author" +  typeof (author) + " " + author, "isTaken" + typeof (isTaken) + " " + isTaken, )
        return axios.put(`/books/edit/${id}`, null, {
            params: {
                name,
                availableCopies,
                category,
                author,
                isTaken
            }
        })
    },
    orderBook: (id) => {
        return axios.get(`/books/order/${id}`);
    }
}

export default libraryService;