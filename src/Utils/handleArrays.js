export const createUniqueArray = (array) => {
  const uniqueArray = array.filter((item, index) => {
    const i = array.findIndex((user) => {
      return user.id === item.id;
    });
    return i === index;
  });

  return uniqueArray;
};

export const filterArray = (array) => {
  const filteredArray = [];
  let sender,
    i,
    j = filteredArray.length;

  array.forEach((item) => {
    if (sender === item.sender.email) {
      filteredArray[i].push(item);
    } else {
      filteredArray[j] = [];
      filteredArray[j].push(item);
      sender = item.sender.email;
      i = j;
      j = filteredArray.length;
    }
  });

  return filteredArray;
};
