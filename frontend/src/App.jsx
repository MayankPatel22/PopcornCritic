import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { ToastContainer } from "react-toastify";
import AllMovies from "./admin/AllMovies";
import AddMovies from "./admin/AddMovies";
import Movies from "./pages/Movies";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
import Review from "./pages/Review";
import AdminReviews from "./admin/AdminReviews";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Signup />} />
        <Route path="/admin-movie" element={<AllMovies />} />
        <Route path="/user-movies" element={<Movies />} />
        <Route path="/add-movie/" element={<AddMovies />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/admin-reviews/:movieId" element={<AdminReviews />} />
        <Route path="/detail/:movieId/review/:reviewId" element={<Review />} />
        <Route path="/edit-movie/:id" element={<AddMovies />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
