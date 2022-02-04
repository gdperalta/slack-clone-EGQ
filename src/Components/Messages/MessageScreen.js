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
        {messageDisplay.map((sender) => {
          return (
            <div
              className="messageContainer"
              key={`${sender[0].sender.email}-${sender[0].sender.id}`}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                }}
              >
                <h3>{sender[0].sender.email}</h3>
                {getDate(sender[0].created_at)}
              </div>
              {sender.map((data) => {
                return (
                  <div key={data.id}>
                    <p>{data.body}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageScreen;
