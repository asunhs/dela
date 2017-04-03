webpackJsonp([2,4],{

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(533);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(810)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../node_modules/postcss-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../node_modules/postcss-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(68)();
// imports
exports.push([module.i, "@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);", ""]);

// module
exports.push([module.i, "html {\n  -webkit-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n          text-size-adjust: 100%;\n  /* Prevent font scaling in landscape while allowing user zoom */ }\n\nbody {\n  background-color: #0b2c19;\n  color: #d6a066;\n  font-family: 'Noto Sans KR', sans-serif;\n  margin: 0; }\n\nheader {\n  font-size: 15px;\n  font-weight: bold;\n  margin: 15px 8px; }\n\ndela-root > img {\n  width: 100%;\n  margin: auto; }\n\n.time {\n  text-align: right;\n  font-size: 13px;\n  margin: 0 8px; }\n\n.closed {\n  width: 100%;\n  text-align: center;\n  color: #577620;\n  font-size: 14px;\n  font-weight: bold;\n  margin: 50px 0; }\n\n.page-info {\n  font-size: 12px;\n  padding: 10px;\n  margin-top: 20px; }\n\n.page-info, .page-info a, .page-info a:hover, .page-info a:visited {\n  color: #577620; }\n\n.filter {\n  overflow: hidden;\n  padding: 3px 8px 5px 35px;\n  margin: 16px 0;\n  background-color: #001c09;\n  border-top: 2px solid #000c00; }\n  .filter.fold {\n    height: 40px; }\n  .filter .filters {\n    margin-left: -28px;\n    margin-right: -2px;\n    vertical-align: middle;\n    display: inline-block;\n    opacity: .5;\n    width: 26px;\n    height: 26px;\n    background-size: 26px;\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABL0lEQVR42mNggAHPXHbN0OJ8/ZiaUwaxtd8M4+v+UxODzASZDbIDZBcDMlDxTJHRi66+aJTU/N84uYWmGGQHyC6QnXCfgwRobTE6BtkJDglQkNDD59hCAhwdoHiht+UwDLKbAZQ4BsoBILsZQCl0oBwAsnvUAXgdEFg17X9a1yKKcHD1dPIdsOnIhf+Ugh0nr5DvgBV7T1HsgPUHz5HvANusrv/nbz0i2/Ir9578t8/ppiwRkuuIywQsJykXkOoIYiwnORsS6whiLSerHCDkCFIsJ7sggjjiIcWWU1QSggoXdBDZMJt+RXFA5VQMB4TVzRx1wAhygHfppP///v1DcQCo5qRre6Bo8qr/6w+d+7/h0Pn/pdPWDOEGyYA3Sge8WT7gHZMB75oNfOd0gLvnAFdyIvU/FCC4AAAAAElFTkSuQmCC\"); }\n  .filter.on .filters {\n    opacity: 1; }\n  .filter ul {\n    list-style-type: none;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 3px 10px;\n    padding: initial;\n    font-size: 14px; }\n    .filter ul li {\n      min-width: 50px;\n      text-align: center;\n      box-sizing: border-box;\n      height: 26px;\n      cursor: pointer;\n      color: #f3f3f3;\n      opacity: .5;\n      display: inline-block;\n      text-transform: uppercase;\n      padding: 2px 5px;\n      margin: 4px 2px;\n      border-radius: 3px; }\n      .filter ul li.on {\n        opacity: 1; }\n  .filter .filter-more {\n    cursor: pointer;\n    float: right;\n    vertical-align: middle;\n    margin: 4px 0;\n    width: 26px;\n    height: 26px;\n    background-size: 26px;\n    background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAQElEQVR42u3UyQkAIAwEQDu0/w7sIiqIL78e4AzkvQuBTQkYIiK3K7Ffz8irAifCZ4knC9x9AdgBOwB2wA7AtypY5DCk9JZmiwAAAABJRU5ErkJggg==\"); }\n\n.dela-card-list {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap; }\n  .dela-card-list .dela-card {\n    display: inline-block;\n    margin: 0 8px;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 100%;\n            flex: 1 1 100%; }\n  @media screen and (min-width: 380px) {\n    .dela-card-list .dela-card {\n      min-width: 350px;\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 350px;\n              flex: 1 1 350px; } }\n\n.B1 {\n  background-color: #e88705; }\n\n.B2 {\n  background-color: #e5ac05; }\n\n.A {\n  background-color: #e88705; }\n\n.B {\n  background-color: #e5ac05; }\n\n.super-high {\n  background-color: #b70f0f; }\n\n.high {\n  background-color: #e07070; }\n\n.normal {\n  background-color: #9dc8d6; }\n\n.low {\n  background-color: #577620; }\n\n.super-low {\n  background-color: #90ee90; }\n\nspan.E59C, span.E59D {\n  background-color: #b45d10; }\n\nspan.E59F {\n  background-color: #e88705; }\n\nspan.E59G {\n  background-color: #e5ac05; }\n\nspan.E59E {\n  background-color: #59aa31; }\n\nspan.E5EC, span.E5ED {\n  background-color: #b45d10; }\n\nspan.E5E8 {\n  background-color: #59aa31; }\n\nspan.E5EA {\n  background-color: #8a36be; }\n\nspan.E5E9 {\n  background-color: #b45d10; }\n\nspan.E5EB {\n  background-color: #31aa8b; }\n\nspan.E5E6 {\n  background-color: #b70f0f; }\n\nspan.E5E7 {\n  background-color: #e5ac05; }\n\nspan.E5HX {\n  background-color: #b45d10; }\n\nspan.E5HY {\n  background-color: #59aa31; }\n\nspan.E5HZ {\n  background-color: #e5ac05; }\n\nspan.E1G3 {\n  background-color: #b45d10; }\n\nspan.E1G4 {\n  background-color: #e5ac05; }\n\nspan.E1G5 {\n  background-color: #59aa31; }\n\nspan.b_spring, span.b_dodam, span.b_01, span.b_02, span.dodam_01, span.dodam_02, span.gosel, span.b_gosel {\n  background-color: #b45d10; }\n\nspan.b_woori {\n  background-color: #e88705; }\n\nspan.b_gats, span.b_04 {\n  background-color: #e5ac05; }\n\nspan.b_snap, span.b_snap_snack, span.b_health_salad, span.b_health_juice, span.b_to_sandwich, span.b_to_bread, span.b_to_fruit, span.b_to_juice, span.b_to_pizza, span.b_to_picnic, span.b_to_bibim, span.b_03 {\n  background-color: #59aa31; }\n\nspan.b_brown, span.b_health_korean {\n  background-color: #8a36be; }\n\nspan.b_health_theme, span.b_health_bibim, span.b_health_special, span.b_08, span.b_09, span.healthy {\n  background-color: #31aa8b; }\n\nspan.b_singfu, span.b_05, span.china_01, span.china_02 {\n  background-color: #b70f0f; }\n", ""]);

// exports


/***/ }),

/***/ 68:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 810:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 816:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(352);


/***/ })

},[816]);
//# sourceMappingURL=styles.bundle.js.map