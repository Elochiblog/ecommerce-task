import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config.js";
import {
  authStart,
  authSuccess,
  authFailure,
  authLogout,
} from "../features/auth/authSlice.js";

function serializeUser(firebaseUser) {
  if (!firebaseUser) return null;
  const { uid, email, displayName } = firebaseUser;
  return { uid, email, displayName };
}

export function useAuth() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(authSuccess(serializeUser(firebaseUser)));
    });
    return unsubscribe;
  }, [dispatch]);

  const signUp = async ({ name, email, password }) => {
    dispatch(authStart());
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (name) await updateProfile(credential.user, { displayName: name });
      dispatch(
        authSuccess(serializeUser({ ...credential.user, displayName: name }))
      );
      return { ok: true };
    } catch (err) {
      dispatch(authFailure(mapFirebaseError(err)));
      return { ok: false, error: mapFirebaseError(err) };
    }
  };

  const logIn = async ({ email, password }) => {
    dispatch(authStart());
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(authSuccess(serializeUser(credential.user)));
      return { ok: true };
    } catch (err) {
      dispatch(authFailure(mapFirebaseError(err)));
      return { ok: false, error: mapFirebaseError(err) };
    }
  };

  const logOut = async () => {
    await signOut(auth);
    dispatch(authLogout());
  };

  return { user, loading, error, signUp, logIn, logOut };
}

function mapFirebaseError(err) {
  const code = err?.code || "";
  if (code.includes("email-already-in-use"))
    return "That email is already registered.";
  if (
    code.includes("invalid-credential") ||
    code.includes("wrong-password") ||
    code.includes("user-not-found")
  )
    return "Incorrect email or password.";
  if (code.includes("weak-password"))
    return "Password should be at least 6 characters.";
  if (code.includes("invalid-email"))
    return "Please enter a valid email address.";
  return err?.message || "Something went wrong. Please try again.";
}
