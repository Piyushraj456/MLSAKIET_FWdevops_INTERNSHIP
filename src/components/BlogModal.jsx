import React, { useState } from "react";
import NewBlogModal from "./NewBlogModal";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useUser } from "../context/UserContext"; 

const BlogModal = ({ blog, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blog);
  const { user } = useUser(); 

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const handleBlogUpdate = (updatedData) => {
    setUpdatedBlog(updatedData);
    closeEditModal();
  };

  const handleDelete = async () => {
    try {
      const blogRef = doc(db, "blogs", blog.id);
      await deleteDoc(blogRef);
      onClose();
    } catch (error) {
      console.error("Error deleting blog: ", error);
      alert("Failed to delete the blog. Please try again.");
    }
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


  const canEditOrDelete = (user && (user.uid === blog.authorId || ["SCLwZ6hiHeMRAiVCCssGZR5f25H2", "X9YZX1sKfOOdRKKUTWDvRV5nkOp2"].includes(user.uid)));

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-[#00000031] backdrop-blur-md rounded-xl p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center justify-between text-2xl font-bold text-[#ccff00]">
              {updatedBlog.title}
            </h2>
            <div>
              <button
                onClick={onClose}
                className="bg-transparent text-red-600 hover:text-gray-900 hover:bg-red-500 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <img
            className="w-full h-64 object-cover rounded-lg mb-4 transform hover:scale-105 transition duration-1000"
            src={updatedBlog.imageUrl || "/api/placeholder/400/320"}
            alt={updatedBlog.title}
          />
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500 font-medium tracking-tighter ml-4">
              by {updatedBlog.authorName || "Unknown Author"}
            </span>
            <span className="text-sm text-gray-500 font-medium tracking-tighter">
              {formatDate(blog.createdAt)}
            </span>
          </div>
          <div
            className="text-white"
            dangerouslySetInnerHTML={{ __html: updatedBlog.description }}
          />
          <div className="flex justify-end mt-4">
            {canEditOrDelete && (
              <>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-[#ccff00] text-black rounded-md hover:bg-green-600 transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isEditing && (
        <NewBlogModal
          isOpen={isEditing}
          onClose={closeEditModal}
          blogToEdit={updatedBlog}
          onUpdate={handleBlogUpdate}
        />
      )}
    </>
  );
};

export default BlogModal;
