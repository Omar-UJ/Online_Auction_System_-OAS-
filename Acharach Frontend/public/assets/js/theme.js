(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict





/** Variables */
let files = [],
dragArea = document.querySelector('.drag-area'),
input = document.querySelector('.drag-area input'),
button = document.querySelector('.card button'),
select = document.querySelector('.drag-area .select'),
container_img = document.querySelector('.container_img');

/** CLICK LISTENER */
select.addEventListener('click', () => input.click());

/* INPUT CHANGE EVENT */
input.addEventListener('change', () => {
	let file = input.files;
        
    // if user select no image
    if (file.length == 0) return;
         
	for(let i = 0; i < file.length; i++) {
        if (file[i].type.split("/")[0] != 'image') continue;
        if (!files.some(e => e.name == file[i].name)) files.push(file[i])
    }

	showImages();
});

/** SHOW IMAGES */
function showImages() {
	container_img.innerHTML = files.reduce((prev, curr, index) => {
		return `${prev}
		    <div class="image">
			    <span onclick="delImage(${index})">&times;</span>
			    <img src="${URL.createObjectURL(curr)}" />
			</div>`
	}, '');
}

/* DELETE IMAGE */
function delImage(index) {
   files.splice(index, 1);
   showImages();
}

/* DRAG & DROP */
dragArea.addEventListener('dragover', e => {
	e.preventDefault()
	dragArea.classList.add('dragover')
})

/* DRAG LEAVE */
dragArea.addEventListener('dragleave', e => {
	e.preventDefault()
	dragArea.classList.remove('dragover')
});

/* DROP EVENT */
dragArea.addEventListener('drop', e => {
	e.preventDefault()
    dragArea.classList.remove('dragover');

	let file = e.dataTransfer.files;
	for (let i = 0; i < file.length; i++) {
		/** Check selected file is image */
		if (file[i].type.split("/")[0] != 'image') continue;
		
		if (!files.some(e => e.name == file[i].name)) files.push(file[i])
	}
	showImages();
});




