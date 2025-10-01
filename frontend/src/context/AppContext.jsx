import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [allReview, setAllReview] = useState([]);
  const [edit, setEdit] = useState(false);
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const getTopMovies = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}api/admin/movies`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("aToken")}`,
        },
      });
      if (data.success) {
        setMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const getFilteredMovie = async (filters = {}) => {
    try {
      const params = new URLSearchParams();

      if (filters.genre) params.append("genre", filters.genre);
      if (filters.year) params.append("year", filters.year);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.search || search)
        params.append("search", filters.search || search);
      const queryString = params.toString();
      const url = `${backendUrl}api/user/filter-movie${
        queryString ? `?${queryString}` : ""
      }`;
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data.success) {
        setMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const getAllReview = async (movieId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/user/all-reviews/${movieId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setAllReview(data.cleanedReviews);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const getAllReviewAdmin = async (movieId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}api/admin/all-reviews/${movieId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("aToken")}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setAllReview(data.cleanedReviews);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (aToken) localStorage.setItem("aToken", aToken);
    else localStorage.removeItem("aToken");
  }, [aToken]);
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  console.log(movies);

  const value = {
    getTopMovies,
    getAllReview,
    getFilteredMovie,
    allReview,
    getAllReviewAdmin,
    edit,
    setEdit,
    movies,
    search,
    setSearch,
    backendUrl,
    setAToken,
    setToken,
    aToken,
    token,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
