import { deleteBook, getSingleBook } from '../../api/bookData';
import { viewBookDetails, viewAuthorDetails, deleteAuthorBooks } from '../../api/mergedData';
// import { deleteAuthorBooks } from '../../api/mergedData';
// import { showAuthors } from '../components/pages/authors';
import { showBooks } from '../components/pages/books';
import viewBook from '../components/pages/viewBook';
import viewAllBooksOfAuthor from '../components/pages/viewAllBooksOfAuthor';
// import { deleteSingleAuthor } from '../../api/authorData';
import { showAuthors } from '../components/pages/authors';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getSingleAuthor } from '../../api/authorData';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey, uid).then((booksArray) => showBooks(booksArray));
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      addBookForm(bookFirebaseKey, uid).then((bookAuthorObject) => showBooks(bookAuthorObject));
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('clicked update btn');
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey, uid).then((bookObj) => addBookForm(bookObj, uid));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      viewBookDetails(bookFirebaseKey).then((bookAuthorObject) => viewBook(bookAuthorObject));
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // const [, firebaseKey] = e.target.id.split('--');

        // deleteSingleAuthor(firebaseKey).then((authorsArray) => showAuthors(authorsArray));
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooks(firebaseKey, uid).then(showAuthors);
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
      addAuthorForm();
    }

    //  CLICK EVENT FOR VIEW AUTHOR BTN
    if (e.target.id.includes('view-author-btn')) {
      const [, authorFirebaseKey] = e.target.id.split('--');

      viewAuthorDetails(authorFirebaseKey)
        .then((authorBooksObject) => viewAllBooksOfAuthor(authorBooksObject));
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      console.warn('clicked edit btn');
      const [, firebaseKey] = e.target.id.split('--');
      console.warn(firebaseKey);

      getSingleAuthor(firebaseKey, uid).then((authorObj) => {
        console.warn(authorObj);
        addAuthorForm(authorObj);
      });
    }
  });
};

export default domEvents;
