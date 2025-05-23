document.getElementById("ageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  const dayError = document.getElementById("dayError");
  const monthError = document.getElementById("monthError");
  const yearError = document.getElementById("yearError");

  // Reset errors
  [dayError, monthError, yearError].forEach((el) => (el.textContent = ""));
  ["day", "month", "year"].forEach((id) => {
    document.getElementById(id).classList.remove("error-border");
    document
      .querySelector(`label[for="${id}"]`)
      .classList.remove("error-border");
  });

  let isValid = true;

  if (!day || day < 1 || day > 31) {
    dayError.textContent = "Invalid day";
    document.getElementById("day").classList.add("error-border");
    document.querySelector('label[for="day"]').classList.add("error-border");
    isValid = false;
  }

  if (!month || month < 1 || month > 12) {
    monthError.textContent = "Invalid month";
    document.getElementById("month").classList.add("error-border");
    document.querySelector('label[for="month"]').classList.add("error-border");
    isValid = false;
  }

  if (!year || year < 1900 || year > new Date().getFullYear()) {
    yearError.textContent = "Invalid year";
    document.getElementById("year").classList.add("error-border");
    document.querySelector('label[for="year"]').classList.add("error-border");
    isValid = false;
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (birthDate > today) {
    yearError.textContent = "Date must be in the past";
    isValid = false;
  }

  if (!isValid) return;

  // Age Calculation
  let ageYear = today.getFullYear() - birthDate.getFullYear();
  let ageMonth = today.getMonth() - birthDate.getMonth();
  let ageDay = today.getDate() - birthDate.getDate();

  if (ageDay < 0) {
    ageMonth--;
    ageDay += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonth < 0) {
    ageYear--;
    ageMonth += 12;
  }

  document.getElementById("years").textContent = ageYear;
  document.getElementById("months").textContent = ageMonth;
  document.getElementById("days").textContent = ageDay;
});
