import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import BlogCard from "./BlogCard";
import BlogModal from "./BlogModal";
import ShimmerCard from "./ShimmerCard";
import Navbar from "./Navbar";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 6;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const blogData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogData);
      setLoading(false);
    });

 
    return () => unsubscribe();
  }, []);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredBlogs =
    selectedCategory === "All Categories"
      ? blogs
      : blogs.filter(
          (blog) => blog.category === selectedCategory.toLowerCase()
        );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (

    <>
    <Navbar/>
    <section className="py-20 bg-secondary-dark overflow-hidden bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-6xl text-center">
          <span className="inline-block mb-4 py-1 px-3 bg-white text-green-500 uppercase rounded-3xl shadow text-sm">
            Blog
          </span>

          <h2 className="font-bold mb-4 text-3xl md:text-4xl text-white">
          Discover fresh insights and the latest developments  <br/>by expert perspectives.
          </h2>
          <p className="mb-0 text-lg font-medium text-gray-300">
            Stay tuned for real-time updates on Dexter and the latest tech
            developments. We’ll bring you the insights you need to navigate the
            fast-evolving landscape of technology.
          </p>
        </div>

        <div className="mb-8">
          <ul className="flex gap-4 overflow-x-auto pb-2">
            {[
              "All Categories",
              "Technology",
              "Development",
              "Marketing",
              "Startup",
              "Education",
            ].map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryChange(category)}
                  className={`py-2 px-4 text-sm font-normal rounded-t-lg whitespace-nowrap text-black bg-[#ccff00] transition-colors duration-300
                    ${
                      selectedCategory === category
                        ? "bg-success/25 text-success border-b-2 border-success"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-200 border-b-2 border-transparent dark:text-red dark:hover:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            Array.from({ length: blogsPerPage }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          ) : currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                handleReadMore={handleReadMore}
              />
            ))
          ) : (
            <div className="text-center text-gray-300 py-8">
              <p>No blogs available for the "{selectedCategory}" category.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded bg-light-dark hover:bg-success/20 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 text-secondary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded font-medium
                    ${
                      currentPage === index + 1
                        ? "bg-success text-white"
                        : "bg-light-dark text-secondary-light hover:bg-success/20"
                    } transition-colors duration-300`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded bg-light-dark hover:bg-success/20 transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 text-secondary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={handleCloseModal}  />
      )}
    </section>
    </>
  );
};

export default AllBlogs;
