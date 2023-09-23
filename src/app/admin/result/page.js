"use client";

import { useState, useEffect } from "react";
import { getResult, deleteResult } from "../../../backend/firestore";
import { format, parse, isDate } from "date-fns";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const [result, setResult] = useState([]);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    getData();
  }, [date]);

  useEffect(() => {
    if (currentUser === null) {
      router.replace("/");
    }
  }, []);

  async function getData() {
    const { data, status } = await getResult(date);
    if (status === "success") {
      setResult(data);
    }
    console.log(data);
  }

  function handleDateChange(e) {
    const newDate = e.target.value;
    setDate(newDate);
  }

  function convertTo12HourFormatWithPeriod(time) {
    const parsedTime = parse(time, "HH:mm", new Date());
    if (isDate(parsedTime)) {
      const time12Hour = format(parsedTime, "hh:mm a");
      return time12Hour;
    }
    return time;
  }

  async function deleteData(id) {
    const res = await deleteResult(id);
  }

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h2 className="text-2xl mt-4 font-medium uppercase">
        Golden Navratna Coupons
      </h2>
      <div className="w-full max-w-3xl">
        <div className="my-3">
          <span className="text-sm font-medium">Date</span>
          <div className="flex flex-row">
            <input
              type="date"
              id="dateInput"
              name="date"
              className="border border-slate-600"
              value={date}
              onChange={handleDateChange}
            />
            <button className="px-3 border bg-white ml-2 text-sm py-1">
              Show
            </button>
            <button
              className="px-3 border bg-white ml-2 text-sm py-1"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>
        </div>
        <table className="table-auto border-collapse w-full bg-green-200">
          <thead>
            <tr>
              <th className="text-xs font-normal border border-slate-600">
                Draw Time
              </th>
              <th className="text-xs font-normal border border-slate-600">
                Coupon
              </th>
              <th className="text-xs font-normal border border-slate-600">
                Result
              </th>
              <th className="text-xs font-normal border border-slate-600">
                Coupon Name
              </th>
              <th className="text-xs font-normal border border-slate-600">
                Coupon Result
              </th>
              <th className="text-xs font-normal border border-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr key={index}>
                <td className="text-center py-2 px-6 text-sm font-medium border border-slate-600">
                  {convertTo12HourFormatWithPeriod(item.time)}
                </td>
                <td className="text-center py-2 px-6 text-sm font-medium border border-slate-600 uppercase">
                  {item.coupon}
                </td>
                <td className="text-center py-2 px-6 text-sm font-medium border border-slate-600">
                  {item.result}
                </td>
                <td className="text-center py-2 px-6 text-sm font-medium border border-slate-600 uppercase">
                  {item.coupon_name}
                </td>
                <td className="text-center py-2 px-6 text-sm font-medium border border-slate-600">
                  {item.coupon_result}
                </td>
                <td className="text-center text-sm font-medium border border-slate-600">
                  <button
                    className="text-sm w-full py-2"
                    onClick={() => deleteData(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
