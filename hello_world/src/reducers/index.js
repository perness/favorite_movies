import { combineReducers } from "redux";
import movieReducer from "./moviesReducer";

const allReducers = combineReducers({
	allMovies: movieReducer,
});

export default allReducers;
