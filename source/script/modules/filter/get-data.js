const getCardsData = async () => {
  return await fetch("./public/projects.json").then((res) => res.json());
};

export { getCardsData };
