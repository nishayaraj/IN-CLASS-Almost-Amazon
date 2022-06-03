import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const viewAllBooksOfAuthor = (authorBooksObj) => {
  clearDom();

  const { authorObject, booksObject } = authorBooksObj;

  let domString = '';

  const booksIndexes = Object.keys(booksObject);

  booksIndexes.forEach((index) => {
    const obj = booksObject[index];

    domString += `
    <div class="mt-5 d-flex flex-wrap">
     <div class="d-flex flex-column">
       <img src=${obj.image} alt=${obj.title} style="width: 300px;">
       <div class="mt-5">
         <i id="edit-book-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
         <i id="delete-book--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
       </div>
     </div>
     <div class="text-white ms-5 details">
       <h5>${obj.title} by ${authorObject.first_name} ${authorObject.last_name} ${authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
       Author Email: <a href="mailto:${authorObject.email}">${authorObject.email}</a>
       <p>${obj.description || ''}</p>
       <hr>
       <p>${obj.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span>
         $${obj.price}` : `$${obj.price}`}</p>
        </div>
      </div>`;
  });

  renderToDOM('#view', domString);
};

export default viewAllBooksOfAuthor;
