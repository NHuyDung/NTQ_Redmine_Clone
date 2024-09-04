import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import "./ModalDetail.css";
import DatePicker from "react-datepicker";
import images from "~/assets/img";
import { CreateVersion } from "~/services/VersionService ";
import moment from "moment";

const label = "text-right font-bold block text-gray-700 mr-1 min-w-44";
const buttonStyle = "border border bg-primary-sub_bg text-13 mt-2.5 mr-1 p-1 hover:bg-[#c3c2c2] ";

const statusOptions = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Locked", value: "locked" },
];

const sharingOptions = [
  { label: "Not shared", value: "none" },
  { label: "With subprojects", value: "descendants" },
  { label: "With project hierarchy", value: "hierarchy" },
  { label: "With project tree", value: "tree" },
];

type FormData = {
  name: string;
  description: string;
  status: string;
  wiki_page_title: string;
  due_date: Date;
  sharing: string;
};

const CreateNewVersion: React.FC = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const dataBody = { ...data, due_date: moment(data.due_date).format("YYYY-MM-DD") };
    setIsSuccessful(false);
    try {
      await CreateVersion(dataBody);
      setIsSuccessful(true);
    } catch (error) {
      console.error("Error creating version:");
    }
  };

  useEffect(() => {
    if (isSuccessful) {
      reset();
    }
  }, [isSuccessful, reset]);

  return (
    <div>
      {isSuccessful && (
        <div className="flex mt-3 items-center text-xs text-lime-900 p-2 bg-green-100 border-2 border-lime-500">
          <img className="flex w-fit h-fit" src={images.check} alt="Success" />
          <div className="pl-5">Successful creation.</div>
        </div>
      )}
      <h2 className="text-xl text-[#555] mb-2.5 font-semibold ">Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="text-xs">
        {errors.name && (
          <div className="flex mt-3 items-center text-xs p-4 border-primary-borderError bg-primary-bgError border-2 text-red-500">
            <img className="flex w-fit h-fit" src={images.check} alt="Success" />
            <div className="pl-5">Successful creation.</div>
          </div>
        )}
        <div className="border p-2 bg-primary-bg_gray">
          <div className="flex items-center mb-2">
            <div className="w-full">
              <div className="flex items-center">
                <label className={label}>
                  Name
                  <span className="text-red-700"> *</span>
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name can't be blank",
                    validate: (value) => value.trim() !== "" || "Name cannot be just spaces",
                  })}
                  className="w-2/3 border rounded p-1 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <label className={label}>Description</label>
            <input type="text" {...register("description")} className="w-2/3 border rounded p-1 text-sm" />
          </div>
          <div className="flex items-center mb-2">
            <label className={label}>Status</label>
            <select {...register("status")} className="w-2/3 border rounded p-1 text-sm w-1/5" defaultValue={1}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mb-2">
            <label className={label}>Wiki page</label>
            <input type="text" {...register("wiki_page_title")} className="w-2/3 border rounded p-1 text-sm" />
          </div>
          <div className="flex items-center mb-2">
            <label className={label}>Date</label>
            <div className="relative flex items-center ">
              <Controller
                control={control}
                name="due_date"
                defaultValue={new Date()}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    customInput={
                      <input type="text" name="due_date" className="border border-primary-border w-full h-6 text-xs pl-2" placeholder="Due Date" />
                    }
                  />
                )}
              />
              <img
                src={images.calendar}
                alt="calendar icon"
                className="absolute right-2 bottom-1/2 transform translate-y-1/2 h-4 cursor-pointer"
                onClick={() => document.querySelector<HTMLInputElement>(".react-datepicker__input-container input")?.focus()}
              />
            </div>
          </div>
          <div className="flex items-center mb-2">
            <label className={label}>Sharing</label>
            <div className="flex items-center w-2/3">
              <select {...register("sharing")} className="border rounded p-1 text-sm w-2/4" defaultValue={1}>
                {sharingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className={buttonStyle} onClick={() => setIsSuccessful(false)}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateNewVersion;
