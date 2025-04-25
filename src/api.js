export const fetchDoctors = async () => {
    const res = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    const data = await res.json();
    return data;
  };
  