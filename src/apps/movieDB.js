import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const apiKey = "4f6a9882214824f1f2e1748d6e7f8794"; // Replace with your TMDb API key

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]); // State for movie genres

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
      );
      setMovies(response.data.results);
    };

    const fetchGenres = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      setGenres(response.data.genres);
    };

    fetchMovies();
    fetchGenres();
  }, [apiKey]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
    );
    setMovies(response.data.results);
  };

  const myRef = useRef(null);
  
  const handleMovieSelect = (movie) => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setSelectedMovie(movie);
  };

  const getGenreNames = (genreIds) => {
    return genres
      .filter((genre) => genreIds.includes(genre.id))
      .map((genre) => genre.name)
      .join(", ");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Movie Database</h1>
      <form ref={myRef} onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          placeholder="Search Movies"
          className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {selectedMovie && (
        <div className="movie-details bg-gray-100 p-4 rounded-lg mb-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
            alt={selectedMovie.title}
            className="w-full rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
          <p className="text-gray-600">{selectedMovie.overview}</p>
          <p className="text-gray-600 mt-4">
            Release Date: {selectedMovie.release_date}
          </p>
          <p className="text-gray-600 mt-4">
            Genres: {getGenreNames(selectedMovie.genre_ids)}
          </p>
          <div className="flex mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 mr-2">
              Watch Trailer
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400">
              Add to Watchlist
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card bg-gray-100 p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => handleMovieSelect(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-medium mb-1">{movie.title}</h3>
            <p className="text-gray-600">{getGenreNames(movie.genre_ids)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
