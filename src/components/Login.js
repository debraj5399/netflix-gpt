import React, { useState } from "react";
import Header from "./Header";
import checkValidateData from "../utils/checkValidateData";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NETFLIX_BACKGROUND } from "../utils/constants";
const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const name = useRef(null);
  // const email = useRef(null);
  // const password = useRef(null);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const validationCheck = checkValidateData(email, password);
    setErrorMessage(validationCheck);
    if (validationCheck !== null) return;
    if (isSignInForm) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const { uid, email, displayName } = user;
          dispatch(
            addUser({ uid: uid, email: email, displayName: displayName })
          );
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user.currentUser, {
            displayName: name,
          })
            .then(() => {
              const { uid, email, displayName } = auth;
              console.log(auth);
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              const errorMessage = error.message;
              setErrorMessage(errorMessage);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="h-full">
        <img
          className="absolute h-full w-full"
          alt="login-background"
          src={NETFLIX_BACKGROUND}
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-70"
      >
        <h1 className="font-semibold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            // ref={name}
            onChange={(e) => setName(e.currentTarget.value)}
            type="text"
            placeholder="Name"
            className="p-4 mr-4 my-4 w-full bg-gray-700 rounded-sm opacity-75"
          />
        )}
        <input
          // ref={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="text"
          placeholder="Email Address"
          className="p-4 mr-4 my-4 w-full bg-gray-700 rounded-sm opacity-75"
        />
        <input
          // ref={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Password"
          className="p-4 mr-4 my-4 w-full bg-gray-700 rounded-sm opacity-75"
        />
        <span className="font-semibold text-red-600">{errorMessage}</span>
        <button
          onClick={handleButtonClick}
          className="p-4 mr-4 my-4 bg-red-700 w-full rounded-sm"
        >
          {isSignInForm ? "Login" : "Register"}
        </button>

        <p className="my-3">
          <span className="font-thin">
            {isSignInForm ? "New to Netflix? " : "Already a user? "}
          </span>
          <span
            onClick={toggleSignInForm}
            className="hover:underline cursor-pointer"
          >
            {isSignInForm ? "Sign up now." : "Login here."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
