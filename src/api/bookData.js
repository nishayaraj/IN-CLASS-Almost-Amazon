import axios from 'axios';
import firebaseConfig from './apiKeys';
import { getAuthors } from './authorData';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// TODO: GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// TODO: DELETE BOOK
const deleteBook = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => {
      getBooks(uid).then((booksArray) => resolve(booksArray));
    })
    .catch((error) => reject(error));
});

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// TODO: CREATE BOOK
const createBook = (bookObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, payload)
        .then(() => {
          getBooks(bookObj.uid).then(resolve);
        });
    }).catch(reject);
});

// TODO: UPDATE BOOK
const updateBook = (bookObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObj.firebaseKey}.json`, bookObj)
    .then(() => getBooks(bookObj).then(resolve))
    .catch((error) => reject(error));
});

// TODO: FILTER BOOKS ON SALE
const booksOnSale = (uid) => new Promise((resolve, reject) => {
  getBooks(uid)
    .then((userBooks) => {
      const favBooks = userBooks.filter((book) => book.sale);
      resolve(favBooks);
    }).catch((error) => reject(error));
});
// const booksOnSale = (uid) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/books.json?orderBy="sale"&equalTo=true"`)
//     .then((response) => resolve(Object.values(response.data)))
//     .catch((error) => reject(error));
// });

// FILTER FAVORITE AUTHORS
const favoriteAuthors = (uid) => new Promise((resolve, reject) => {
  getAuthors(uid)
    .then((authorsFav) => {
      const favAuthors = authorsFav.filter((author) => author.favorite);
      resolve(favAuthors);
    }).catch((error) => reject(error));
});

//   axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
//     .then((response) => resolve(Object.values(response.data)))
//     .catch((error) => reject(error));

// TODO: STRETCH...SEARCH BOOKS

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
  favoriteAuthors
};
