import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  return (
    <div>
      <h1>Spent time</h1>
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
        <div className="flex flex-col gap-2 bg-primary-sub_bg py-4 px-10 mt-5">
          <div className="flex text-end gap-2">
            <label className="min-w-[150px]">Project</label>
            <select {...register("selectedProject", { required: "Project is required" })} defaultValue="">
              <option value=""></option>
              {projects.map((project) => (
                <option key={project.value} value={project.value}>
                  {project.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex text-end gap-2">
            <label className="min-w-[150px]">Issue</label>
            <input type="text" {...register("selectedIssue", { required: "Issue is required" })} />
          </div>
          <div className="flex text-end gap-2">
            <label className="min-w-[150px]">Date</label>
            <Controller
              control={control}
              name="selectedDate"
              defaultValue={new Date()}
              render={({ field }) => <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} />}
            />
          </div>
          <div className="flex text-end gap-2">
            <label className="min-w-[150px]">Hours</label>
            <input type="number" {...register("hours", { required: "Hours are required" })} />
          </div>
          <div className="flex text-end gap-2">
            <label className="min-w-[150px]">Comment</label>
            <input className="w-full" type="text" {...register("comment")} />
          </div>
          <div className="flex text-end gap-2">
            <label className="min-w-[150px]">Activity</label>
            <select {...register("selectedActivity", { required: "Activity is required" })} defaultValue="">
              <option value="">---Please select---</option>
              {activities.map((activity) => (
                <option key={activity.value} value={activity.value}>
                  {activity.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex text-end gap-2">
            <label className="min-w-[150px]">Product Category</label>
            <select {...register("selectedCategory", { required: "Product Category is required" })} defaultValue="">
              <option value="">---Please select---</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-1 mt-3">
          <button className="bg-primary-sub_bg p-1 border-1 border-solid border-primary-border" type="submit" name="submitAndRedirect">
            Create
          </button>
          <button className="bg-primary-sub_bg p-1 border-1 border-solid border-primary-border" type="submit">
            Create and continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogTime;
