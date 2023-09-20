"use client";

import { useState, useEffect } from "react";
import { signInUser } from "../../backend/auth";
import AddResult from "./addresult";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  async function handleSubmit(event) {
    setDisableBtn(true);
    event.preventDefault();
    const res = await signInUser({
      email: event.target.email.value,
      password: event.target.password.value,
    });
    if (res.status === "success") {
      setUser(res.user);
      setDisableBtn(false);
    }
  }
  return (
    <div className="h-screen bg-purple-400 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold my-4 text-white">
        Golden Navratna Coupons
      </h1>
      {user !== null ? (
        <AddResult />
      ) : (
        <div className="w-full max-w-sm px-3">
          <form
            className="flex flex-col w-full"
            onSubmit={handleSubmit}
            method="POST"
          >
            <input
              className="text-sm border py-2 px-2 mb-3"
              placeholder="Email"
              type="email"
              name="email"
            />
            <input
              className="text-sm border py-2 px-2 "
              placeholder="Password"
              type="password"
              name="password"
            />
            <button
              type="submit"
              className="bg-white text-purple-400 my-3 py-2 flex flex-col items-center justify-center"
            >
              {disableBtn ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-red"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
