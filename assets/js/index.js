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

	//Deleting the notification element from the page when its animation ends
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
	//Adding the selected date to the global variable for the selected date
	markedDate = temporaryDate;
	//If any date is set to active/marked
	if (document.querySelector("#calenderView .calenderPoint.active")) {
		//Select all active date elements and remove the active class
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

	//Checking if the day is a weekend or if it is before today
	if (
		temporaryDate.getDay() == 0 ||
		temporaryDate.getDay() == 6 ||
		temporaryDate < dateToday
	) {
		//Setting Weekends and days before today to a div and to be inactive(unclickable / greyed out)
		calenderDate = document.createElement("div");
		calenderDate.classList.add("inactive");
	} else {
		//Setting all other days to be clickable with normal coloring and adding a click event
		calenderDate = document.createElement("a");
		calenderDate.setAttribute("href", "#");
		calenderDate.addEventListener("click", (e) => {
			//Prevent the a tag from perferming its default action (linking)
			e.preventDefault();
			dateOnClick(calenderDate, temporaryDate);

			//Reporting back that it did not link the user anywhere
			return false;
		});
	}

	//adding the date as text to the date element
	calenderDate.innerHTML = temporaryDate.getDate();
	calenderDate.classList.add("calenderPoint");

	//Checking if this element is the element the user selected and adds an active class if it was
	if (
		temporaryDate.getDate() == markedDate.getDate() &&
		temporaryDate.getMonth() == markedDate.getMonth()
	) {
		calenderDate.classList.add("active");
	}

	//Checking if this element is representing today and if it does adding class today for custom styling
	if (
		temporaryDate.getDate() == dateToday.getDate() &&
		temporaryDate.getMonth() == dateToday.getMonth()
	) {
		calenderDate.classList.add("today");
	}

	//Checking if the date is in the first 7 days of out calender view and if it is, adds the short name of the day at the start of the element
	if (i < 7) {
		/** @ Html element for storing localestring weekday (weekday as text) used for adding weekdays at the top of the calender*/
		let dayOfTheWeek = document.createElement("p");
		dayOfTheWeek.innerHTML =
			temporaryDate
				.toLocaleDateString("da-DK", { weekday: "short" })
				.toUpperCase() + ".";
		calenderDate.prepend(dayOfTheWeek);
	}

	//Checks if the date is the 1st of a month, and if it is adds the month short name to the end of the element for showing which month is added after the selected one and which the selected one is
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

	//Resetting the calenderview
	calenderView.innerHTML = "";

	//Iterates the on the amount of days we want shown in our calender, calculating the date, and starting the function to create the element
	for (let i = 0; i < 42; i++) {
		/** @ A varaible storing the temporary date used to fill empty spaces and correctly aligning the calender view*/
		let temporaryDate = new Date(year, month, i + 1 - weekday);

		createCalenderDate(i, temporaryDate);
	}

	//Sets the text to show the currently selected year
	calenderText[0].innerHTML = year;

	//Sets the text to show the currently selected month by full name
	calenderText[1].innerHTML = new Date(year, month, 1)
		.toLocaleDateString("da-DK", { month: "long" })
		.toUpperCase();
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////                                                    //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////    STUFF BELOW SHOULD BE COMBINED AND OPTIMISED    //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////                                                    //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

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
		//Prevent the a tag from perferming its default action (linking)
		e.preventDefault();
		let index = i;
		//Switch determening which button was arrow control was clicked and executing corresponding function
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

		//Reporting back that it did not link the user anywhere
		return false;
	});
});

chooseNewDate(dateToday);
