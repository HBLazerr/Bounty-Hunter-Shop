/*=============== CARD POPUP JS ===============*/
document.addEventListener('DOMContentLoaded', () => {
   const productContainer = document.getElementById("product-container");

   fetch('products.json')
      .then(response => response.json())
      .then(data => {
         data.forEach((product, index) => {
            const article = document.createElement("article");
            article.innerHTML = `
           <div class="card__product" data-index="${index}">
             <img src="${product.image}" alt="${product.name}" class="card__img" />
             <div>
               <h3 class="card__name">${product.name}</h3>
               <span class="card__price"><i class="ri-bit-coin-line"></i> ${product.price}</span>
             </div>
           </div>
 
           <div class="modal">
             <div class="modal__card">
               <i class="ri-close-large-line modal__close"></i>
               <img src="${product.image}" alt="${product.name}" class="modal__img" />
               <div>
                 <h3 class="modal__name">${product.name}</h3>
                 <p class="modal__info">${product.description}</p>
                 <div class="modal__review">
                   <h4>Top Review</h4>
                   <p>${product.topReview}</p>
                   <div class="modal__rating">
                     ${'★'.repeat(Math.floor(product.review))}${'☆'.repeat(5 - Math.floor(product.review))}
                     <span>${product.review.toFixed(1)} / 5</span>
                   </div>
                 </div>
                 <span class="modal__price"><i class="ri-bit-coin-line"></i> ${product.price}</span>
               </div>
               <div class="modal__buttons">
                 <button class="modal__button modal__button-ghost">Buy Now</button>
                 <button class="modal__button">Add to Cart</button>
               </div>
             </div>
           </div>
         `;
            productContainer.appendChild(article);
         });

         // Attach event listeners after the products are added to the DOM
         const modals = document.querySelectorAll('.modal');
         const cardBtns = document.querySelectorAll('.card__product');
         const modalCloses = document.querySelectorAll('.modal__close');
         const modalCards = document.querySelectorAll('.modal__card');

         let activeModal = (modalClick) => {
            modals[modalClick].classList.add('active-modal');
         };

         /* Show modal */
         cardBtns.forEach((cardBtn, i) => {
            cardBtn.addEventListener('click', () => {
               activeModal(i);
            });
         });

         /* Hide modal */
         modalCloses.forEach((modalClose) => {
            modalClose.addEventListener('click', () => {
               modals.forEach((modalRemove) => {
                  modalRemove.classList.remove('active-modal');
               });
            });
         });

         /* Hide modal on background click */
         modals.forEach((modal) => {
            modal.addEventListener('click', () => {
               modal.classList.remove('active-modal');
            });
         });

         /* Don't hide modal on card click (by event propagation) */
         modalCards.forEach((modalCard) => {
            modalCard.addEventListener('click', (e) => {
               e.stopPropagation();
            });
         });
      })
      .catch(error => console.error('Error fetching the products:', error));
});

window.addEventListener('scroll', function () {
   const header = document.querySelector('header');
   if (window.scrollY > 25) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
});