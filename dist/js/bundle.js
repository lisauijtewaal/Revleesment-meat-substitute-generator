/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]

	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }

	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }

	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body

	    if (typeof input === 'string') {
	      this.url = input
	    } else {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split('\r\n').forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(3);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function print_results() {
	  fetch('menu-nieuw.json').then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    var replacements = data.meat_replacements.filter(filter_meat).sort(sort_by_rate);
	    var dishes = data.recipes.filter(filter_dish);
	    print_replacements(replacements);
	    print_dishes(dishes);
	  });
	}

	function print_replacements() {
	  var replacements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	  var topReplacement = replacements[0];
	  var restTop = replacements.slice(1, 2);

	  var formattedTopReplacement = '<div class="card">' + '<div class="left">' + ('<img src="' + topReplacement.image + '">') + ('<h1>' + topReplacement.name + '</h1>') + '<div class="bar">' + ('<h4>Producent: ' + topReplacement.maker + '</h4>') + '</div>' + '</div>' + '<div class="right">' + '<div class="text">' + ('<h5>' + topReplacement.percent + ' van de dagelijkse hoveelheid vitamine B12</h5>') + '<h4>VOEDINGSWAARDE</h4>' + ('<p>' + topReplacement.vitamines.join("</br> ") + '</p>') +
	  //`<img class="heart" src= "img/heart.png" ` +
	  //`<div class ="rate">` +
	  //`<h4 >${topReplacement.rate}</h4>` +
	  //`</div>` +
	  '</div>' + '<div class="bar">' + '<h4>Wat je misschien ook lekker vindt</h4>' + '</div>';

	  var replacementInfo = '</div>';

	  var formattedReplacements = restTop.map(format_meat_card);
	  document.querySelector('#meat-container').innerHTML = [formattedTopReplacement].concat(_toConsumableArray(formattedReplacements), [replacementInfo]).join('');
	}

	function format_meat_card(item) {
	  return '<div class="otherproducts">' + '<div class="otherproducts-left">' + ('<img class="secondimage" src="' + item.image + '">') + '</div>' + '<div class="otherproducts-right">' + ('<p class="main">' + item.name + '</p>') + ('<p>' + item.maker + '</p>') + '</div>' + '</div>';
	}

	function print_dishes() {
	  var dishes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	  var formattedDishes = dishes.map(format_card).join('');
	  document.querySelector('#dishes-container').innerHTML = formattedDishes;
	}

	function format_card(item) {
	  return '<div class="card-dish">' + '<div class="front">' + ('<img src="' + item.image + '">') + '<div class ="bar">' + ('<h4>' + item.course + '</h4>') + '</div>' + ('<h3>' + item.name + '</h3>') + '</div>' + '<div class="back">' + '<div class="bar">' + '<p>Ingredients</p>' + '</div>' + ('<p>' + item.ingredients.join(" - ") + '</p>') + '<div class ="bar">' + '</div>' + '</div>' + '</div>';
	}

	var refresh_switch = true;

	var available_filters = {
	  "meal_type": [{
	    "id": "1",
	    "label": "Voorgerecht",
	    "key": "pre-course",
	    "classes": "",
	    "type": "meal_type"
	  }, {
	    "id": "2",
	    "label": "Hoofdgerecht",
	    "key": "main_course",
	    "classes": "",
	    "type": "meal_type"
	  }, {
	    "id": "3",
	    "label": "Nagerecht",
	    "key": "dessert",
	    "classes": "",
	    "type": "meal_type"
	  }],
	  "made_without": [{
	    "id": "4",
	    "label": "Gluten",
	    "key": "gluten",
	    "classes": "",
	    "type": "made_without"
	  }, {
	    "id": "5",
	    "label": "Noten",
	    "key": "noten",
	    "classes": "",
	    "type": "made_without"
	  }, {
	    "id": "6",
	    "label": "Zuivel",
	    "key": "zuivel",
	    "classes": "",
	    "type": "made_without"
	  }],
	  "dish_info": [{
	    "id": "7",
	    "label": "Italiaans",
	    "key": "italiaans",
	    "classes": "",
	    "type": "dish_info"
	  }, {
	    "id": "8",
	    "label": "Aziatisch",
	    "key": "aziatisch",
	    "classes": "",
	    "type": "dish_info"
	  }, {
	    "id": "9",
	    "label": "Hollands",
	    "key": "hollands",
	    "classes": "",
	    "type": "dish_info"
	  }],
	  "meat_info": [{
	    "id": "7",
	    "label": "Varken",
	    "key": "varken",
	    "classes": "",
	    "type": "meat_info"
	  }, {
	    "id": "8",
	    "label": "Kip",
	    "key": "kip",
	    "classes": "",
	    "type": "meat_info"
	  }, {
	    "id": "9",
	    "label": "Rund",
	    "key": "rund",
	    "classes": "",
	    "type": "meat_info"
	  }, {
	    "id": "11",
	    "label": "Geen vlees",
	    "key": "geen-vlees",
	    "classes": "",
	    "type": "meat_info"
	  }]
	};

	var active_filters = [];

	document.addEventListener('DOMContentLoaded', init);

	function init() {
	  document.querySelector('#filters-container').addEventListener('click', toggle_filter);
	  document.querySelector('#show-inner-filters').addEventListener('click', toggle_inner_filters);
	  document.querySelector('#meat-container').addEventListener('click', flip_card);

	  print_filters();
	}

	function toggleColor() {
	  document.getElementById("button").classList.toggle("active");
	  document.getElementById("button").classList.toggle("button");
	}

	function print_filters() {
	  var container = document.querySelector('#filters-container');
	  var inner_filters = container.querySelector('#inner-filters');
	  var meal_type_filters = available_filters.meal_type.map(format_filter_button);
	  var dish_info_filters = available_filters.dish_info.map(format_filter_button);
	  var meat_info_filters = available_filters.meat_info.map(format_filter_button);
	  var made_without_filters = available_filters.made_without.map(format_filter_button);
	  inner_filters.insertAdjacentHTML('beforebegin', '<ul class="filters-container" id="meal-type-filters">' + meal_type_filters.join('') + '</ul>');
	  inner_filters.insertAdjacentHTML('beforebegin', '<h2 class="filter-heading">Stap 2: Kies de basis van het gerecht</h2><ul class="filters-container" id="dish-info-filters">' + dish_info_filters.join('') + '</ul>');
	  inner_filters.insertAdjacentHTML('beforebegin', '<h2 class="filter-heading">Stap 3: Voor welk(e) vlees of vis zoek je vervanging?</h2><ul class="filters-container" id="dish-info-filters">' + meat_info_filters.join('') + '</ul>');
	  inner_filters.insertAdjacentHTML('beforebegin', '<h2 class="filter-heading">Stap 4: Heb je nog allergieen?</h2><ul class="filters-container" id="made-without-filters">' + made_without_filters.join('') + '</ul>');
	  init_active_filters();
	}

	function toggle_inner_filters(e) {
	  var button = get_parent_by_class('button', e.target);
	  if (button) {
	    button.classList.toggle('inner-filters-visible');
	    button.classList.toggle('active');
	    print_results();
	  }
	}

	function flip_card(e) {
	  var card = get_parent_by_class('card', e.target);
	  if (card) {
	    console.log('hallo');
	    card.classList.toggle('flip');
	  }
	}

	function init_active_filters() {
	  active_filters = Array.prototype.slice.call(document.querySelectorAll('.filter.active')).map(get_active_filter_object);
	}

	function format_filter_button(filter) {
	  return '<li class="filter-wrapper">' + ('<button class="button filter filter-button ' + filter.classes + '" data-key="' + filter.key + '" data-value="' + (filter.value ? filter.value : '') + '" data-filter="' + filter.type + '" data-id="' + filter.id + '">' + filter.label + '</button>') + '</li>';
	}

	function toggle_filter(e) {
	  var filter = get_parent_by_class('filter', e.target);
	  if (filter) {
	    if (filter.classList.contains('active')) {
	      active_filters = active_filters.filter(function (active_filter) {
	        return active_filter.id != filter.getAttribute('data-id');
	      });
	    } else {
	      active_filters.push(get_active_filter_object(filter));
	    }
	    filter.classList.toggle('active');
	  }
	}

	function get_active_filter_object(filter) {
	  return {
	    "id": filter.getAttribute('data-id'),
	    "type": filter.getAttribute('data-filter'),
	    "value": filter.getAttribute('data-value'),
	    "key": filter.getAttribute('data-key')
	  };
	}

	function filter_dish(item) {
	  var keep_dish = true;
	  var break_loop = false;
	  active_filters.forEach(function (active_filter) {
	    if (break_loop) return;
	    switch (active_filter.type) {
	      case 'meal_type':
	        keep_dish = keep_dish && item.meal_type == active_filter.key;
	        break;
	      case 'made_without':
	        item.allergens.forEach(function (allergen) {
	          if (keep_dish && allergen.key == active_filter.key) {
	            keep_dish = false;
	            break_loop = true;
	          }
	        });
	        break;
	      case 'dish_info':
	        keep_dish = keep_dish && item.dish_info == active_filter.key;
	        break;
	      case 'meat_info':
	        keep_dish = keep_dish && item.meat_info == active_filter.key;
	        break;
	    }
	  });
	  return keep_dish;
	}

	function sort_by_rate(prev, cur) {
	  return cur.rate - prev.rate;
	}

	function filter_meat(item) {
	  var keep_dish = true;
	  var break_loop = false;
	  active_filters.forEach(function (active_filter) {
	    if (break_loop) return;
	    switch (active_filter.type) {
	      case 'made_without':
	        item.allergens.forEach(function (allergen) {
	          if (allergen.key == active_filter.key) {
	            keep_dish = false;
	            break_loop = true;
	          }
	        });
	        break;
	      case 'meat_info':
	        keep_dish = item.replaces == active_filter.key;
	        break;
	    }
	  });
	  return keep_dish;
	}

	function get_parent_by_class(parentClass, child) {
	  var node = child;
	  while (node != null) {
	    if (node.className && node.classList.contains(parentClass)) {
	      return node;
	    }
	    node = node.parentNode;
	  }
	  return false;
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./style.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "body {\n  margin: 0;\n  background-color: #f4b802;\n  transition: left 0.2s ease-in-out;\n  left: 0;\n  width: 100%;\n  position: absolute; }\n  body.users-sidebar-visible {\n    left: 400px; }\n\n#dishes-container {\n  margin: 0 auto;\n  width: 80%;\n  overflow: visible;\n  display: flex;\n  display: -webkit-flex;\n  -webkit-flex-wrap: wrap;\n  /* Safari 6.1+ */\n  flex-wrap: wrap;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-font-smoothing: antialiased;\n  justify-content: center; }\n\n#meat-container {\n  margin: 0 auto;\n  width: 80%;\n  height: auto;\n  overflow: visible;\n  display: flex;\n  display: -webkit-flex;\n  -webkit-flex-wrap: wrap;\n  /* Safari 6.1+ */\n  flex-wrap: wrap;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-font-smoothing: antialiased;\n  justify-content: center; }\n\nh1 {\n  color: white;\n  text-align: center;\n  font-family: 'Amatic SC', cursive;\n  font-size: 65px;\n  margin-top: 0px; }\n\nh2 {\n  text-align: center;\n  color: #245433;\n  font-family: Helvetica;\n  margin: 30px 8px 10px 8px; }\n\nh3 {\n  color: white;\n  text-align: center;\n  font-family: 'Amatic SC', cursive;\n  font-size: 42px;\n  margin-top: 0px; }\n\n.card-dish {\n  text-align: center;\n  flex: 1 0 0px;\n  -webkit-flex: 1 0 0;\n  perspective: 900px;\n  min-width: 350px;\n  max-width: 350px;\n  background-color: #ffffff;\n  margin: 0 8px 40px 8px;\n  position: relative;\n  transform-style: preserve-3d;\n  -webkit-transform-style: preserve-3d;\n  height: 500px;\n  cursor: pointer;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden; }\n  .card-dish img {\n    width: 100%;\n    display: block; }\n  .card-dish h3 {\n    color: black;\n    text-align: center;\n    font-family: 'Amatic SC', cursive;\n    font-size: 42px;\n    margin-top: 0;\n    margin-bottom: 0; }\n\n.card {\n  text-align: center;\n  max-width: 350px;\n  min-width: 350px;\n  flex: 1 0 0px;\n  -webkit-flex: 1 0 0;\n  perspective: 900px;\n  margin: 0 8px 40px 8px;\n  position: relative;\n  transform-style: preserve-3d;\n  -webkit-transform-style: preserve-3d;\n  background-color: #ffffff;\n  cursor: pointer;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  heigth: 500px; }\n  .card img {\n    width: 100%;\n    height: auto;\n    display: block; }\n  .card .heart {\n    width: 11%;\n    margin-top: 10px;\n    margin-bottom: 20px; }\n  .card .rate {\n    position: absolute;\n    color: white; }\n    .card .rate h4 {\n      font-size: 22px; }\n  .card .left {\n    height: auto;\n    width: 100%; }\n  .card .right {\n    width: 100%;\n    background-color: #ffffff;\n    height: auto;\n    color: #ffffff; }\n    .card .right h5 {\n      color: #f4b802;\n      font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n      font-size: 24px;\n      margin-top: 20px;\n      margin-bottom: 0px; }\n    .card .right h3 {\n      margin-left: 10px;\n      color: #f4b802;\n      font-size: 18px;\n      margin-top: 0px; }\n    .card .right .otherproducts {\n      width: 98%;\n      margin: 0 auto;\n      background-color: #ffffff; }\n      .card .right .otherproducts .otherproducts-left {\n        float: left; }\n      .card .right .otherproducts .otherproducts-right {\n        text-align: left;\n        padding-left: 100px; }\n        .card .right .otherproducts .otherproducts-right .main {\n          color: black;\n          margin: 10px 0px 0px 0px;\n          font-size: 24px;\n          font-weight: bold;\n          font-family: 'Amatic SC', cursive; }\n        .card .right .otherproducts .otherproducts-right h3 {\n          color: white; }\n        .card .right .otherproducts .otherproducts-right p {\n          margin-top: 2px;\n          font-size: 14px;\n          color: black; }\n    .card .right .text {\n      margin: 0 auto;\n      width: 90%; }\n      .card .right .text h4 {\n        color: black;\n        padding-bottom: 20px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n      .card .right .text .bar {\n        color: #245433;\n        height: 50px;\n        font-family: 'Hind', sans-serif;\n        width: 100%; }\n    .card .right .secondimage {\n      width: 100px;\n      height: 100px; }\n  .card h3 {\n    color: black;\n    font-style: italic;\n    padding-left: 20px;\n    font-size: 16px;\n    font-family: 'PT Serif Caption', serif; }\n  .card h1 {\n    color: #000000;\n    text-align: center;\n    font-family: 'Amatic SC', cursive;\n    font-size: 42px; }\n  .card .bar {\n    color: white;\n    background-color: #245433;\n    font-family: 'Hind', sans-serif;\n    width: 100%; }\n    .card .bar h4 {\n      padding-left: 20px;\n      padding-top: 12px;\n      padding-bottom: 8px;\n      margin-top: 0;\n      margin-bottom: 0;\n      font-size: 18px;\n      background-color: #245433;\n      color: #ffffff; }\n  .card p {\n    font-family: 'Hind', sans-serif;\n    margin-top: -20px;\n    padding-bottom: 10px;\n    padding-left: 20px;\n    color: black; }\n\n#users-container {\n  position: fixed;\n  top: 0;\n  left: -400px;\n  width: 400px;\n  height: 100%;\n  transition: left 0.2s ease-in-out; }\n  #users-container ul {\n    padding-left: 0; }\n  #users-container li {\n    list-style: none;\n    text-align: center; }\n  .users-sidebar-visible #users-container {\n    left: 0; }\n\n#toggle-users-sidebar {\n  position: fixed;\n  top: 16px;\n  left: 16px;\n  transition: left 0.2s ease-in-out; }\n  #toggle-users-sidebar span {\n    padding-right: 8px; }\n  #toggle-users-sidebar .user-icon {\n    position: absolute;\n    margin-top: -4px; }\n  .users-sidebar-visible #toggle-users-sidebar {\n    left: 416px; }\n\n#filters-container {\n  min-width: 350px;\n  max-width: 850px;\n  width: 80%;\n  margin: 0 auto 24px; }\n\n.filters-container {\n  display: flex;\n  padding-left: 0;\n  justify-content: center;\n  flex-wrap: wrap;\n  margin-top: 0; }\n\n.filter-wrapper {\n  list-style: none; }\n\n#inner-filters {\n  overflow: hidden;\n  max-height: 0;\n  transition: all 0.2s ease-in-out; }\n  .inner-filters-visible #inner-filters {\n    max-height: 625px; }\n    @media (min-width: 768px) {\n      .inner-filters-visible #inner-filters {\n        max-height: 460px; } }\n    @media (min-width: 980px) {\n      .inner-filters-visible #inner-filters {\n        max-height: 310px; } }\n\n#show-inner-filters span {\n  padding-right: 8px; }\n\n#show-inner-filters .arrow-down {\n  transition: transform 0.2s ease-in-out;\n  position: absolute;\n  margin-top: -4px; }\n\n#show-inner-filters.active .arrow-down {\n  transform: rotate(180deg); }\n\n.button {\n  min-width: 150px;\n  max-width: 350px;\n  width: 245px;\n  margin: 1em;\n  padding: 1em 2em;\n  background-color: white;\n  vertical-align: middle;\n  position: relative;\n  z-index: 1;\n  -webkit-backface-visibility: hidden;\n  -moz-osx-font-smoothing: grayscale;\n  color: #000000;\n  font-size: 14px;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  cursor: pointer;\n  overflow: hidden;\n  transition: border-color 0.3s, color 0.3s;\n  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);\n  border: 3px solid #245433;\n  flex: 1; }\n  .button.active {\n    color: #ffffff;\n    border-color: #000000;\n    background-color: #245433; }\n  .button:hover {\n    color: #000000;\n    border-color: #000000; }\n  .button:hover::before {\n    opacity: 1;\n    background-color: #245433;\n    transform: rotate3d(0, 0, 1, 0deg);\n    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n  .button.active {\n    color: #ffffff;\n    border-color: #000000; }\n    .button.active:before {\n      opacity: 1;\n      background-color: #ffffff;\n      transform: rotate3d(0, 0, 1, 0deg);\n      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1); }\n    .button.active:hover:before {\n      transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0); }\n", ""]);

	// exports


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
		if(false) {
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


/***/ })
/******/ ]);