const MessageScreen = ({ userDetails, messageDisplay }) => {
  const addZero = (i) => {
    if (i < 10) i = "0" + i;
    return i;
  };

  const convertHour = (i) => {
    if (i > 12) i = i - 12;
    return i;
  };

  const getDate = (date) => {
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

    let d = new Date(date);
    let hour = d.getHours();
    let time = hour > 11 ? "pm" : "am";
    let convertedHour = convertHour(d.getHours());
    let minutes = addZero(d.getMinutes());
    let day = d.getDate();
    let month = months[d.getMonth()];
    let completeDate = `${month} ${day}, ${convertedHour}:${minutes} ${time}`;
    return <span>{completeDate}</span>;
  };
  return (
    <div>
      <div className="messageScreen">
        {messageDisplay.map((data) => {
          return (
            <div className="messageContainer" key={data.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                }}
              >
                <h3>
                  {data.sender.id === userDetails.id
                    ? userDetails.email
                    : data.sender.email}
                </h3>
                {getDate(data.created_at)}
              </div>

              <p>{data.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageScreen;
