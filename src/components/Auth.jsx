
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp,getDoc  } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from 'react-icons/fa';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState(null); 
  const [image, setImage] = useState(null); 
  const [isSignUp, setIsSignUp] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result);
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const cancelImage = () => {
    setImageUrl(null); 
    setImage(null); 
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

 

  

  const saveUserToDb = async (user, username, profileImageUrl) => {
    console.log("Saving user to Firestore:", user, username);
    try {
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            username: username,
            email: user.email,
            profileImage: profileImageUrl, 
            createdAt: serverTimestamp()
        });
        console.log("User saved to Firestore successfully.");
        toast.success(`Hello ${username}`);
    } catch (error) {
        console.error("Error saving user to Firestore:", error);
    }
};

const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        let profileImageUrl = null;
        if (image) {
            profileImageUrl = await uploadImage(image);
        }
       
        await saveUserToDb(user, username, profileImageUrl);  
        console.log("User signed up and saved to Firestore:", user.uid);
        toast.success("Sign-up successful!");
        setIsSignUp(false);
        setUsername('');
        setEmail('');
        setPassword('');
        cancelImage(); 
    } catch (error) {
        console.error("Error during sign-up:", error);
        if (error.code === 'auth/email-already-in-use') {
            toast.error("This email is already in use. Please log in or use a different email.");
        } else {
            toast.error(`Sign-up failed: ${error.message}`);
        }
    }
};


  
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success("Sign-in successful!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      toast.error(`Sign-in failed: ${error.message}`);
    }
  };



const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  

  try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);

     
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        
          const newUsername = prompt("Please enter your username:");

       
          await setDoc(userDocRef, {
              username: newUsername,
              email: user.email,
              profileImage: user.photoURL, 
              createdAt: new Date(),
          });
      }

     
      setUser(user);

     
      toast.success("Signed in with Google successfully!");
      navigate('/dashboard');
  } catch (error) {
      console.error("Error during Google sign-in:", error.message);
      toast.error(`Google sign-in failed: ${error.message}`);
  }
};


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out:", error.message);
      toast.error(`Sign-out failed: ${error.message}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="container px-4 mx-auto">
        <div className="relative max-w-lg mx-auto px-7 pt-10 pb-8 bg-gray-600 shadow-xl rounded-2xl bg-opacity-30">
          <div className="text-center">
            <h1 className="text-[#fdfff7] text-4xl font-bold">Dexter</h1>
            <h3 className="mb-10 text-3xl font-medium text-white">Let's Get Started</h3>
            <form onSubmit={isSignUp ? handleSignUp : handleSignIn} name="signup12">
              {isSignUp && (
              <>
                <div className="mb-2 border border-gray-900 rounded-3xl">
                  <input
                    className="pl-6 py-4 w-full bg-transparent text-gray-300 placeholder-gray-300 outline-none"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange} 
                      required
                    />
                    {imageUrl && (
                      <div className="relative">
                        <img src={imageUrl} alt="Profile Preview" className="w-24 h-24 rounded-full mt-2" />
                        <button type="button" onClick={cancelImage} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                          ✖
                        </button>
                      </div>
                    )}
                  </div>
              </>
              )}
              <div className="mb-2 border border-gray-900 rounded-3xl">
                <input
                  className="pl-6 py-4 w-full bg-transparent text-gray-300 placeholder-gray-300"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6 border border-gray-900 rounded-3xl">
                <input
                  className="pl-6 py-4 w-full bg-transparent text-gray-300 placeholder-gray-300 outline-none"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="block mb-4 px-14 py-4 font-medium tracking-wide text-lg border-2 border-green-400 bg-[#ccff00] hover:bg-opacity-90 text-black rounded-full transition duration-300"
              >
                {isSignUp ? 'Sign up' : 'Login'}
              </button>
            </form>

            

            <div className="flex justify-center mt-4">
              <button
                className="p-5 bg-gray-600 hover:bg-gray-900 rounded-full transition duration-300 flex items-center"
                onClick={handleGoogleSignIn}
              >
                <FaGoogle className="text-white mr-2" size={24} />
                <span className="text-white font-semibold">Sign up with Google</span>
              </button>
            </div>

           
            <div className="mt-6 text-gray-300 text-center">
              <span>{isSignUp ? "Already have an account?" : "Don't have an account?"}</span>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="block mb-4 px-14 py-4 font-medium tracking-wide text-lg border-2 border-green-400 bg-[#91ff51] hover:bg-opacity-90 text-black rounded-full transition duration-300"
              >
                {isSignUp ? 'Login' : 'Sign up'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Auth;
