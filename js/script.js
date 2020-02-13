//DOM STRINGS
const btn = document.querySelector('.btn-short');
const inputElement = document.querySelector('.shorten-input');
const navToggle = document.querySelector('.nav__icon');

const navOpen = document.querySelector('.nav__icon-open');
const navClose = document.querySelector('.nav__icon-close');

// MOBILE NAVIGATION TOGGLE
navToggle.addEventListener('click', () => {
	const nav = document.querySelector('.nav__container');

	nav.classList.contains('nav-display')
		? nav.classList.remove('nav-display')
		: nav.classList.add('nav-display');

	navOpen.classList.contains('nav__icon-fade')
		? navOpen.classList.remove('nav__icon-fade')
		: navOpen.classList.add('nav__icon-fade');

	navClose.classList.contains('nav__icon-fade')
		? navClose.classList.remove('nav__icon-fade')
		: navClose.classList.add('nav__icon-fade');
});

// btn.addEventListener('click', e => {
// 	e.preventDefault();

// 	const inputValue = inputElement.value;
// 	const regEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

// 	if (inputValue != '' && regEx.test(inputValue)) {
// 		fetchLink(inputValue);
// 	}
// });

// const fetchLink = async link => {
// 	const request = await fetch('https://cors-anywhere.herokuapp.com/https://rel.ink/api/links/', {
// 		method: 'POST',
// 		body: JSON.stringify({
// 			url: link
// 		}),
// 		headers: {
// 			'Content-type': 'application/json'
// 		},
// 		credentials: 'same-origin'
// 	});

// 	const response = await request.json();
// 	const hashId = response.hashid;

// 	console.log('https://rel.ink/api/links/' + hashId);
// };
