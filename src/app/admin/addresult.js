
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { addResult } from "../../backend/firestore";

export default function AddResult() {
  const today = new Date();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: {
    date: format(today, 'yyyy-MM-dd'),
  }});

  const onSubmit = async (data) => {
    await addResult(data);
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
        <button type="submit" className="bg-white text-purple-500 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
