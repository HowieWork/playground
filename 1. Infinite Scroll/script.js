'use strict';
// 1. Load testimonials
// (1) Fetch API
// (2) Create testimonial elements
// (3) Add these elements
// 2. Handle scroll behavior
// (1) Continue to fetch when scroll to the bottom of testimonial container
// (2) Handle this issue: Scroll is faster then 'fetch is done'
// (3) No more testimonial can be fetched

// query: limit, after
const API_BASE_URL = 'https://www.algoexpert.io/api/testimonials';
const PAGE_SIZE = 5;
const testimonialsContainer = document.getElementById('testimonial-container');
let afterID = null;
let canFetch = true;

testimonialsContainer.addEventListener('scroll', scrollHandler);

fetchAndAppendTestimonials();

function scrollHandler() {
  if (!canFetch) return;

  const bottomSpaceLeft =
    this.scrollHeight - this.scrollTop - this.clientHeight;

  if (bottomSpaceLeft > 0) return;
  fetchAndAppendTestimonials();
}

function fetchAndAppendTestimonials() {
  canFetch = false;

  const url = createFetchTestimonialUrl();

  fetch(url)
    .then(response => response.json())
    .then(({ hasNext, testimonials }) => {
      const fragment = document.createDocumentFragment();
      testimonials.forEach(({ message }) => {
        const testimonialElement = createTestimonialElement(message);
        fragment.appendChild(testimonialElement);
      });
      testimonialsContainer.appendChild(fragment);

      if (hasNext) {
        afterID = testimonials[testimonials.length - 1].id;
      } else {
        testimonialsContainer.removeEventListener('scroll', scrollHandler);
      }

      canFetch = true;
    })
    .catch(err => console.error('Oh no:' + err));
}

function createTestimonialElement(content) {
  const testimonialElement = document.createElement('p');
  testimonialElement.classList.add('testimonial');
  testimonialElement.textContent = content;
  return testimonialElement;
}

function createFetchTestimonialUrl() {
  const url = new URL(API_BASE_URL);
  url.searchParams.set('limit', PAGE_SIZE);

  if (afterID !== null) url.searchParams.set('after', afterID);

  return url;
}
