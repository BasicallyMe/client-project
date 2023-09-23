"use client";

import { useEffect, useState } from "react";
import { getResult } from "../backend/firestore";
import { format, parse, isDate } from "date-fns";

export default function BasePage() {
  const [result, setResult] = useState([]);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    getData();
  }, [date]);

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
    // Parse the time string into a Date object
    const parsedTime = parse(time, "HH:mm", new Date());

    // Check if the parsedTime is a valid Date
    if (isDate(parsedTime)) {
      // Format the Date object in 12-hour time format with AM/PM
      const time12Hour = format(parsedTime, "hh:mm a");
      return time12Hour;
    }

    // Return the original time if parsing fails
    return time;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h2 className="text-2xl mt-4 font-medium uppercase">Golden Navratna Coupons</h2>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
