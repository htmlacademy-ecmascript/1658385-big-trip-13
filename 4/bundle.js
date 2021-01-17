/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_trip_info_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/trip-info-main */ "./src/view/trip-info-main.js");
/* harmony import */ var _view_trip_info_cost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/trip-info-cost */ "./src/view/trip-info-cost.js");
/* harmony import */ var _view_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/menu */ "./src/view/menu.js");
/* harmony import */ var _view_filters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/filters */ "./src/view/filters.js");
/* harmony import */ var _view_sorting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/sorting */ "./src/view/sorting.js");
/* harmony import */ var _view_point_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/point-editor */ "./src/view/point-editor.js");
/* harmony import */ var _view_point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/point */ "./src/view/point.js");
/* harmony import */ var _mock_point__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mock/point */ "./src/mock/point.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./src/utils.js");










const POINTS_AMOUNT = 30;

const points = new Array(POINTS_AMOUNT).fill().map(_mock_point__WEBPACK_IMPORTED_MODULE_7__["generatePoint"]);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageBodyElement = document.querySelector(`.page-body`);
const pageHeaderElement = pageBodyElement.querySelector(`.page-header`);
const pageMainElement = pageBodyElement.querySelector(`.page-main`);

const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);

const menuContainerElement = tripControlsElement.querySelector(`.menu-container`);
const filtersContainerElement = tripControlsElement.querySelector(`.filters-container`);

const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const tripEventsHeaderElement = tripEventsElement.querySelector(`h2`);
const pointsListElement = tripEventsElement.querySelector(`.trip-events__list`);

const route = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["getRoute"])(points);
const dates = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["getDates"])(points);
render(tripInfoElement, Object(_view_trip_info_main__WEBPACK_IMPORTED_MODULE_0__["createTripInfoMainTemplate"])(route, dates), `beforeend`);

const cost = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["calcCost"])(points);
render(tripInfoElement, Object(_view_trip_info_cost__WEBPACK_IMPORTED_MODULE_1__["createTripInfoCostTemplate"])(cost), `beforeend`);

render(menuContainerElement, Object(_view_menu__WEBPACK_IMPORTED_MODULE_2__["createMenuTemplate"])(), `beforeend`);
render(filtersContainerElement, Object(_view_filters__WEBPACK_IMPORTED_MODULE_3__["createFiltersTemplate"])(), `beforeend`);

render(tripEventsHeaderElement, Object(_view_sorting__WEBPACK_IMPORTED_MODULE_4__["createSortingTemplate"])(), `afterend`);

render(pointsListElement, Object(_view_point_editor__WEBPACK_IMPORTED_MODULE_5__["createEditPointTemplate"])(points[0]), `beforeend`);
for (let i = 1; i < POINTS_AMOUNT; i++) {
  render(pointsListElement, Object(_view_point__WEBPACK_IMPORTED_MODULE_6__["createPointTemplate"])(points[i]), `beforeend`);
}


/***/ }),

/***/ "./src/mock/point.js":
/*!***************************!*\
  !*** ./src/mock/point.js ***!
  \***************************/
/*! exports provided: OFFERS, TYPES, DESTINATIONS, generatePoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFERS", function() { return OFFERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESTINATIONS", function() { return DESTINATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePoint", function() { return generatePoint; });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);


const getSample = (arr, amount) => {
  if (!amount) {
    const len = arr === null ? 0 : arr.length;
    if (len) {
      const randomIndex = Math.floor(Math.random() * len);
      const element = arr[randomIndex];
      arr.splice(randomIndex, 1);
      return element;
    } else {
      return undefined;
    }
  } else {
    const entitiesToChoose = arr.slice();
    const chosenEntities = [];
    for (let index = 0; index < amount; index++) {
      const chosenEntity = getSample(entitiesToChoose);
      chosenEntities.push(chosenEntity);
    }
    return chosenEntities;
  }
};

const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const START_DATE = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(getRandomInt(30), `days`);
const DURATION_IN_DAYS = 3;

const OFFERS = [
  {
    type: `Taxi`,
    name: `Order Uber`,
    price: 20
  },
  {
    type: `Flight`,
    name: `Add luggage`,
    price: 50
  },
  {
    type: `Flight`,
    name: `Switch to comfort`,
    price: 100
  },
  {
    type: `Flight`,
    name: `Add meal`,
    price: 15
  },
  {
    type: `Flight`,
    name: `Choose seats`,
    price: 5
  },
  {
    type: `Flight`,
    name: `Travel by train`,
    price: 40
  },
  {
    type: `Drive`,
    name: `Rent a car`,
    price: 200
  },
  {
    type: `Check-in`,
    name: `Add breakfast`,
    price: 50
  },
  {
    type: `Sightseeing`,
    name: `Book tickets`,
    price: 40
  },
  {
    type: `Sightseeing`,
    name: `Lunch in city`,
    price: 30
  }
];

const TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

const generateType = () => getSample(TYPES.slice());

const prices = {
  "Taxi": 20,
  "Bus": 50,
  "Train": 100,
  "Ship": 200,
  "Transport": 30,
  "Drive": 160,
  "Flight": 160,
  'Check-in': 600,
  "Sightseeing": 50,
  "Restaurant": 70,
};

const DESTINATIONS = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`
];

const generateDestination = () => getSample(DESTINATIONS.slice());

const generateOffers = (type) => {
  const offersToChoose = OFFERS.slice().filter((offer) => offer.type === type);
  const amountToChoose = getRandomInt(0, offersToChoose.length);
  const chosenOffers = amountToChoose ? getSample(offersToChoose, amountToChoose) : [];

  return chosenOffers;
};

const generateDescription = () => {
  const TEXT_TEMPLATE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const sentencesToChoose = TEXT_TEMPLATE.split(`. `);
  const sentencesAmountToChoose = getRandomInt(1, 5);
  const chosenSentences = getSample(sentencesToChoose, sentencesAmountToChoose);
  const text = chosenSentences.join(`. `);

  const PHOTO_SOURCE = `http://picsum.photos/248/152?r=`;

  const photoAmountToChoose = getRandomInt(1, 5);
  const photos = new Array(photoAmountToChoose).fill(photoAmountToChoose).map(() => `${PHOTO_SOURCE}${Math.floor(Math.random() * 1000)}`);

  return {
    text,
    photos
  };
};

const generateTime = (tripStartDate, durationOfTripInDays) => {
  const start = tripStartDate.add(getRandomInt(durationOfTripInDays * 24), `hour`).minute(0);
  const durationInMinutes = getRandomInt(1, durationOfTripInDays * 24 * 6) * 10;
  const end = start.add(durationInMinutes, `minute`);
  return {
    start,
    end
  };
};

const generatePoint = () => {
  const type = generateType();
  const price = prices[type];
  const destination = generateDestination();
  const offers = generateOffers(type);
  const description = generateDescription();
  const times = generateTime(START_DATE, DURATION_IN_DAYS);
  return {
    type,
    price,
    destination,
    offers,
    description,
    times,
    isFavorite: Boolean(getRandomInt(0, 1))
  };
};


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getDuration, getRoute, getDates, calcCost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDuration", function() { return getDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoute", function() { return getRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDates", function() { return getDates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcCost", function() { return calcCost; });
const getDuration = (start, end) => {
  const daysDuration = end.diff(start, `day`);
  const hoursDuration = end.subtract(daysDuration, `day`).diff(start, `hour`);
  const minutesDuration = end.subtract(daysDuration, `day`).subtract(hoursDuration, `hour`).diff(start, `minute`);
  let duration = `${minutesDuration}M`;
  if (!minutesDuration) {
    duration = `0`.concat(duration);
  }
  if (hoursDuration) {
    duration = `${hoursDuration}H `.concat(duration);
    if (hoursDuration < 10) {
      duration = `0`.concat(duration);
    }
  }
  if (daysDuration) {
    if (!hoursDuration) {
      duration = `00H `.concat(duration);
    }
    duration = `${daysDuration}D `.concat(duration);
    if (daysDuration < 10) {
      duration = `0`.concat(duration);
    }
  }
  return duration;
};

const getRoute = (points) => {
  const destinations = [];
  points.forEach((point) => {
    const lastDestination = destinations.slice(-1)[0];
    if (point.destination !== lastDestination) {
      destinations.push(point.destination);
    }
  });

  return destinations.join(` &mdash; `);
};

const getDates = (points) => {
  let {start, end} = points[0].times;
  points.forEach((point) => {
    if (point.times.start.diff(start) < 0) {
      start = point.times.start;
    }
    if (point.times.end.diff(end) > 0) {
      end = point.times.end;
    }
  });

  if (start.month() === end.month()) {
    return `${start.format(`MMM D`).toUpperCase()}&nbsp;&mdash;&nbsp;${end.date()}`;
  } else {
    return `${start.format(`MMM D`).toUpperCase()}&nbsp;&mdash;&nbsp;${end.format(`MMM D`).toUpperCase()}`;
  }
};

const calcCost = (points) => {
  let cost = 0;
  points.forEach((point) => {
    cost += point.price;
    point.offers.forEach((offer) => {
      cost += offer.price;
    });
  });

  return cost;
};


/***/ }),

/***/ "./src/view/filters.js":
/*!*****************************!*\
  !*** ./src/view/filters.js ***!
  \*****************************/
/*! exports provided: createFiltersTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiltersTemplate", function() { return createFiltersTemplate; });
const createFiltersTemplate = () => {
  return `
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};


/***/ }),

/***/ "./src/view/menu.js":
/*!**************************!*\
  !*** ./src/view/menu.js ***!
  \**************************/
/*! exports provided: createMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMenuTemplate", function() { return createMenuTemplate; });
const createMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  `;
};


/***/ }),

/***/ "./src/view/point-editor.js":
/*!**********************************!*\
  !*** ./src/view/point-editor.js ***!
  \**********************************/
/*! exports provided: createEditPointTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEditPointTemplate", function() { return createEditPointTemplate; });
/* harmony import */ var _mock_point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock/point */ "./src/mock/point.js");


const createEditPointTemplate = (point = {}) => {
  const {type, destination, times, price, offers, description} = point;
  const availableOffers = _mock_point__WEBPACK_IMPORTED_MODULE_0__["OFFERS"].slice().filter((offer) => offer.type === type);
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${_mock_point__WEBPACK_IMPORTED_MODULE_0__["TYPES"].map((typeToChose) => `
                  <div class="event__type-item">
                    <input id="event-type-${typeToChose.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeToChose.toLowerCase()}" ${typeToChose === type ? `checked` : ``}>
                    <label class="event__type-label  event__type-label--${typeToChose.toLowerCase()}" for="event-type-${typeToChose.toLowerCase()}-1">${typeToChose}</label>
                  </div>
                `).join(``)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
            <datalist id="destination-list-1">
              ${_mock_point__WEBPACK_IMPORTED_MODULE_0__["DESTINATIONS"].map((destinationToChose) => `
                <option value=${destinationToChose}></option>
              `).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${times.start.format(`DD/MM/YY HH:mm`)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${times.end.format(`DD/MM/YY HH:mm`)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${availableOffers.length ? `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${availableOffers.map((offer) => `
                <div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name.toLowerCase().split(` `).join(`-`)}-1" type="checkbox" name="event-offer-${offer.name.split(` `).join(`-`)}" ${offers.map((o) => o.name).includes(offer.name) ? `checked` : ``}>
                  <label class="event__offer-label" for="event-offer-${offer.name.split(` `).join(`-`)}-1">
                    <span class="event__offer-title">${offer.name}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>
              `).join(``)}
            </div>
          </section>` : ``}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description.text}</p>

            ${description.photos.length ? `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${description.photos.map((photo) => `
                  <img class="event__photo" src=${photo} alt="Event photo">
                `).join(``)}
              </div>` : ``}
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
};


/***/ }),

/***/ "./src/view/point.js":
/*!***************************!*\
  !*** ./src/view/point.js ***!
  \***************************/
/*! exports provided: createPointTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPointTemplate", function() { return createPointTemplate; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const createPointTemplate = (point) => {
  const {
    type,
    price,
    destination,
    offers,
    times,
    isFavorite
  } = point;

  const duration = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDuration"])(times.start, times.end);

  const favoriteClassName = isFavorite ? `event__favorite-btn--active` : ``;
  return `

    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${times.start.format(`YYYY-MM-DD`).toUpperCase()}>${times.start.format(`MMM D`).toUpperCase()}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="${type} icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${times.start.toISOString().substring(0, 16)}">${times.start.format(`HH:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${times.end.toISOString().substring(0, 16)}">${times.end.format(`HH:mm`)}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${offers ? `<ul class="event__selected-offers">
          ${offers.map((offer) => `<li class="event__offer">
            <span class="event__offer-title">${offer.name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>`).join(``)}
        </ul>` : ``}
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};


/***/ }),

/***/ "./src/view/sorting.js":
/*!*****************************!*\
  !*** ./src/view/sorting.js ***!
  \*****************************/
/*! exports provided: createSortingTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSortingTemplate", function() { return createSortingTemplate; });
const createSortingTemplate = () => {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>
  `;
};


/***/ }),

/***/ "./src/view/trip-info-cost.js":
/*!************************************!*\
  !*** ./src/view/trip-info-cost.js ***!
  \************************************/
/*! exports provided: createTripInfoCostTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripInfoCostTemplate", function() { return createTripInfoCostTemplate; });
const createTripInfoCostTemplate = (cost) => {
  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  `;
};


/***/ }),

/***/ "./src/view/trip-info-main.js":
/*!************************************!*\
  !*** ./src/view/trip-info-main.js ***!
  \************************************/
/*! exports provided: createTripInfoMainTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripInfoMainTemplate", function() { return createTripInfoMainTemplate; });
const createTripInfoMainTemplate = (route, dates) => {
  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>
  `;
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map