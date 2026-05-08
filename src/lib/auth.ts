"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";

export type AuthState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, isAdmin: false, loading: false });
        return;
      }
      const token = await user.getIdTokenResult(true);
      setState({
        user,
        isAdmin: token.claims.admin === true,
        loading: false,
      });
    });
  }, []);

  return state;
}
