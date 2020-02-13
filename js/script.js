//DOM STRINGS
const inputButton = document.querySelector('.btn-short');
const inputElement = document.querySelector('.shorten-input');
const navToggle = document.querySelector('.nav__icon');

const navOpen = document.querySelector('.nav__icon-open');
const navClose = document.querySelector('.nav__icon-close');

const copyBtn = document.querySelector('.btn-copy');
const linkBox = document.querySelector('.section-links');

const loader = document.querySelector('.loader');

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

// LINK SECTION OBJECTS
class LinkSection {
	constructor(userLink, hashId) {
		this.userLink = userLink;
		this.hashId = hashId;
		this.baseUrl = 'https://rel.ink/';
	}

	createItem = () => {
		let heading = document.createElement('h3');
		heading.innerHTML = this.userLink;
		heading.classList.add('shorten__link-text');

		let input = document.createElement('input');
		input.value = this.baseUrl + this.hashId;
		input.classList.add('shorten__link-input');
		input.type = 'text';

		let button = document.createElement('button');
		button.innerHTML = 'Copy';
		button.classList.add('btn', 'btn-copy', 'btn-curve');

		let parent = document.createElement('div');
		parent.classList.add('shorten__link');

		linkBox.appendChild(parent);

		parent.appendChild(heading);
		parent.appendChild(input);
		parent.appendChild(button);
	};
}

//create perstistance with local storage
const localStore = obj => {
	const id = localStorage.length;
	const newObj = JSON.stringify(obj);
	localStorage.setItem(id, newObj);
};

//LOADING COMPONENT
const showLoader = bool => {
	if (bool) {
		loader.classList.add('appear');
	} else {
		loader.classList.remove('appear');
	}
};

//SENDING API REQUEST
const fetchLink = async link => {
	const request = await fetch('https://cors-anywhere.herokuapp.com/https://rel.ink/api/links/', {
		method: 'POST',
		body: JSON.stringify({
			url: link
		}),
		headers: {
			'Content-type': 'application/json'
		},
		credentials: 'same-origin'
	});

	const response = await request.json();
	const hashId = response.hashid;

	return hashId;
};

inputButton.addEventListener('click', async e => {
	e.preventDefault();
	const warningText = document.querySelector('.warning-text');

	let inputValue = inputElement.value;
	const regEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

	if (inputValue != '' && regEx.test(inputValue)) {
		//display loader
		showLoader(true);

		//fecth hashid
		const hash = await fetchLink(inputValue);

		inputElement.value = '';
		warningText.classList.remove('appear');

		const newLink = new LinkSection(inputValue, hash);

		showLoader(false);
		newLink.createItem();
		localStore(newLink);
	} else {
		warningText.classList.add('appear');
	}
});

//COPY TO CLIPBOARD
linkBox.addEventListener('click', event => {
	if (event.target.matches('.btn-copy')) {
		const btn = event.target;
		const parent = event.target.parentElement;
		const inputEl = parent.querySelector('.shorten__link-input');

		//selecting text inside element
		inputEl.select();
		inputEl.setSectionRange(0, 99999);

		document.execCommand('copy');

		btn.innerHTML = 'Copied!';
		btn.classList.add('btn-active');
	}
});

//CHECKING FOR ITEMS ON LOAD
window.addEventListener('load', () => {
	if (localStorage.length) {
		for (let i = 0; i < localStorage.length; i++) {
			let item = JSON.parse(localStorage.getItem(i));
			const newLink = new LinkSection(item.userLink, item.hashId);
			newLink.createItem();
		}
	}
});
