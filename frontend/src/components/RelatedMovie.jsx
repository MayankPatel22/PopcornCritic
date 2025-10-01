import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const RelatedMovie = ({ id, genre }) => {
  const { movies } = useContext(AppContext);

  const [relMovie, setRelMovie] = useState([]);

  useEffect(() => {
    if (movies.length > 0 && genre) {
      const movieData = movies.filter(
        (mov) => mov.genre === genre && mov._id !== id
      );
      setRelMovie(movieData);
    }
  }, [movies, id, genre]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
      <h1 className="text-3xl font-medium">You May Also Like</h1>

      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relMovie.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/detail/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-[#EAEFFF]" src={item.poster} alt={item.title} />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[#262626] text-lg font-medium">
                  {item.title}
                </p>
                <p className="text-yellow-500 text-sm font-semibold">
                  ⭐ {item.avgRating || "N/A"}
                </p>
              </div>

              <p className="text-[#5C5C5C] text-sm">{item.genre}</p>

              <p className="text-[#5C5C5C] text-sm mt-1">
                <span className="font-medium">Leads:</span> {item.leads}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedMovie;
