export const handleLocalStorage = () => {
  const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  const setLocalStorage = (key: string, value: any) => {
    if (!value) return
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage = (key: string) => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return "";
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  return { removeLocalStorage, setLocalStorage, getLocalStorage };
};
