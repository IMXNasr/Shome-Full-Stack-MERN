export const appName = "Shome";

export const URL = "http://127.0.0.1:8000";
export const staticURL = URL + "/uploads";

export const genres = [
	{ value: "Animation", label: "Animation" },
	{ value: "Action", label: "Action" },
	{ value: "Crime", label: "Crime" },
	{ value: "Mystery", label: "Mystery" },
	{ value: "Thriller", label: "Thriller" },
	{ value: "Adventure", label: "Adventure" },
	{ value: "Sci-Fi", label: "Sci-Fi" },
	{ value: "Fiction", label: "Fiction" },
	{ value: "Horror", label: "Horror" },
	{ value: "Comedy", label: "Comedy" },
	{ value: "Romance", label: "Romance" },
	{ value: "Fantasy", label: "Fantasy" },
	{ value: "Romance", label: "Romance" },
	{ value: "Drama", label: "Drama" },
];

export const showTypes = [
	{
		value: "movie",
		name: "Movie",
	},
	{
		value: "tv",
		name: "TV Series",
	},
	{
		value: "cartoon",
		name: "Cartoon",
	},
];

export const getDate = (date) => {
	const newDate = new Date(date).getFullYear() + "-" + new Date(date).getMonth() + "-" + new Date(date).getDate();
	return newDate;
};

export const getAge = (birthday) => {
	const age = Math.floor((new Date() - new Date(birthday)) / (1000 * 60 * 60 * 24 * 365.25));
	return age;
};
