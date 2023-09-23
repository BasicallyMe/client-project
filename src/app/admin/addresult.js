"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { addResult } from "../../backend/firestore";
import Link from "next/link";

export default function AddResult() {
  const today = new Date();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: format(today, "yyyy-MM-dd"),
    },
  });
  const [disableBtn, setDisableBtn] = useState(false);

  const onSubmit = async (data) => {
    setDisableBtn(true);
    const res = await addResult(data);
    if (res) {
      alert("Result added successfully");
    }
    setDisableBtn(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          className="py-2 px-2 mb-2"
          {...register("date", { required: true })}
          type="date"
        />
        <input
          className="py-2 px-2 mb-2"
          {...register("time", { required: true })}
          type="time"
        />
        <input
          className="py-2 px-2 mb-2"
          {...register("coupon", { required: true })}
          type="text"
          placeholder="Coupon"
        />
        <input
          className="py-2 px-2 mb-2"
          {...register("result", { required: true })}
          type="number"
          placeholder="Result"
        />
        <input
          className="py-2 px-2 mb-2"
          {...register("coupon_name", { required: true })}
          type="text"
          placeholder="Coupon name"
        />
        <input
          className="py-2 px-2 mb-2"
          {...register("coupon_result")}
          type="text"
          placeholder="Coupon result"
        />
        <button
          type="submit"
          className="bg-white text-purple-500 py-2 flex flex-col items-center"
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
            "Submit"
          )}
        </button>
      </form>
      <span>
        <Link href="admin/result">
          View results
        </Link>
      </span>
    </div>
  );
}
