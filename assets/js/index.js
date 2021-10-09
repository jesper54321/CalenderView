//Collecting html elements for manipulation
/** @ calenderView 		= main grid */
const calenderView = document.querySelector("#calenderView");
/** @ calenderControls 	= arrows forwards and backwards */
let calenderControls = document.querySelectorAll("#calenderControl > a");
/** @ calenderText 		= identifier for current year/month */
let calenderText = document.querySelectorAll("#calenderControl > textarea");

/** @ initialising a constant holding the current date with time set to 00:00:00 for correct comparison to genereted dates if time is not 00:00:00 it will not recognize the generated date of today as being today since the total dateTime will be later than the generated one.*/
const dateToday = new Date(
	new Date(Date.now()).getFullYear(),
	new Date(Date.now()).getMonth(),
	new Date(Date.now()).getDate()
);

/** @ Initialising current date variable holding the information about which date you have clicked on*/
let markedDate = dateToday;

/** @ Initialising variable holding the currently selected month, used for solving issues occurring when generating a month for the calenderView*/
let selectedMonth;

/**  @param {Date} dateParam - Insert a Date
 * @returns
 * @ This function will return the Year of any Date you insert*/
const getYear = function (dateParam) {
	return new Date(dateParam).getFullYear();
};

/** @param {Date} dateParam - Insert a Date
 * @returns Number
 * @ This function will return the month of any Date you insert*/
const getMonth = function (dateParam) {
	return new Date(dateParam).getMonth();
};

/** @param {Date} dateParam - Insert a Date
 * @returns Number
 * @ This function will return the weekday of any Date you insert i.e. friday will return 4*/
const getWeekday = function (dateParam) {
	if (dateParam.getDay() == 0) {
		return 6;
	} else {
		return dateParam.getDay() - 1;
	}
};

/** @param {Date} temporaryDate Insert a Date
 * @ This function will use any Date to create a notification banner at the top of the screen with the date as part of the notification text*/
function createNotificationBanner(temporaryDate) {
	/** @ Html element for the notification banner*/
	let notificationBanner = document.createElement("div");
	notificationBanner.classList.add("notificationBanner");
	notificationBanner.addEventListener("animationend", () => {
		notificationBanner.remove();
	});
	notificationBanner.innerHTML =
		"<p>This date has been marked!</p><p>" + temporaryDate + "</p>";
	document.body.prepend(notificationBanner);
}

/** @param {Date} calenderDate Insert a Date
 * @param {Date} temporaryDate Insert a Date
 * @ This function will handle click events for the calenderDates*/
function dateOnClick(calenderDate, temporaryDate) {
	markedDate = temporaryDate;
	if (document.querySelector("#calenderView .calenderPoint.active")) {
		document
			.querySelector("#calenderView .calenderPoint.active")
			.classList.remove("active");
	}
	calenderDate.classList.add("active");
	chooseNewDate(temporaryDate);
	createNotificationBanner(temporaryDate);
}

/** @param {Number} i Iteration number
 * @param {Date} temporaryDate Insert a Date
 * @ This function will create a specific calenderDate depending on the parameters inserted (used for iteration)*/
function createCalenderDate(i, temporaryDate) {
	/** @ Html Calender Date Elemenet*/
	let calenderDate;

	if (
		temporaryDate.getDay() == 0 ||
		temporaryDate.getDay() == 6 ||
		temporaryDate < dateToday
	) {
		calenderDate = document.createElement("div");
		calenderDate.classList.add("inactive");
	} else {
		calenderDate = document.createElement("a");
		calenderDate.setAttribute("href", "#");
		calenderDate.addEventListener("click", (e) => {
			e.preventDefault();
			dateOnClick(calenderDate, temporaryDate);
			return false;
		});
	}

	calenderDate.innerHTML = temporaryDate.getDate();
	calenderDate.classList.add("calenderPoint");

	if (
		temporaryDate.getDate() == markedDate.getDate() &&
		temporaryDate.getMonth() == markedDate.getMonth()
	) {
		calenderDate.classList.add("active");
	}

	if (
		temporaryDate.getDate() == dateToday.getDate() &&
		temporaryDate.getMonth() == dateToday.getMonth()
	) {
		calenderDate.classList.add("today");
	}

	if (i < 7) {
		/** @ Html element for storing localestring weekday (weekday as text) used for adding weekdays at the top of the calender*/
		let dayOfTheWeek = document.createElement("p");
		dayOfTheWeek.innerHTML =
			temporaryDate
				.toLocaleDateString("da-DK", { weekday: "short" })
				.toUpperCase() + ".";
		calenderDate.prepend(dayOfTheWeek);
	}

	if (temporaryDate.getDate() == 1) {
		/** @ Html element for storing the month to visially show the starting month every time the 1st occurs*/
		let dayOfTheMonth = document.createElement("p");
		dayOfTheMonth.innerHTML = temporaryDate
			.toLocaleDateString("da-DK", { month: "short" })
			.toLowerCase();
		calenderDate.append(dayOfTheMonth);
	}

	calenderView.appendChild(calenderDate);
}

/** @param {Date} dateParam  Insert a date
 * @ This function will reset and create the calender main view, and start the iteration for the dates in the selected month*/
function createCalenderView(dateParam) {
	/** @ Variable for strong the year for calender creation*/
	let year = getYear(dateParam);

	/** @ Variable for strong the month for calender creation*/
	let month = getMonth(dateParam);

	/** @ Variable for strong the weekday for calender creation*/
	let weekday = getWeekday(dateParam);

	calenderView.innerHTML = "";

	for (let i = 0; i < 42; i++) {
		/** @ A varaible storing the temporary date used to fill empty spaces and correctly aligning the calender view*/
		let temporaryDate = new Date(year, month, i + 1 - weekday);

		createCalenderDate(i, temporaryDate);
	}
	calenderText[0].innerHTML = year;
	calenderText[1].innerHTML = new Date(year, month, 1)
		.toLocaleDateString("da-DK", { month: "long" })
		.toUpperCase();
}

/** @param {Date} dateParam Insert a Date
 * @ This function will change the selected date, to allow any set date and or month, allowing us to change month when clicking on the fill dates on both sides*/
function chooseNewDate(dateParam) {
	/** @ Variable for strong the year for calender creation*/
	let year = getYear(dateParam);

	/** @ Variable for strong the month for calender creation*/
	let month = getMonth(dateParam);
	selectedMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

/** @ This will go to the last month, used for arrow controls*/
function backwardMonth() {
	/** @ Variable for strong the year for calender creation*/
	let year = getYear(selectedMonth);

	/** @ Variable for strong the month for calender creation*/
	let month = getMonth(selectedMonth) - 1;
	selectedMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

/** @ This will go to the next month, used for arrow controls*/
function forwardMonth() {
	/** @ Variable for strong the year for calender creation*/
	let year = getYear(selectedMonth);

	/** @ Variable for strong the month for calender creation*/
	let month = getMonth(selectedMonth) + 1;
	selectedMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

/** @ This will go to the last year, used for arrow controls*/
function backwardYear() {
	/** @ Variable for strong the year for calender creation*/
	let year = getYear(selectedMonth) - 1;

	/** @ Variable for strong the month for calender creation*/
	let month = getMonth(selectedMonth);
	selectedMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

/** @ This will go to the next year, used for arrow controls*/
function forwardYear() {
	/** @ Variable for strong the year for calender creation*/
	let year = getYear(selectedMonth) + 1;

	/** @ Variable for strong the month for calender creation*/
	let month = getMonth(selectedMonth);
	selectedMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

//This iteration will add the event to the arrow controls
calenderControls.forEach((element, i) => {
	element.addEventListener("click", (e) => {
		e.preventDefault();
		let index = i;
		switch (index) {
			case 0:
				backwardYear();
				break;
			case 1:
				backwardMonth();
				break;
			case 2:
				forwardMonth();
				break;
			case 3:
				forwardYear();
				break;
		}
		return false;
	});
});

chooseNewDate(dateToday);
