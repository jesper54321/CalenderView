const calenderView = document.querySelector("#calenderView");
let calenderControls = document.querySelectorAll("#calenderControl > a");
let calenderText = document.querySelectorAll("#calenderControl > textarea");
console.log(calenderText);

let dateToday = new Date(Date.now());
dateToday.setHours(0, 0, 0, 0);
let chosenDate = dateToday;

let firstOfMonth;

const getYear = function (dt) {
	return new Date(dt).getFullYear();
};
const getMonth = function (dt) {
	return new Date(dt).getMonth();
};

function createCalenderView(dt) {
	let year = getYear(dt);
	let month = getMonth(dt);
	let weekday;

	calenderView.innerHTML = "";

	if (dt.getDay() == 0) {
		weekday = 6;
	} else {
		weekday = dt.getDay() - 1;
	}
	for (let i = 0; i < 42; i++) {
		let dateHolder = new Date(year, month, i + 1 - weekday);
		let datePicker;
		if (
			dateHolder.getDay() == 0 ||
			dateHolder.getDay() == 6 ||
			dateHolder < dateToday
		) {
			datePicker = document.createElement("div");
			datePicker.classList.add("inactive");
		} else {
			datePicker = document.createElement("a");
			datePicker.setAttribute("href", "#");
			datePicker.addEventListener("click", (e) => {
				e.preventDefault();
				let tempDate = dateHolder;
				chosenDate = tempDate;
				if (document.querySelector("#calenderView .calenderPoint.active")) {
					document
						.querySelector("#calenderView .calenderPoint.active")
						.classList.remove("active");
				}
				datePicker.classList.add("active");
				chooseNewDate(dateHolder);
				let notificationBanner = document.createElement("div");
				notificationBanner.classList.add("notificationBanner");
				notificationBanner.addEventListener("animationend", () => {
					notificationBanner.remove();
				});
				notificationBanner.innerHTML =
					"<p>This date has been marked!</p><p>" + tempDate + "</p>";
				document.body.prepend(notificationBanner);
			});
			if (
				dateHolder.getDate() == dateToday.getDate() &&
				dateHolder.getMonth() == dateToday.getMonth()
			) {
				datePicker.classList.add("today");
			}
			if (
				dateHolder.getDate() == chosenDate.getDate() &&
				dateHolder.getMonth() == chosenDate.getMonth()
			) {
				datePicker.classList.add("active");
			}
		}
		datePicker.innerHTML = dateHolder.getDate();
		datePicker.classList.add("calenderPoint");
		calenderText[0].innerHTML = year;
		calenderText[1].innerHTML = new Date(year, month, 1)
			.toLocaleDateString("da-DK", { month: "long" })
			.toUpperCase();
		calenderView.appendChild(datePicker);
	}
}

function chooseNewDate(dt) {
	let year = getYear(dt);
	let month = getMonth(dt);
	firstOfMonth = new Date(year, month, 1);

	console.log(firstOfMonth.toLocaleDateString("da-DK", { month: "long" }));
	console.log(firstOfMonth.getFullYear());

	createCalenderView(new Date(year, month, 1));
}

function backwardMonth() {
	let year = getYear(firstOfMonth);
	let month = getMonth(firstOfMonth) - 1;
	firstOfMonth = new Date(year, month, 1);

	console.log(firstOfMonth.toLocaleDateString("da-DK", { month: "long" }));
	console.log(firstOfMonth.getFullYear());

	createCalenderView(new Date(year, month, 1));
}

function forwardMonth() {
	let year = getYear(firstOfMonth);
	let month = getMonth(firstOfMonth) + 1;
	firstOfMonth = new Date(year, month, 1);

	console.log(firstOfMonth.toLocaleDateString("da-DK", { month: "long" }));
	console.log(firstOfMonth.getFullYear());

	createCalenderView(new Date(year, month, 1));
}

function backwardYear() {
	let year = getYear(firstOfMonth) - 1;
	let month = getMonth(firstOfMonth);
	firstOfMonth = new Date(year, month, 1);

	console.log(firstOfMonth.toLocaleDateString("da-DK", { month: "long" }));
	console.log(firstOfMonth.getFullYear());

	createCalenderView(new Date(year, month, 1));
}

function forwardYear() {
	let year = getYear(firstOfMonth) + 1;
	let month = getMonth(firstOfMonth);
	firstOfMonth = new Date(year, month, 1);

	console.log(firstOfMonth.toLocaleDateString("da-DK", { month: "long" }));
	console.log(firstOfMonth.getFullYear());

	createCalenderView(new Date(year, month, 1));
}

calenderControls.forEach((element, i) => {
	element.addEventListener("click", (e) => {
		e.preventDefault();
		let index = i;
		console.log(index);
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
