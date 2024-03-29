/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { submitReview, updateReview, deleteReview } from './review';
import { updateSettings } from './updateSettings';
import { updatePassword } from './updateSettings';
import { addFavorite, removeFavorite } from './favorite';
import { showAlert } from './alert';
import { bookTour } from './stripe';

// DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const signupForm = document.querySelector('.form--signup');
const header = document.querySelector('.section-header');
const reviewForm = document.querySelector('.form--review');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const favBtn = document.getElementById('favorite');
const reviewPage = document.getElementById('review__page');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    //console.log(form);
    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updatePassword(passwordCurrent, password, passwordConfirm);

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;

if (alertMessage) showAlert('success', alertMessage, 20);

if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
    const tourId = header.dataset.tourId;
    submitReview(rating, review, tourId);
  });
}

if (reviewPage) {
  const btnDelete = document.querySelectorAll('.btn-delete');
  const btnUpdate = document.querySelectorAll('.btn-update');
  const rating = document.querySelectorAll('#rating');
  const review = document.querySelectorAll('#review');
  //console.log({ rating, review });
  btnUpdate.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      btn.textContent = 'Save';
      rating[i].disabled = false;
      review[i].disabled = false;
      btn.addEventListener('click', e => {
        const reviewId = btn.dataset.reviewId;
        // console.log(rating[i].value);
        btn.disabled = true;
        btn.textContent = 'Saving...';
        updateReview(reviewId, rating[i].value, review[i].value);
      });
    });
  });

  btnDelete.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      const reviewId = btn.dataset.reviewId;
      btn.textContent = 'Removing...';
      btn.disabled = true;
      deleteReview(reviewId);
    });
  });
}

if (favBtn) {
  favBtn.addEventListener('click', e => {
    const vector = document.getElementById('Vector');
    const tourId = header.dataset.tourId;
    if (!vector.classList.contains('favorite-on')) {
      addFavorite(tourId, vector.classList);
    } else {
      removeFavorite(tourId, vector.classList);
    }
  });
}
