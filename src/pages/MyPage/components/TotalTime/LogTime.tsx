import React, { useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import images from "~/assets/img";

type FormValues = {
  selectedProject: string;
  selectedIssue: string;
  selectedDate: Date;
  hours: number;
  comment: string;
  selectedActivity: string;
  selectedCategory: string;
};

const LogTime = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const datePickerRef = useRef<DatePicker>(null);

  const projects = [
    { value: "project1", label: "Project 1" },
    { value: "project2", label: "Project 2" },
  ];

  const activities = [
    { value: "development", label: "Development" },
    { value: "testing", label: "Testing" },
  ];

  const categories = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
  ];

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data: ", data);
  };

  const handleMagnifierClick = () => {
    document.getElementById("issueInput")?.focus();
  };

  return (
    <div>
      <h1 className="text-[#555] text-xl font-semibold">Spent time</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(errors).length > 0 && (
          <div className="text-red-500 bg-red-100 py-4 px-10 border-2 border-solid border-red-500">
            <ul className="list-disc">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-2 bg-[#fcfcfc]  text-xs border-1 border-solid border-[#d7d7d7] py-4 px-10 mt-3">
          <div className="flex text-end gap-2 ">
            <label className="min-w-[130px] font-bold text-[#505050] ">Project</label>
            <select
              className="border-1 border-solid border-[#d7d7d7] p-1"
              {...register("selectedProject", { required: "Project is required" })}
              defaultValue=""
            >
              <option value=""></option>
              {projects.map((project) => (
                <option key={project.value} value={project.value}>
                  {project.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex text-end gap-2 ">
            <label className="min-w-[130px] text-[#505050] font-bold">Issue</label>
            <div className="relative z-10">
              <input
                id="issueInput"
                className="z-10 pl-5 py-1 border-1 border-solid border-[#d7d7d7] p-1"
                type="text"
                {...register("selectedIssue", { required: "Issue is required" })}
              />
              <img
                onClick={handleMagnifierClick}
                className="absolute z-0 left-[2px] top-1/2 transform -translate-y-1/2 cursor-pointer"
                src={images.magnifier}
                alt="manifier"
              />
            </div>
          </div>
          <div className="flex items-center text-end gap-2 ">
            <div className="min-w-[130px]  flex justify-end items-end gap-1 font-bold">
              <label className="text-[#505050] ">Date</label>
              <span className="flex items-center text-[#bb0000]">*</span>
            </div>
            <Controller
              control={control}
              name="selectedDate"
              defaultValue={new Date()}
              render={({ field }) => (
                <div className="flex gap-1 items-center">
                  <DatePicker
                    className="border-1 border-solid border-[#d7d7d7] p-1"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    ref={datePickerRef}
                  />
                  <img src={images.calendar} alt="calendar" onClick={() => datePickerRef.current?.setFocus()} className="cursor-pointer" />
                </div>
              )}
            />
          </div>
          <div className="flex text-end gap-2">
            <div className="min-w-[130px]  flex justify-end items-center gap-1 font-bold">
              <label className="text-[#505050] ">Hours</label>
              <span className="flex items-center text-[#bb0000]">*</span>
            </div>
            <input className="border-1 border-solid border-[#d7d7d7] p-1" type="number" {...register("hours", { required: "Hours are required" })} />
          </div>
          <div className="flex text-end gap-2 ">
            <label className="min-w-[130px] text-[#505050] font-bold">Comment</label>
            <input className="w-full border-1 border-solid border-[#d7d7d7] p-1" type="text" {...register("comment")} />
          </div>
          <div className="flex text-end gap-2">
            <div className="min-w-[130px]  flex justify-end items-center gap-1 font-bold">
              <label className="text-[#505050] ">Activity</label>
              <span className="flex items-center text-[#bb0000]">*</span>
            </div>
            <select
              className="border-1 border-solid border-[#d7d7d7] p-1"
              {...register("selectedActivity", { required: "Activity is required" })}
              defaultValue=""
            >
              <option value="">---Please select---</option>
              {activities.map((activity) => (
                <option key={activity.value} value={activity.value}>
                  {activity.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex text-end gap-2">
            <div className="min-w-[130px]  flex justify-end items-center gap-1 font-bold">
              <label className="text-[#505050] ">Product Category</label>
              <span className="flex items-center text-[#bb0000]">*</span>
            </div>
            <select
              className="border-1 border-solid border-[#d7d7d7] p-1"
              {...register("selectedCategory", { required: "Product Category is required" })}
              defaultValue=""
            >
              <option value="">---Please select---</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-1 mt-3 text-xs">
          <button className="bg-primary-sub_bg p-1 border-1 border-solid border-[#cccccc]" type="submit" name="submitAndRedirect">
            Create
          </button>
          <button className="bg-primary-sub_bg p-1 border-1 border-solid border-[#cccccc]" type="submit">
            Create and continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogTime;
