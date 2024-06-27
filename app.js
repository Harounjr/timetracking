const buttons = document.querySelectorAll("#filterButtons");
const currentHoursSpent = document.querySelectorAll("#currentHours");
const previousHoursSpent = document.querySelectorAll("#previousHours");

const fetchData = async () => {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching JSON:", error);
  }
};

const filterDataOnClick = (data, filter) => {
  const filteredData = data.map(({ title, timeframes }) => ({
    title,
    current: timeframes[filter].current,
    previous: timeframes[filter].previous,
  }));

  return filteredData;
};

const updateDOM = (data, filter) => {
  const filteredData = filterDataOnClick(data, filter);

  currentHoursSpent.forEach(
    (hourMark, index) => (hourMark.textContent = filteredData[index].current)
  );
  previousHoursSpent.forEach(
    (hourMark, index) => (hourMark.textContent = filteredData[index].previous)
  );
};

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const data = await fetchData();
    const filter = button.getAttribute("data-filter");

    updateDOM(data, filter);
    buttons.forEach((btn) => btn.classList.remove("active__button"));

    button.classList.add("active__button");
    return filter;
  });
});
