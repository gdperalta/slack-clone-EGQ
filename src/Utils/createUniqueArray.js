export const createUniqueArray = (array) => {
  const uniqueArray = array.filter((item, index) => {
    const i = array.findIndex((user) => {
      return user.id === item.id;
    });
    return i === index;
  });

  return uniqueArray;
};
