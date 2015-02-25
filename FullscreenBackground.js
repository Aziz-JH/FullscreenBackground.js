/**
 * FullscreenBackground.js
 * @author Julian Haslinger
 * @version 0.0.3
 * @link http://aziz.wtf/plugins/FullscreenBackground.js
 */
(function () {
	this.FullscreenBackground = function () {

		this.options = {};

		var arg = arguments,
			defaults = {
				selector: 'img',
				fillOnResize: true,
				defaultCss: true,
				topOffset: 0,
				leftOffset: 0,
				rightOffset: 0,
				bottomOffset: 0
			};

		var element = "",
			arrElements = [];
		switch (typeof arg[0]) {
			case('string'):
				arrElements = document.querySelectorAll(arg[0]);
				break;
			default:
				if(arg[0] instanceof HTMLElement) {
					arrElements.push(arg[0]);
					break;
				}
				if(arg[0] instanceof jQuery) {
					arrElements = arg[0].toArray();
					break;
				}
				throw 'no element defined';
		}

		if(typeof arg[1] != 'object') arg[1] = {};
		if (arg[1] && typeof arg[1] === 'object') {
			this.options = extendDefaults(defaults, arg[1]);
		}

		var options = this.options,
			html = document.getElementsByTagName('html')[0],
			body = document.getElementsByTagName('body')[0];

		for (var i = 0, len = arrElements.length; i < len; ++i) {
			element = arrElements[i];

			if (options.defaultCss === true) {

				html.style.height = '100%';
				html.style.width = '100%';

				body.style.height = '100%';
				body.style.width = '100%';

				element.style.height = '100%';
				element.style.width = '100%';
				element.style.overflow = 'hidden';
				element.style.position = 'fixed';
				element.style.top = 0;
				element.style.left = 0;
			}

			run(options.selector, element);
		}

		function run(selector, element) {
			if (options.fillOnResize === true) {
				window.addEventListener('resize', function(){
					fillBg(selector, element);
				});
			}

			fillBg(selector, element);
		}

		function fillBg(selector, parentElement) {
			var windowHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
			var windowWidth = isNaN(window.innerWidth) ? window.clientWidth : window.innerWidth;

			windowHeight = windowHeight - options.topOffset;
			windowWidth = windowWidth - options.leftOffset;

			var arrImages = parentElement.children;

			for (var i = 0, len = arrImages.length; i < len; ++i) {
				var image = arrImages[i];

				if(image.tagName.toLowerCase() !== selector) {
					continue;
				}

				var imgHeight = image.getAttribute('height');
				var imgWidth = image.getAttribute('width');

				var newWidth = windowWidth;
				var newHeight = (windowWidth / imgWidth) * imgHeight;
				var topMargin = ((newHeight - windowHeight) / 2) * -1;
				var leftMargin = 0;

				if (newHeight < windowHeight) {
					newWidth = (windowHeight / imgHeight) * imgWidth;
					newHeight = windowHeight;
					topMargin = 0;
					leftMargin = ((newWidth - windowWidth) / 2) * -1;
				}

				image.style.height = Math.floor(newHeight) + 'px';
				image.style.width = Math.floor(newWidth) + 'px';
				image.style.marginLeft = Math.floor(leftMargin) + 'px';
				image.style.marginTop = Math.floor(topMargin) + 'px';
				image.style.display = 'block';
			}
		}

		function extendDefaults(source, properties) {
			var property;
			for (property in properties) {
				if (properties.hasOwnProperty(property)) {
					source[property] = properties[property];
				}
			}
			return source;
		}
	};
}());