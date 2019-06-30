// rj-auxilary.js content (ES5, contains tools necessary for writing rj-gallery.js)
var aUtils = aUtils || {
	// Removing class
	// pass only elSelector -> remove all classes from selected objects
	// pass elSelector and elClass -> remove elClass from selected objects
	removeClass: function (elSelector, elClass) {
		var argLength = arguments.length,
			elements,
			elCheckClass, 
			elCheckClassArray,
			elLength,
			i, j;
		
		// Checking if there is a node or elements collection
		if (elSelector === undefined || elSelector === null) {
			console.warn('The node doesn\'t exist');
			return;
		} else if (elSelector.nodeType === undefined) {
			elements = document.querySelectorAll(elSelector);
		} else {
			elements = elSelector;
		}
		
		if (elements.length === 0) {
			console.warn('There are no elements with this class');
			return;
		} else if (elements.length > 0) {
			elLength = elements.length;
			
			switch (argLength) {
			case 1:
				for (i = 0; i < elLength; i++) {
					elements[i].className = '';
				}
				break;
			case 2:
				for (i = 0; i < elLength; i++) {
					elCheckClass = elements[i].className;
					elCheckClassArray = elCheckClass.split(' ');
					
					for (j = 0; j < elCheckClassArray.length; j++) {
						if (elCheckClassArray[j] === elClass) {
							elCheckClassArray.splice(j, 1);
						}
					}
					
					if (elCheckClassArray.length === 0) {		// When after removing class the array is empty
						elements[i].className = '';
					} else if (elCheckClassArray.length === 1) {
						elements[i].className = elCheckClassArray[0];
					} else {
						elements[i].className = elCheckClassArray[0];
						
						for (j = 1; j < elCheckClassArray.length; j++) {
							elements[i].className += (' ' + elCheckClassArray[j]);
						}
					}
				}
				break;
			default:
				return;
			}
		} else {
			switch (argLength) {
			case 1:
				elements.className = '';
				break;
			case 2:
				elCheckClass = elements.className;
				elCheckClassArray = elCheckClass.split(' ');
				
				for (i = 0; i < elCheckClassArray.length; i++) {
					if (elCheckClassArray[i] === elClass) {
						elCheckClassArray.splice(i, 1);
					}
				}
				
				if (elCheckClassArray.length === 0) {		// When after removing class the array is empty
					elements.className = '';
				} else if (elCheckClassArray.length === 1) {
					elements.className = elCheckClassArray[0];
				} else {
					elements.className = elCheckClassArray[0];
					
					for (i = 1; i < elCheckClassArray.length; i++) {
						elements.className += (' ' + elCheckClassArray[i]);
					}
				}
				break;
			default:
				return;
			}					
		}
	},
	// Adding class
	// pass elSelector and elClass -> adds elClass to selected objects			
	addClass: function (elSelector, elClass) {
		var argLength = arguments.length,
			elSelector,
			elClass,
			elements,
			elLength,
			i;	
	
		// Checking if there is a node or elements collection
		if (elSelector === undefined || elSelector === null) {
			console.warn('The node doesn\'t exist');
			return;
		} else if (elSelector.nodeType === undefined) {
			elements = document.querySelectorAll(elSelector);
		} else {
			elements = elSelector;
		}

		if (elements.length === 0) {
			console.warn('There are no elements with this class');
			return;
		} else if (elements.length > 0) {
			elLength = elements.length;
			
			if (argLength === 2) {
				if (elLength > 0) {
					for (i = 0; i < elLength; i++) {
						if (elements[i].className === '') {
							elements[i].className = elClass;
						} else {
							if (elements[i].className.indexOf(elClass) >= 0) {
								return;
							} else {
								elements[i].className += (' ' + elClass);
							}
						}
					}
				} else {
					return;
				}
			} else {
				console.warn('There is no class selected to add');
				return;
			}
		} else {
			if (argLength === 2) {
				if (elements.className === '') {
					elements.className = elClass;
				} else {
					if (elements.className.indexOf(elClass) >= 0) {
						return;
					} else {
						elements.className += (' ' + elClass);
					}
				}
			} else {
				console.warn('There is no class selected to add');
				return;
			}					
		}
	},
	// Checking if object has class
	// pass elSelector and elClass -> check if selected object (only one!) has elClass
	hasClass: function (elSelector, elClass) {
		if (arguments.length === 2) {
			var result = false,
				elClass,
				elements, 
				classArray,
				i;
				
			// Checking if there is a node or elements collection
			if (elSelector === undefined || elSelector === null) {
				console.warn('The selector doesn\'t contain any element');
				return;
			} else if (typeof elSelector === 'string') {
				elements = document.querySelector(elSelector);
			} else {
				elements = elSelector;
			}			

			classArray = elements.className.split(' ');
			
			for (i = 0; i < classArray.length; i++) {
				if (classArray[i] === elClass) {
					result = true;
				}
			}
			return result;					
		} else {
			console.warn('Too less arguments');
			return;
		}			
	}
};

// rj-gallery.js code
var rjOptions;

var rjGallery = rjGallery || (function() {
	'use strict';

	/*--------------------------------------------*/
	/*---------------Private methods--------------*/
	/*--------------------------------------------*/

	// Execute gallery function only when galleries exist
	// otherwise return
	if (document.querySelectorAll('.rj-container').length > 0) {

		// Prepare default gallery options
		// in case user didn't provide options object
		if (!rjOptions) {
			rjOptions = {
				counter: true,
				imgbar: true,
				expandable: true,
				title: true,
				style: 'rounded'
			};
		}

		// Lightbox placement in DOM (once)
		// Must be done before other variables declaration
		// because variables have reference to lightbox structure
		(function() {
			var elLightbox = document.createElement('div'),
					elBody = document.body,
					bodyEls = document.querySelectorAll('body > *'),
					bodyElsLength = bodyEls.length,
					elBefore,
					i;		

			elLightbox.className = 'rj-lightbox';
			elLightbox.innerHTML = '<div class="rj-up-lightbox rj-updown"><div class="rj-lightbox-close"><span class="rj-btn-overlay"></span><i class="rj-color-1"></i><i class="rj-color-2"></i></div></div><div class="rj-left-lightbox rj-leftright"><div class="rj-slide-left rj-slide"><span class="rj-btn-overlay"></span><i class="rj-color-1"></i><i class="rj-color-2"></i></div></div><div class="rj-central-lightbox"><img src="" alt=""></div><div class="rj-right-lightbox rj-leftright"><div class="rj-slide-right rj-slide"><span class="rj-btn-overlay"></span><i class="rj-color-1"></i><i class="rj-color-2"></i></div></div><div class="rj-down-lightbox rj-updown"></div>';

			if (document.querySelector('script') === null) {
				elBody.insertBefore(elLightbox, bodyEls[bodyElsLength - 1].nextSibling);
			} else {
				for (i = bodyElsLength; i--; ) {
					if (bodyEls[i].tagName === 'SCRIPT') {
						elBefore = bodyEls[i];
						elBody.insertBefore(elLightbox, elBefore);
						return;
					}
				}
			}		
		})();

		// Variables declaration and buffering
		var body = document.body,
			html = document.documentElement,
			lightbox = document.querySelector('.rj-lightbox'),
			upLightbox = document.querySelector('.rj-up-lightbox'),
			downLightbox = document.querySelector('.rj-down-lightbox'),
			rightLightbox = document.querySelector('.rj-right-lightbox'),
			centralLightbox = document.querySelector('.rj-central-lightbox'),
			fullImage = document.querySelector('.rj-lightbox img'),
			close = document.querySelector('.rj-lightbox-close'),
			slideBtns = document.querySelectorAll('.rj-slide'),
			imageBoxes = document.querySelectorAll('.rj-image-box'),
			galleries = document.querySelectorAll('.rj-container'),
			galleriesCount = galleries.length,
			imgArray = [],
			imgArrayLen,
			imgNum,
			allImages,
			imgHeight,
			imgWidth,
			imgSrc,
			imgAlt,
			imgTitle,
			newSrc,
			newAlt,
			actualImg,
			clickedImg,
			clickedImgNumber,
			nrBarHeight,
			elIndicator,
			elImglist,
			elCompress,
			elExpand,
			elTitle,
			i, j;
			
		// Add the counter element to lightbox
		if (rjOptions.counter) {
			elIndicator = document.createElement('p');
			elIndicator.className = 'rj-indicator';
			elIndicator.innerHTML = '<span class="rj-number rj-current"></span>/<span class="rj-number rj-all"></span>';
			upLightbox.insertBefore(elIndicator, close);
			
			var imgSum = document.querySelector('.rj-all'),
				imgNumber = document.querySelector('.rj-current');
		}
		
		// Add the image bar element to lightbox	
		if (rjOptions.imgbar) {
			elImglist = document.createElement('div');
			elImglist.className = 'rj-nrs-bar rj-bar-hidden';
			elImglist.innerHTML = '<div class="rj-inner-bar"></div><p class="rj-nrs-bar-button"><span class="rj-btn-overlay"></span><i class="rj-color-1"></i><i class="rj-color-2"></i></p>';
			upLightbox.insertBefore(elImglist, close);
			
			var nrBarButton = document.querySelector('.rj-nrs-bar-button'),
				nrBar = document.querySelector('.rj-nrs-bar'),
				innerBar = document.querySelector('.rj-inner-bar');
		}
		
		// Enable expand and compress image in the lightbox
		if (rjOptions.expandable) {
			elCompress = document.createElement('div');
			elCompress.className = 'rj-compress rj-toggle-zoom';
			elCompress.innerHTML = '<span class="rj-btn-overlay"></span><i class="rj-color-1"></i><i class="rj-color-2"></i>';
			centralLightbox.appendChild(elCompress);
			
			elExpand = document.createElement('div');
			elExpand.className = 'rj-expand rj-toggle-zoom';
			elExpand.innerHTML = '<span class="rj-btn-overlay"></span><i class="rj-color-1"></i><i class="rj-color-2"></i>';
			rightLightbox.appendChild(elExpand);
			
			var expandBtn = document.querySelector('.rj-expand'),
				compressBtn = document.querySelector('.rj-compress');
		}
		
		// Add image title element to lightbox	
		if (rjOptions.title) {
			elTitle = document.createElement('p');
			elTitle.className = 'rj-title';
			elTitle.innerHTML = '<span></span>';
			downLightbox.appendChild(elTitle);
			
			var imgNameBar = document.querySelector('.rj-title'),
				imgName = document.querySelector('.rj-title span');	
		}
		
		
		switch (rjOptions.style) {
			case 'square':
				aUtils.addClass(lightbox, 'rj-square');
				break;
			case 'square nocolor':
				aUtils.addClass(lightbox, 'rj-square');
				aUtils.addClass(lightbox, 'rj-nocolor');
				break;				
			case 'rounded':
				aUtils.addClass(lightbox, 'rj-rounded');
				break;
			case 'rounded nocolor':
				aUtils.addClass(lightbox, 'rj-rounded');
				aUtils.addClass(lightbox, 'rj-nocolor');
				break;				
			case 'leaf':
				aUtils.addClass(lightbox, 'rj-leaf');
				break;	
			case 'leaf nocolor':
				aUtils.addClass(lightbox, 'rj-leaf');
				aUtils.addClass(lightbox, 'rj-nocolor');
				break;					
			case 'noshape':
				aUtils.addClass(lightbox, 'rj-noshape');
				break;	
			case 'noshape nocolor':
				aUtils.addClass(lightbox, 'rj-noshape');
				aUtils.addClass(lightbox, 'rj-nocolor');
				break;				
			default:
				aUtils.addClass(lightbox, 'rj-rounded');
				break;
		}

		// Adding event listeners to all image boxes
		function addBoxClickListeners() {
			for (i = imageBoxes.length; i--; ) {
				imageBoxes[i].addEventListener('click', openImage, false);
			}
		}

		// Removing event listeners from all image boxes
		function removeBoxClickListeners() {
			for (i = imageBoxes.length; i--; ) {
				imageBoxes[i].removeEventListener('click', openImage);
			}
		}
		
		// Add event listeners to slide buttons
		function addSlideBtnsClickListeners() {
			for (i = slideBtns.length; i--; ) {
				slideBtns[i].addEventListener('click', slideImage, false);
			}
		}

		// Open lightbox with clicked image in full size
		function openImage(e) {
		
			// Mark clicked image as actual
			aUtils.addClass(this.querySelector('img'), 'rj-actual');
		
			// Put references to all images in gallery into array and set array length
			allImages = e.currentTarget.parentNode.parentNode.querySelectorAll('img');
			for (i = 0; i < allImages.length; i++) {
				imgArray.push(allImages[i]);
			}
			imgArrayLen = imgArray.length;

			// Get number, src, alt and title of clicked image
			// in order to set it later to lightbox elements
			imgArray.forEach(function (elArr, nrArr) {
				if (aUtils.hasClass(elArr, 'rj-actual')) {
					clickedImg = imgArray[nrArr];
				}
			});
			clickedImgNumber = imgArray.indexOf(clickedImg) + 1;
			imgTitle = clickedImg.getAttribute('data-imgtitle');
			imgSrc = clickedImg.src;
			imgAlt = clickedImg.alt;

			// Setting values of opened image to lightbox elements	
			fullImage.src = imgSrc;
			fullImage.alt = imgAlt;
			if (rjOptions.counter) imgNumber.textContent = clickedImgNumber;
			if (rjOptions.title) imgName.textContent = imgTitle;

			// Block page scrolling after opening lightbox
			aUtils.addClass(html, 'lightbox-open');

			// Set gallery images count to lightbox counter element
			if (rjOptions.counter) imgSum.textContent = imgArrayLen;

			// Generating numbered list of images in clicked gallery and
			// setting its top margin in order to hide it out of viewport
			if (rjOptions.imgbar) {
				innerBar.innerHTML = '';
				
				for (i = 0; i < imgArrayLen; i++) {
					innerBar.innerHTML += '<span class="rj-single-number">' + (i + 1) + '</span>';
				}

				nrBarHeight = innerBar.offsetHeight;
				nrBar.style.marginTop = -nrBarHeight + 'px';
				if (rjOptions.title) aUtils.addClass(nrBar, 'rj-bar-hidden');
			}

			// Hiding lightbox image title element if an image hasn't got data-imgtitle
			if (rjOptions.title) toggleTitle(imgTitle);

			// Animate opening lightbox
			aUtils.addClass(lightbox, 'rj-opened');
			aUtils.addClass(fullImage, 'rj-img-opened');

			// Highlighting active image on images list 
			if (rjOptions.imgbar) imgNumberHighlight();
		}
		
		// Changes images to next or previous image
		function slideImage(e) {
			
			// Buffering actual image and temporary hiding lightbox full image
			actualImg = actualImg || clickedImg;		// If function is executed at least second time, our actual image is equal to actual image from previous invoke. If function is executed first time, actual image is equal to clicked image from openImage function
			imgNum =  imgNum || clickedImgNumber;	// If function is executed at least second time, our image number is equal to image number from previous invoke. If function is executed first time, actual image number is equal to clicked image number from openImage function
			aUtils.removeClass(fullImage, 'rj-img-opened');
			
			// If next image button is clicked
			if (aUtils.hasClass(e.currentTarget, 'rj-slide-right')) {
				
				// Get lightbox image values and set image number to lightbox counter element
				// if next image doesn't exist, set first image as actual image
				// if next image exists, set next image as an actual image
				if (imgArray.indexOf(actualImg) >= imgArrayLen - 1) {
					actualImg = imgArray[0];
					newSrc = actualImg.src;
					newAlt = actualImg.alt;
					if (rjOptions.title) imgTitle = actualImg.getAttribute('data-imgtitle');
					imgNum = 1;
				} else {		// Set next image in the gallery as actual image
					actualImg = imgArray[imgArray.indexOf(actualImg) + 1];
					newSrc = actualImg.src;
					newAlt = actualImg.alt;
					if (rjOptions.title) imgTitle = actualImg.getAttribute('data-imgtitle');
					imgNum++;
				}
				
			// If previous image button is clicked	
			} else if (aUtils.hasClass(e.currentTarget, 'rj-slide-left')) {
				
				// Get lightbox image values and set image number to lightbox counter element
				// if previous image doesn't exist, set last image as actual image
				// if previous image exists, set previous image as an actual image
				if (imgArray.indexOf(actualImg) <= 0) {
					actualImg = imgArray[imgArrayLen - 1];
					newSrc = actualImg.src;
					newAlt = actualImg.alt;
					if (rjOptions.title) imgTitle = actualImg.getAttribute('data-imgtitle');
					imgNum = imgArrayLen;
				} else {		// Set previous image in the gallery as actual image
					actualImg = imgArray[imgArray.indexOf(actualImg) - 1];
					newSrc = actualImg.src;
					newAlt = actualImg.alt;
					if (rjOptions.title) imgTitle = actualImg.getAttribute('data-imgtitle');
					imgNum--;
				}
			}

			setTimeout(function() {
		
				// Setting lightbox element values
				fullImage.src = newSrc;
				fullImage.alt = newAlt;
				if (rjOptions.title) imgName.textContent = imgTitle;
				if (rjOptions.counter) imgNumber.textContent = imgNum;

				// Highlight image title (only if exist)
				if (rjOptions.title) toggleTitle(imgTitle);
				
				// Transition of lightbox image
				aUtils.addClass(fullImage, 'rj-img-opened');

				// Highlighting actual number of image in numbers panel
				if (rjOptions.imgbar) imgNumberHighlight();
			}, 100);		// Timeout to let finish image change transition
		}

		// Changing image after choosing image from number list
		function changeImg(e) {
			
			// Works only if single number is clicked
			if (aUtils.hasClass(e.target, 'rj-single-number')) {

				// Get number, src, alt and title of clicked image
				// in order to set it later to lightbox elements
				imgNum = e.target.textContent;
				actualImg = imgArray[imgNum - 1];
				imgSrc = actualImg.src;
				imgAlt = actualImg.alt;
				if (rjOptions.title) imgTitle = actualImg.getAttribute('data-imgtitle');

				// Temporary hide lightbox full image
				aUtils.removeClass(fullImage, 'rj-img-opened');

				setTimeout(function() {
					
					// Setting values of opened image to lightbox elements	
					fullImage.src = imgSrc;
					fullImage.alt = imgAlt;
					if (rjOptions.counter) imgNumber.textContent = imgNum;
					if (rjOptions.title) imgName.textContent = imgTitle;

					// Hiding lightbox image title element if an image hasn't got data-imgtitle
					if (rjOptions.title) toggleTitle(imgTitle);

					// Transition of lightbox image
					aUtils.addClass(fullImage, 'rj-img-opened');

					// Highlighting active image on images list 
					imgNumberHighlight();
				}, 100);		// Timeout to let image change transition end
			} else {
				return;
			}
		}
		
		// Close lightbox
		function closeLightbox() {
			removeBoxClickListeners();		// Prevents clicking on other image until lightbox closes properly
			
			// Compressing full image when it is expanded
			if (document.querySelector('.rj-hide')) {
				disableFullscreen();
			}

			// Clear values used by openImage, slideImage and changeImg function
			aUtils.removeClass('.rj-actual', 'rj-actual');
			imgArray = [];
			actualImg = null;
			clickedImg = null;
			imgNum = undefined;
			
			// Let the document to be scrolled
			aUtils.removeClass(html, 'lightbox-open');

			// Clear lightbox data, hide image title and image numbers bar
			aUtils.removeClass(fullImage, 'rj-img-opened');
			aUtils.removeClass(lightbox, 'rj-opened');
			if (rjOptions.title) aUtils.addClass(imgNameBar, 'rj-hidden-title');		// Closing title bar

			setTimeout(function() {		// Timeout to let the lightbox transition end
				fullImage.src = '';
				fullImage.alt = '';
				addBoxClickListeners();
			}, 200);
		}
		
		// Opening/closing lightbox numbers bar
		function openNumberBar() {
			nrBarHeight = innerBar.offsetHeight;
			nrBar.style.marginTop = -nrBarHeight + 'px';

			// Check whether the bar is opened or not and perform show/hide action
			if (aUtils.hasClass(nrBar, 'rj-bar-hidden')) {	
				nrBar.style.marginTop = 0;
				aUtils.removeClass(nrBar, 'rj-bar-hidden');
			} else if (!aUtils.hasClass(nrBar, 'rj-bar-hidden')) {
				nrBar.style.marginTop = -nrBarHeight + 'px';
				aUtils.addClass(nrBar, 'rj-bar-hidden');
			}
		}		

		// Highlighting numbers on numbers bar
		function imgNumberHighlight() {
			aUtils.removeClass('.rj-single-number', 'rj-highlighted');
			imgNum =  imgNum || clickedImgNumber;
			aUtils.addClass(document.querySelector('.rj-inner-bar .rj-single-number:nth-child(' + imgNum + ')'), 'rj-highlighted');
		}

		// Toggles image title (if exist)
		function toggleTitle(title) {
			aUtils.removeClass(imgNameBar, 'rj-hidden-title');

			if (title === null) {
				aUtils.addClass(imgNameBar, 'rj-hidden-title');
			} else {
				aUtils.removeClass(imgNameBar, 'rj-hidden-title');
			}
		}

		// Open fullscreen image
		function enableFullscreen() {
			aUtils.addClass('.rj-leftright', 'rj-hide');
			aUtils.addClass('.rj-updown', 'rj-hide');
			aUtils.addClass('.rj-central-lightbox', 'rj-fullscreen');
		}

		// Close fullscreen image
		function disableFullscreen() {
			aUtils.removeClass('.rj-leftright', 'rj-hide');
			aUtils.removeClass('.rj-updown', 'rj-hide');
			aUtils.removeClass('.rj-central-lightbox', 'rj-fullscreen');
		}

		// Setting lightbox height, hiding number bar on resize
		function setLightboxSize() {
			lightbox.style.height = window.innerHeight + 'px';
			
			if (rjOptions.imgbar) {
				aUtils.addClass('.rj-nrs-bar', 'rj-bar-hidden');
				nrBarHeight = innerBar.offsetHeight;
				nrBar.style.marginTop = -nrBarHeight + 'px';
			}
		}
		
		// Add event listeners to buttons, images and to window
		if (rjOptions.imgbar) nrBarButton.addEventListener('click', openNumberBar, false);
		if (rjOptions.imgbar) innerBar.addEventListener('click', changeImg, false);
		if (rjOptions.expandable) expandBtn.addEventListener('click', enableFullscreen, false);
		if (rjOptions.expandable) compressBtn.addEventListener('click', disableFullscreen, false);		
		close.addEventListener('click', closeLightbox, false);	
		window.addEventListener('resize', setLightboxSize, false);	
		addBoxClickListeners();
		addSlideBtnsClickListeners();
		setLightboxSize();
		
		// Enable closing lightbox when clicking on empty lightbox area
		lightbox.addEventListener('click', function(e) {
			if (aUtils.hasClass(e.target, 'rj-central-lightbox') || aUtils.hasClass(e.target, 'rj-leftright') || aUtils.hasClass(e.target, 'rj-updown')) {
				closeLightbox();
			}
		}, false);
		
	} else {
		return;
	}
	
	/*--------------------------------------------*/
	/*---------------Public methods---------------*/
	/*--------------------------------------------*/
	return {
		// Classifying images in every gallery - horizontal or vertical
		// in order to center images in boxes
		classifyImg: function() {
			for (i = galleriesCount; i--; ) {
				for (j = galleries[i].querySelectorAll('img').length; j--; ) {
					imgHeight = galleries[i].querySelectorAll('img')[j].offsetHeight;
					imgWidth = galleries[i].querySelectorAll('img')[j].offsetWidth;

					if (imgWidth > imgHeight) {		// Removing classes in case of reusing function on fully loaded page
						aUtils.removeClass(galleries[i].querySelectorAll('img')[j], 'rj-vertical');
						aUtils.removeClass(galleries[i].querySelectorAll('img')[j], 'rj-horizontal');
						aUtils.addClass(galleries[i].querySelectorAll('img')[j], 'rj-horizontal');
					} else {
						aUtils.removeClass(galleries[i].querySelectorAll('img')[j], 'rj-vertical');
						aUtils.removeClass(galleries[i].querySelectorAll('img')[j], 'rj-horizontal');
						aUtils.addClass(galleries[i].querySelectorAll('img')[j], 'rj-vertical');
					}

					galleries[i].querySelectorAll('img')[j].setAttribute('data-number', j + 1);
				}
			}
		}
	};
})();


// Classify gallery images after images are fully loaded
window.onload = rjGallery.classifyImg();