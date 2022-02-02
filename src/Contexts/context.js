import { useState, createContext, useMemo } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [headerList, setHeaderList] = useState(null);

  const value = useMemo(() => ({ headerList, setHeaderList }), [headerList]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
export { UserContext, UserProvider };
