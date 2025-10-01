import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddMovies = () => {
  const { backendUrl, movies, edit } = useContext(AppContext);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [leads, setLeads] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    if (edit && id) {
      const movieToEdit = movies.find((res) => res._id === id);
      if (movieToEdit) {
        setTitle(movieToEdit.title);
        setGenre(movieToEdit.genre);
        setYear(movieToEdit.year);
        setLeads(movieToEdit.leads);
        setDescription(movieToEdit.description);
        setPoster(movieToEdit.poster);
      }
    }
  }, [edit, id, movies]);

  const resetForm = () => {
    setPoster(null);
    setTitle("");
    setGenre("");
    setYear("");
    setDescription("");
    setLeads("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!title || !genre || !year || !description || !leads)
        return toast.error("Please fill all fields");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("genre", genre);
      formData.append("year", year);
      formData.append("description", description);
      formData.append("leads", leads);

      if (poster && poster instanceof File) {
        formData.append("poster", poster);
      }

      let response;
      if (edit) {
        response = await axios.put(
          `${backendUrl}api/admin/edit-movie/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `${backendUrl}api/admin/add-movie`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center p-5 w-full"
    >
      <div className="w-full max-w-2xl mx-auto">
        <p className="mb-8 text-2xl text-center text-primary font-bold">
          {edit ? "Edit" : "Add"} Movie
        </p>

        <div className="bg-white px-8 py-8 border rounded-lg shadow-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col items-center gap-4 mb-8 text-gray-500">
            <label
              htmlFor="poster-img"
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <img
                className="w-20 h-20 bg-gray-100 rounded-full object-cover border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
                src={
                  poster
                    ? poster instanceof File
                      ? URL.createObjectURL(poster)
                      : poster
                    : assets.upload
                }
                alt="Upload Movie Poster"
              />
              <p className="text-center text-sm font-medium">
                Upload Movie Poster
              </p>
            </label>
            <input
              onChange={(e) => setPoster(e.target.files[0])}
              type="file"
              id="poster-img"
              hidden
              accept="image/*"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-6 text-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Movie Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Genre
                </label>
                <input
                  type="text"
                  placeholder="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Release Year
                </label>
                <input
                  type="number"
                  placeholder="Release Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Main Lead
                </label>
                <input
                  type="text"
                  placeholder="Actor/Actress"
                  value={leads}
                  onChange={(e) => setLeads(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Enter movie description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none h-32"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-primary text-white px-12 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-30"
            >
              {edit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddMovies;
