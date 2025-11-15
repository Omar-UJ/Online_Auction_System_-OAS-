const header = document.querySelector("header");

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');



const sr = ScrollReveal ({
	distance: '30px',
	duration: 2600,
	reset: true
})

sr.reveal('.home-text',{delay:280, origin:'bottom'})

sr.reveal('.featured,.cta,.new,.brand,.contact',{delay:200, origin:'bottom'})