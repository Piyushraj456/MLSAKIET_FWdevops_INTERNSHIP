import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { db, storage } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { useUser } from "../context/UserContext";
import "react-quill/dist/quill.snow.css";

const NewBlogModal = ({ isOpen, onClose, blogToEdit, onUpdate }) => {
  const { user } = useUser() || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setDescription(blogToEdit.description);
      setAuthorName(blogToEdit.authorName);
      setCategory(blogToEdit.category);
      setImageUrl(blogToEdit.imageUrl);
    } else {
      resetForm();
    }
  }, [blogToEdit]);

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      toast.error("User not authenticated. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (!title || !description || !authorName) {
        toast.error("All fields are required.");
        return;
      }

      const blogId = blogToEdit ? blogToEdit.id : Date.now().toString();
      const blogRef = doc(db, "blogs", blogId);
      let uploadedImageUrl = null;

      if (image) {
        uploadedImageUrl = await uploadImage(image);
        if (!uploadedImageUrl) {
          console.error("Image upload failed, proceeding without image.");
        }
      }
     

      const blogData = {
        title: title.trim(),
        description: description.trim(),
        authorName: authorName.trim(),
        authorId: user.uid,
        category,
        createdAt: serverTimestamp(),
        imageUrl: uploadedImageUrl || (blogToEdit ? blogToEdit.imageUrl : ""),
      };

      await setDoc(blogRef, blogData);
      toast.success(
        blogToEdit ? "Blog updated successfully!" : "Blog created successfully!"
      );

     
      if (onUpdate) {
        onUpdate({
          ...blogData,
          id: blogId,
        });
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating/updating blog:", error);
      toast.error("Failed to save blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAuthorName("");
    setImage(null);
    setImageUrl("");
  };
  const handleCancelImage = () => {
    setImage(null);
    setImageUrl('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-[#0c0c0c60] backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[80vh]">
        <div className="flex items-center justify-between w-full p-4 gap-36">
          <h2 className="text-xl text-white font-bold mb-2 whitespace-nowrap mr-8">
            Write New Blog
          </h2>
          <button
            className="text-red-500   bg-transparent hover:bg-red-600 border-none focus:outline-none hover:bg-black-600 hover:text-white"
            onClick={onClose}
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-0"
          />
          <ReactQuill
            value={description}
            onChange={(value) => setDescription(value)}
            style={{ height: "200px" }}
            required
            className="mb-4 text-white"
          />
          <div className="text-right text-sm text-gray-500 mb-2">
            {description.length}/2000 characters
          </div>
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
          >
            <option value="">Select Category</option>
            <option value="technology">Technology</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
            <option value="startup">Startup</option>
            <option value="education">Education</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 w-full p-2 border text-white border-gray-300 rounded-md focus:outline-none"
          />
          {imageUrl && (
            <div className="flex items-center mb-4">
              <img src={imageUrl} alt="Preview" className="w-1/2 h-auto rounded-md" />
              <button
                type="button"
                onClick={handleCancelImage}
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                <AiOutlineClose />
              </button>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#ccff00] text-black rounded-md hover:bg-green-600 transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? blogToEdit
                  ? "Updating..."
                  : "Creating..."
                : blogToEdit
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBlogModal;
