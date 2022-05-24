
import { getSingleAuthor } from "./authorData"
import { getSingleBook } from "./bookData"

const viewBookDetails = (bookFirebaseKey) => new Promise ((resolve, reject) => {
  getSingleBook(firebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.aithor_id)
        .then((authorObject) => {
          resolve({authorObject, ...bookObject});
        });
    }).catch((error)=> reject(error));
});

export default viewBookDetails;
