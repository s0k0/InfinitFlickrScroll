const saveFavourites = (favourites: string[]): void => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
};

const getFavourites = (): string[] => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};

export { saveFavourites, getFavourites };
