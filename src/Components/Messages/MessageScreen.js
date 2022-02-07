const MessageScreen = ({ messageDisplay }) => {
  let currentUser;

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
    return <span id="date">{completeDate}</span>;
  };

  return (
    <div className="messageScreen">
      {messageDisplay.map((user) => {
        if (currentUser === user.sender.email) {
          return (
            <div key={user.id} className="messageContainer">
              <span style={{ width: "55px" }}></span>
              <p key={user.id}>{user.body}</p>
            </div>
          );
        } else {
          currentUser = user.sender.email;
          return (
            <div className="messageContainer" key={user.id}>
              <span className="icon">
                {user.sender.email.charAt(0).toUpperCase()}
              </span>
              <div>
                <div>
                  <h3>{user.sender.email.split("@")[0]}</h3>
                  {getDate(user.created_at)}
                </div>
                <p key={user.id}>{user.body}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MessageScreen;
