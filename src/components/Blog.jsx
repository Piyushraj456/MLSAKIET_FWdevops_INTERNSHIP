import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import BlogModal from "./BlogModal";
import ShimmerCard from "./ShimmerCard"; 

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const blogsQuery = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(blogsQuery, (querySnapshot) => {
      const blogData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  const calculateReadingTime = (content) => {
    const wordCount = content.split(" ").length;
    if (wordCount < 300) return "2 min read";
    if (wordCount >= 300 && wordCount < 500) return "3 min read";
    if (wordCount >= 500 && wordCount < 800) return "4 min read";
    if (wordCount >= 800 && wordCount < 1400) return "5 min read";
    if (wordCount >= 1400) return "7 min read";
    return "N/A";
  };

  const formatDate = (date) => {
    if (date && typeof date === "object" && date.toDate) {
      date = date.toDate();
    } else if (typeof date === "string") {
      const parsedDate = new Date(date.replace(" at ", "T"));
      return parsedDate.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }
    return new Date(date).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="mb-20 md:max-w-2xl text-center mx-auto">
          <h2 className="font-heading text-7xl lg:text-6xl text-white tracking-7xl lg:tracking-8xl">Latest Articles</h2>
        </div>
        <div className="flex flex-wrap -m-10 mb-10">
          {/* Left Side Blog Post */}
          <div className="w-full md:w-1/2 p-10">
            {loading ? (
              <ShimmerCard />
            ) : (
              blogs.length > 0 && (
                <div>
                  <div className="mb-8 overflow-hidden rounded-5xl">
                    <img
                      className="w-full h-96 object-cover transform rounded-3xl hover:scale-105 transition duration-1000"
                      src={blogs[0].imageUrl || "https://via.placeholder.com/400x800"}
                      alt={blogs[0].title}
                    />
                  </div>
                  <div className="flex flex-wrap items-center -m-2 mb-4">
                    <span className="text-sm text-white font-medium tracking-tighter">{blogs[0].category}</span>
                    <span className="text-sm text-white font-medium tracking-tighter mx-2">•</span>
                    <span className="text-sm text-white font-medium tracking-tighter">
                      {calculateReadingTime(blogs[0].description)}
                    </span>
                    <span className="text-sm text-white font-medium tracking-tighter mx-2">•</span>
                    <span className="text-sm text-gray-500 font-medium tracking-tighter">
                      {formatDate(blogs[0].createdAt)}
                    </span>
                    <span className="text-sm text-gray-500 font-medium tracking-tighter mx-2">•</span>
                    <span className="text-sm text-gray-500 font-medium tracking-tighter">
                      {blogs[0].authorName || "Unknown Author"}
                    </span>
                  </div>
                  <h3 className="font-heading text-3xl text-white tracking-3xl hover:underline">{blogs[0].title}</h3>
                  <p className="mb-6 text-white text-opacity-60">
                    {blogs[0].description.replace(/<[^>]*>/g, "").split(" ").slice(0, 15).join(" ") + "..."}
                  </p>
                  <button onClick={() => handleReadMore(blogs[0])} className=" bg-white text-black hover:underline hover:text-white">Read More</button>
                </div>
              )
            )}
          </div>

          {/* Right Side Blog Posts */}
          <div className="w-full md:w-1/2 p-10">
            <div className="flex flex-wrap -m-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => <ShimmerCard key={index} />)
              ) : (
                blogs.slice(1).map((blog, index) => (
                  <div key={blog.id} className={`w-full p-4 ${!showContent && index > 3 ? "hidden" : ""}`}>
                    <div className="flex flex-wrap items-center -m-4">
                      <div className="w-auto p-4">
                        <div className="overflow-hidden rounded-2xl">
                          <img
                            className="w-40 h-28 object-cover transform hover:scale-105 transition duration-1000"
                            src={blog.imageUrl || "https://via.placeholder.com/300x200"}
                            alt={blog.title}
                          />
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <span className="inline-block mb-2 text-sm text-white text-opacity-60">{formatDate(blog.createdAt)}</span>
                        <span className="text-sm text-gray-500 font-medium tracking-tighter mx-2">•</span>
                    <span className="text-sm text-gray-500 font-medium tracking-tighter">
                      {blog.authorName || "Unknown Author"}
                    </span>
                        <h3 className="font-heading text-2xl text-white tracking-2xl hover:underline">{blog.title}</h3>
                        <p className="mb-6 text-white text-opacity-60">
                          {blog.description.replace(/<[^>]*>/g, "").split(" ").slice(0, 15).join(" ") + "..."}
                        </p>
                        <span className="text-sm text-white font-medium tracking-tighter mx-2">•</span>
                        <span className="text-sm text-white font-medium tracking-tighter">
                          {calculateReadingTime(blog.description)}
                        </span>
                        <button onClick={() => handleReadMore(blog)} className="text-white hover:underline">Read More</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowContent(!showContent)}
          className={`block px-8 py-4 mx-auto font-medium tracking-tighter bg-white hover:bg-[#ccff00] text-black border-2 border-green-400 rounded-full transition duration-300 ${showContent ? "hidden" : ""}`}
        >
          See more articles
        </button>
      </div>
      {selectedBlog && <BlogModal blog={selectedBlog} onClose={handleCloseModal} />}
    </section>
  );
};

export default Blog;
