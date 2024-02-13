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

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleButtonClick = async () => {
    const validationCheck = checkValidateData(email, password);
    if (validationCheck !== null) {
      setErrorMessage(validationCheck);
      return;
    }

    try {
      if (isSignInForm) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name,
        });
        dispatch(
          addUser({ uid: user.uid, email: user.email, displayName: name })
        );
      }
    } catch (error) {
      setErrorMessage(error.message);
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
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonClick();
        }}
        className="absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-70"
      >
        <h1 className="font-semibold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            className="p-4 mr-4 my-4 w-full bg-gray-700 rounded-sm opacity-75"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 mr-4 my-4 w-full bg-gray-700 rounded-sm opacity-75"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 mr-4 my-4 w-full bg-gray-700 rounded-sm opacity-75"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="font-semibold text-red-600">{errorMessage}</span>
        <button
          type="submit"
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
