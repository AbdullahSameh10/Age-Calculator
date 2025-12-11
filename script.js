const Inputs = document.querySelectorAll(".card__input");
const superficialCalculateBtn = document.querySelector(".superficial");
const deepCalculateBtn = document.querySelector(".deep");

const resultLabel = document.querySelector(".valueLabel");
const resultValue = document.querySelectorAll(".card__resultValue");
const cardResult = document.querySelector(".card__result");
const secondaryLabel = document.querySelector(".card__resultLabel.secondary");

const defineVariables = () => {
  const dayInput = document.querySelector('.card__input[name="day"]').value;
  const monthInput = document.querySelector('.card__input[name="month"]').value;
  const yearInput = document.querySelector('.card__input[name="year"]').value;

  const userDate = new Date(yearInput, monthInput - 1, dayInput);

  const currentDate = new Date();

  return [
    currentDate.getFullYear() - userDate.getFullYear(),
    currentDate.getMonth() - userDate.getMonth(),
    currentDate.getDate() - userDate.getDate(),
  ];
};

const updateAgeLabel = (messageText, fontSize) => {
  resultLabel.innerHTML = messageText;
  resultLabel.style.fontSize = fontSize;

  resultValue.forEach((element) => (element.style.fontSize = fontSize));

  cardResult.style.fontSize = fontSize;

  secondaryLabel.textContent = "Old";
};

const rewriteMessage = (ageYears, ageMonths = 0, ageDays = 0) => {
  const message = [];

  message.push(
    `<span class="card__resultValue">${ageYears}</span>` +
      (ageYears === 1 ? " Year" : " Years")
  );

  if (ageMonths > 0) message.push(
																		`<span class="card__resultValue">${ageMonths}</span>` +
																			(ageMonths === 1 ? " Month" : " Months")
																	);

  if (ageDays > 0) message.push(
																	`<span class="card__resultValue">${ageDays}</span>` +
																		(ageDays === 1 ? " Day" : " Days")
																);

  return message.join(" and ");
};

const yearsValidate = (year) => {
  const currentYear = new Date().getFullYear();
  return year >= 1 && year <= currentYear;
};
const monthsValidate = (year, month) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  return (
    (year === currentYear && month <= currentMonth) ||
    (month >= 1 && month <= 12)
  );
};
const daysValidate = (year, month, day) => {
  const userDate = new Date(year, month - 1, day);
  const today = new Date();

  /*
   * We did this to check if the day is real,
   * for example if the user entered 30 in the days field and 2 in the months field it means wrong
   * and it will be the day 2 in the month 3, as the february has only 28 days
   */

  const isDayReal =
    userDate.getFullYear() === Number(year) &&
    userDate.getMonth() === Number(month) - 1 &&
    userDate.getDate() === Number(day);

  if (!isDayReal) return false;

  return userDate <= today;
};

const isValidData = (yearElement, monthElement, dayElement) => {
  let validarion = [false, false, false];

  if (!yearsValidate(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    validarion[0] = true;
    yearElement.classList.remove("card__input--error");
  }

  if (!monthsValidate(yearElement.value, monthElement.value)) {
    monthElement.classList.add("card__input--error");
  } else {
    validarion[1] = true;
    monthElement.classList.remove("card__input--error");
  }

  if (!daysValidate(yearElement.value, monthElement.value, dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    validarion[2] = true;
    dayElement.classList.remove("card__input--error");
  }

  return validarion.every((item) => item === true);
};

const CheckValidData = () => {
  const dayInput = document.querySelector('.card__input[name="day"]');
  const monthInput = document.querySelector('.card__input[name="month"]');
  const yearInput = document.querySelector('.card__input[name="year"]');

  if (!isValidData(yearInput, monthInput, dayInput)) {
    updateAgeLabel('<span class="card__resultValue">--</span>', "36px");
    secondaryLabel.textContent = "Years Old";
    return false;
  }
  return true;
};

const superficialCalculateFunction = () => {
  if (!CheckValidData()) return;

  let [ageYears, ageMonths, ageDays] = defineVariables();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += 30;
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  let message = rewriteMessage(ageYears);
  updateAgeLabel(message, "36px");
};

const deepCalculateFunction = () => {
  if (!CheckValidData()) return;

  let [ageYears, ageMonths, ageDays] = defineVariables();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += 30;
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  let message = rewriteMessage(ageYears, ageMonths, ageDays);
  resultLabel.textContent = message;

  const fontSize = "18px";

  updateAgeLabel(message, fontSize);
};

Inputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.code === "Enter") superficialCalculateFunction();
    else if (event.code === "NumpadEnter") deepCalculateFunction();
  });
});

superficialCalculateBtn.addEventListener("click", () =>
  superficialCalculateFunction()
);

deepCalculateBtn.addEventListener("click", () => deepCalculateFunction());
