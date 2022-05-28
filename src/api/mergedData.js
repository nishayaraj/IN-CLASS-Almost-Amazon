// eslint-disable-next-line no-unused-vars
import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      if (authorObject) {
        getAuthorBooks(authorObject.firebaseKey)
          .then((booksObject) => {
            if (booksObject) {
              resolve({ booksObject, authorObject });
            } else {
              reject(new Error('no books found for author'));
            }
          });
      } else {
        reject(new Error('no data found'));
      }
    }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails };
