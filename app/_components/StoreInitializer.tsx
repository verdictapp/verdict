"use client";

import { useRef } from "react";
import { useStore } from "../store";

function StoreInitializer({ isLoggedIn }: { isLoggedIn: boolean }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({
      isLoggedIn,
    });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
