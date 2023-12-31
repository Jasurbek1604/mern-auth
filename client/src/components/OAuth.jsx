import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { singInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider(app);
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(singInSuccess(data));
    } catch (err) {
      console.log("could not login with google", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="uppercase bg-red-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
    >
      continue with google
    </button>
  );
};

export default OAuth;
