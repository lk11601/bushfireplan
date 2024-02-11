export const onlyDate = (date) =>
	new Intl.DateTimeFormat('default', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	}).format(new Date(date));

export const USonlyDate = (date) =>
	new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	}).format(new Date(date));

export const monthDate = (date) =>
	new Intl.DateTimeFormat('default', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(new Date(date));

export const timeFormat = (date) =>
	new Intl.DateTimeFormat('default', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: false,
	}).format(new Date(date));

export const longDate = (date) =>
	new Intl.DateTimeFormat('default', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

export const monthDay = (date) => {
	const time = new Intl.DateTimeFormat('default', {
		month: 'long',
		day: 'numeric',
	}).formatToParts(new Date(date));

	return time[2].value + ' ' + time[0].value;
};

export const fullDate = (date) => {
	return onlyDate(date) + ' ' + timeFormat(date);
};

export const compareDate = (date) => {
	const now = new Date();
	const lastMsg = new Date(date);
	const oneDay = 1000 * 60 * 60 * 24;
	const difference = Math.round((now.getTime() - lastMsg.getTime()) / oneDay);
	if (difference > 0) return onlyDate(date);
	else return timeFormat(date);
};

export const isToday = (createdAt) => {
	const today = new Date();
	const someDate = new Date(createdAt);
	return (
		someDate.getDate() === today.getDate() &&
		someDate.getMonth() === today.getMonth() &&
		someDate.getFullYear() === today.getFullYear()
	);
};

export const timePassed = (thisDate) => {
	const now = new Date().getTime();
	const date = new Date(thisDate).getTime();
	let elapsed = (now > date ? now - date : date - now) / 1000;

	const getTime = (primaryName, value) => {
		const newValue = Math.floor(value);
		const primaryLabel = newValue > 1 ? `${primaryName}s` : primaryName;
		return `${newValue} ${primaryLabel}`;
	};

	if (elapsed <= 60) return 'less than a minute';
	elapsed = elapsed / 60;
	if (elapsed < 60) return getTime('minute', elapsed);
	elapsed = elapsed / 60;
	if (elapsed < 24) return getTime('hour', elapsed);
	elapsed = elapsed / 24;
	if (elapsed < 30) return getTime('day', elapsed);
	const daysElapsed = elapsed;
	elapsed = elapsed / 30;
	if (daysElapsed / 365 < 1) return getTime('month', elapsed);
	elapsed = daysElapsed / 365;
	if (elapsed) return getTime('year', elapsed);
};

export const daysPassed = (thisDate) => {
	const days = (date_1, date_2) => {
		let difference = date_1.getTime() - date_2.getTime();
		let totalHours = Math.ceil(difference / (1000 * 3600));
		let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
		return totalHours >= 24 ? TotalDays : 0;
	};
	const date_1 = new Date();
	const date_2 = new Date(thisDate);
	const passedTime = days(date_1, date_2);
	// less than 24 hours response with hours and minutes
	if (passedTime < 1) return timeFormat(thisDate);
	// less than 48 hours response with yesterday
	else if (passedTime === 1) return 'Yesterday';
	// anthying else month, day, year.
	else return USonlyDate(thisDate);
};
