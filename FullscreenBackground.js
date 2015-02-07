/**
 * FullscreenBackground
 * @author Julian Haslinger
 * @version 0.0.1
 * @link http://aziz.wtf/plugins/FullscreenBackground
 * @description based on https://github.com/Gaya/Fullscreen-Background-jQuery-plugin
 */
(function () {
	this.FullscreenBackground = function () {

		this.options = {};

		var arg = arguments,
			defaults = {
				selector: 'img',
				fillOnResize: true,
				defaultCss: true
			};

		var element = "";
		var arrElements = [];
		switch (typeof arg[0]) {
			case('string'):
				arrElements = [document.getElementById(arg[0])];
				break;
			default:
				throw 'no element defined';
		}

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
				element.style.zIndex = 1;

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

				image.style.height = newHeight + 'px';
				image.style.width = newWidth + 'px';
				image.style.marginLeft = leftMargin + 'px';
				image.style.marginTop = topMargin + 'px';
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