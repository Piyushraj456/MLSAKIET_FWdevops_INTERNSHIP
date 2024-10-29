import React from "react";

const BlogCard = ({ blog, handleReadMore }) => {
  return (
    <a
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={() => handleReadMore(blog)}
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg  transform hover:scale-105 transition duration-1000"
        src={blog.imageUrl || "/api/placeholder/400/320"}
        alt={blog.title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
        
    </div>
    </a>
  );
};

export default BlogCard;
