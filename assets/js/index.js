const calenderView = document.querySelector("#calenderView");
let calenderControls = document.querySelectorAll("#calenderControl > a");
let calenderText = document.querySelectorAll("#calenderControl > textarea");

const dateToday = new Date(
	new Date(Date.now()).getFullYear(),
	new Date(Date.now()).getMonth(),
	new Date(Date.now()).getDate()
);
let markedDate = dateToday;

let firstOfMonth;

const getYear = function (dt) {
	return new Date(dt).getFullYear();
};
const getMonth = function (dt) {
	return new Date(dt).getMonth();
};
const getWeekday = function (dt) {
	if (dt.getDay() == 0) {
		return 6;
	} else {
		return dt.getDay() - 1;
	}
};

function createNotificationBanner(tempDate) {
	let notificationBanner = document.createElement("div");
	notificationBanner.classList.add("notificationBanner");
	notificationBanner.addEventListener("animationend", () => {
		notificationBanner.remove();
	});
	notificationBanner.innerHTML =
		"<p>This date has been marked!</p><p>" + tempDate + "</p>";
	document.body.prepend(notificationBanner);
}

function dateOnClick(calenderDate, e, dateHolder) {
	e.preventDefault();
	let tempDate = dateHolder;
	markedDate = tempDate;
	if (document.querySelector("#calenderView .calenderPoint.active")) {
		document
			.querySelector("#calenderView .calenderPoint.active")
			.classList.remove("active");
	}
	calenderDate.classList.add("active");
	chooseNewDate(dateHolder);
	createNotificationBanner(tempDate);
}

function createCalenderDate(i, dateHolder, year, month, weekday) {
	let calenderDate;
	if (
		dateHolder.getDay() == 0 ||
		dateHolder.getDay() == 6 ||
		dateHolder < dateToday
	) {
		calenderDate = document.createElement("div");
		calenderDate.classList.add("inactive");
	} else {
		calenderDate = document.createElement("a");
		calenderDate.setAttribute("href", "#");
		calenderDate.addEventListener("click", (e) => {
			dateOnClick(calenderDate, e, dateHolder);
		});
		if (
			dateHolder.getDate() == dateToday.getDate() &&
			dateHolder.getMonth() == dateToday.getMonth()
		) {
			calenderDate.classList.add("today");
		}
		if (
			dateHolder.getDate() == markedDate.getDate() &&
			dateHolder.getMonth() == markedDate.getMonth()
		) {
			calenderDate.classList.add("active");
		}
	}
	calenderDate.innerHTML = dateHolder.getDate();
	calenderDate.classList.add("calenderPoint");
	if (i < 7) {
		let dOTW = document.createElement("p");
		dOTW.innerHTML =
			dateHolder
				.toLocaleDateString("da-DK", { weekday: "short" })
				.toUpperCase() + ".";
		calenderDate.prepend(dOTW);
	}
	if (dateHolder.getDate() == 1) {
		let dOTM = document.createElement("p");
		dOTM.innerHTML = dateHolder
			.toLocaleDateString("da-DK", { month: "short" })
			.toLowerCase();
		calenderDate.append(dOTM);
	}
	calenderView.appendChild(calenderDate);
}

function createCalenderView(dt) {
	let year = getYear(dt);
	let month = getMonth(dt);
	let weekday = getWeekday(dt);

	calenderView.innerHTML = "";

	for (let i = 0; i < 42; i++) {
		let dateHolder = new Date(year, month, i + 1 - weekday);

		createCalenderDate(i, dateHolder, year, month, weekday);
	}
	calenderText[0].innerHTML = year;
	calenderText[1].innerHTML = new Date(year, month, 1)
		.toLocaleDateString("da-DK", { month: "long" })
		.toUpperCase();
}

function chooseNewDate(dt) {
	let year = getYear(dt);
	let month = getMonth(dt);
	firstOfMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

function backwardMonth() {
	let year = getYear(firstOfMonth);
	let month = getMonth(firstOfMonth) - 1;
	firstOfMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

function forwardMonth() {
	let year = getYear(firstOfMonth);
	let month = getMonth(firstOfMonth) + 1;
	firstOfMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

function backwardYear() {
	let year = getYear(firstOfMonth) - 1;
	let month = getMonth(firstOfMonth);
	firstOfMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

function forwardYear() {
	let year = getYear(firstOfMonth) + 1;
	let month = getMonth(firstOfMonth);
	firstOfMonth = new Date(year, month, 1);

	createCalenderView(new Date(year, month, 1));
}

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
