const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const addZero = (i) => {
  if (i < 10) i = "0" + i;
  return i;
};

const convertHour = (i) => {
  if (i > 12) i = i - 12;
  return i;
};

export const getDate = (date) => {
  let d = new Date(date);
  let day = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let completeDate = `${month} ${day}, ${year}`;
  return <h4>{completeDate}</h4>;
};

export const getTime = (date) => {
  let d = new Date(date);
  let hour = d.getHours();
  let time = hour > 11 ? "pm" : "am";
  let convertedHour = convertHour(d.getHours());
  let minutes = addZero(d.getMinutes());
  let completeDate = `${convertedHour}:${minutes} ${time}`;
  return <span className="date">{completeDate}</span>;
};

export const getTimeOnly = (date) => {
  let d = new Date(date);
  let convertedHour = convertHour(d.getHours());
  let minutes = addZero(d.getMinutes());
  let completeDate = `${convertedHour}:${minutes}`;
  return <span className="hiddenTime">{completeDate}</span>;
};

export const getFullDate = (date) => {
  let d = new Date(date);
  let day = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let completeDate = `${month} ${day}, ${year}`;
  return (
    <div className="fullDate">
      <hr></hr>
      <span>{completeDate}</span>
    </div>
  );
};
