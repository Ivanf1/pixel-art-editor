import { useState, useEffect } from "react";

const useStateWithLocalStorage = (localStorageKey, defaultValue) => {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(localStorageKey)) || defaultValue
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return [value, setValue];
};

export default useStateWithLocalStorage;
