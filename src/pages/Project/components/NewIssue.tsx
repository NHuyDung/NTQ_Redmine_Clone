import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { AppDispatch, RootState } from "~/app/store";
import images from "~/assets/img";
import { fetchIssuesAll } from "~/features/issues/issuesAllSlice";
import ModalCreateVersion from "~/pages/MyPage/components/TableIssue/ModalCreateVersion";
import { CreateIssue, UploadFile } from "~/services/IssueService";
import { getMembersSelect, getVersionSelect } from "~/services/ProjectService";
import { Issue, IssueData } from "~/types/Issue";
import {
  defatultValueForSeverity,
  defaultValueForBugType,
  defaultValueForOptions,
  defaultValueForQc,
  IsDegree,
  optionsForBugType,
  optionsForPriority,
  optionsForQC,
  optionsForSeverity,
  optionsForStatus,
  ratio,
  selectOptions,
} from "~/types/NewIssue";
import { GroupMemberSelect, Versions } from "~/types/Project";
import { projectID } from "~/utils/CommonData";
import DescriptionInput from "~/utils/EditText";
import Preview from "~/utils/Preview";
import FileUpload from "~/utils/UploadFile";
const textColor = "text-primary-text_gray";
const labelStyle = `${textColor} text-xs font-semibold mb-2 mr-1 `;
const labelDataStyle = `${textColor} text-xs font-semibold mb-2 mr-1 w-28`;
const buttonStyle = "border border bg-primary-sub_bg text-13 mt-2.5 mr-1 p-1 hover:bg-[#c3c2c2] ";
const statusOptions = [
  { label: "Bug", value: 1 },
  { label: "Task", value: 4 },
];
interface FileObj {
  file: File;
  description: string;
}

const NewIssue = () => {
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<GroupMemberSelect>();
  const [version, setVersion] = useState<Versions[] | []>([]);
  const [files, setFiles] = useState<FileObj[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const { issuesAll } = useSelector((state: RootState) => state.issuesAll);
  useEffect(() => {
    if (issuesAll?.length === 0) {
      dispatch(fetchIssuesAll());
    }
  }, [dispatch, issuesAll?.length]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const filtered = issuesAll?.filter((issue) => issue.label?.toLowerCase().includes(query));
    if (filtered) {
      setFilteredIssues(filtered);
    }
    setShowDropdown(true); // Hiển thị danh sách khi nhập liệu
  };
  const handleSelectIssue = (value: string) => {
    setValue("parent_issue_id", value); // Gửi giá trị về hook form
    setShowDropdown(false); // Ẩn danh sách sau khi chọn
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const filesWithDesc = selectedFiles.map((file) => ({
      file,
      description: "",
    }));
    setFiles((prevFiles) => [...prevFiles, ...filesWithDesc]);
  };

  const handleDescriptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFiles = [...files];
    updatedFiles[index].description = e.target.value;
    setFiles(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    fetchVersions();
  }, [refresh]); // Thay đổi refresh sẽ trigger lại việc fetch data

  const fetchVersions = async () => {
    try {
      const versions = await getVersionSelect();
      setVersion(versions || []);
    } catch (error) {
      console.error("Error fetching versions:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await getMembersSelect();
        if (members) {
          setAssignee(members);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);
  const handleVersionCreated = () => {
    setRefresh((prev) => prev + 1);
    handleCloseModal();
  };
  const onSubmit: SubmitHandler<IssueData> = async (data) => {
    console.log("data:", data);

    setLoading(true);
    const custom_fields = [
      {
        id: 12,
        value: data.custom_fields[12],
      },
      {
        id: 13,
        value: data.custom_fields[13],
      },
      {
        id: 23,
        value: data.custom_fields[23],
      },
      {
        id: 25,
        value: data.custom_fields[25],
      },
      {
        id: 62,
        value: data.custom_fields[62],
      },
      {
        id: 63,
        value: data.custom_fields[63],
      },
    ];
    const watcher_user_ids = Object.keys(data.watchers || {})
      .filter((key: string) => data.watchers?.[Number(key)])
      .map((key) => assignee?.Watcher[Number(key)].value);
    const formattedData = {
      project_id: projectID,
      tracker_id: data.tracker_id,
      subject: data.subject,
      description: description,
      status_id: data.status_id,
      priority_id: data.priority_id,
      assignee_id: data.assignee_id,
      fixed_version_id: data.fixed_version_id,
      custom_fields: custom_fields,
      parent_issue_id: data.parent_issue_id,
      start_date: data.start_date ? moment(data.start_date).format("YYYY-MM-DD") : "",
      due_date: data.due_date ? moment(data.due_date).format("YYYY-MM-DD") : "",
      estimated_hours: data.estimated_hours,
      done_ratio: data.done_ratio,
      uploads: [],
      watcher_user_ids: watcher_user_ids,
    };
    try {
      const uploadAllFiles = async () => {
        try {
          console.log("files", files);

          // Sử dụng map để tạo một mảng các promises upload file
          const uploadPromises = files.map(async (fileObj) => {
            const response = await UploadFile(fileObj.file);
            return {
              token: response,
              filename: fileObj.file.name,
              content_type: fileObj.file.type,
            };
          });

          // Chờ đợi tất cả các file được upload và lưu kết quả vào mảng uploads trong formattedData
          formattedData.uploads = await Promise.all(uploadPromises);
        } catch (error) {
          console.error("Error uploading files:", error);
          throw error;
        }
      };

      await uploadAllFiles(); // Chờ đợi quá trình upload file hoàn thành
      console.log("formattedData", formattedData);

      // Tạo issue sau khi upload file thành công
      await CreateIssue(formattedData);
      navigate("/projects/fresher-_-reactjs-fresher/issues");
    } catch (error) {
      setLoading(false);
      console.error("Error creating Issue:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <h2 className={`${textColor} text-lg text-5 font-semibold mb-2`}>New issue</h2>
          {errors.subject && (
            <p className="text-red-500 text-sm w-full border-primary-borderError bg-primary-bgError border-2 ps-4 mb-4">
              {String(errors.subject.message)}
            </p>
          )}
          <div className="bg-gray-50 text-gray-700 leading-6 border border-gray-200  pl-36 pr-24">
            <p className="mb-2 mt-2">
              <label className={`${textColor} text-xs font-semibold mb-2`}>
                Tracker<span className="text-red-700"> * </span>
              </label>
              <select {...register("tracker_id", { required: true })} className="border border-primary-border w-16 h-6 text-xs">
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </p>

            <div className="mb-2 flex">
              <p className={labelStyle}>
                Subject<span className="text-red-700 ms-1">*</span>
              </p>
              <input
                type="text"
                className="border border-primary-border w-full p-1 h-6 text-xs"
                {...register("subject", {
                  required: "Subject can't be blank",
                  validate: (value) => value.trim() !== "" || "Subject cannot be just spaces",
                })}
              />
            </div>
            <DescriptionInput description={description} setDescription={setDescription} />
            <div>
              <div>
                <div className="flex justify-between mr-[180px]">
                  <div className="w-1/3">
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>
                        Status
                        <span className="text-red-700"> *</span>
                      </label>
                      <select className="border border-primary-border w-auto h-6 text-xs flex-grow" {...register("status_id")}>
                        {optionsForStatus.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>
                        Priority
                        <span className="text-red-700"> *</span>
                      </label>
                      <select {...register("priority_id")} className="border border-primary-border w-auto h-6 text-xs flex-grow">
                        {optionsForPriority.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>Assignee</label>

                      <select {...register("assignee_id")} className="border border-primary-border w-auto h-6 text-xs flex-grow">
                        {assignee?.Membership.map((opt, index) => (
                          <option key={index} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>Target version</label>
                      <select {...register("fixed_version_id")} className="border border-primary-border w-auto h-6 text-xs flex-grow">
                        {version?.map((opt, index) => (
                          <option key={index} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <img src={images.add} alt="add icon" className="ms-1 right-2 h-4 cursor-pointer" onClick={handleOpenModal} />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="mb-2 relative flex items-center">
                      <label className={labelDataStyle}>Parent task</label>
                      <div className="relative flex items-center">
                        <input
                          {...register("parent_issue_id")}
                          type="text"
                          className="border border-primary-border w-full h-6 text-xs pl-8"
                          placeholder="Search..."
                          onChange={handleSearch}
                        />
                        <img src={images.magnifier} alt="magnifier icon" className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4" />
                      </div>
                      {showDropdown && filteredIssues.length > 0 && (
                        <ul className="absolute bg-white border border-gray-300 w-48 max-h-32 overflow-y-auto z-10 top-6 right-[172px]">
                          {filteredIssues.map((issue) => (
                            <li key={issue.value} onClick={() => handleSelectIssue(issue.value)} className="p-2 cursor-pointer hover:bg-gray-200">
                              {issue.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>Start date</label>
                      <div className="relative flex items-center">
                        <Controller
                          name="start_date"
                          control={control}
                          defaultValue={new Date()} // Thiết lập giá trị mặc định là ngày hiện tại
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              selected={field.value || new Date()} // Nếu không có giá trị thì sẽ lấy ngày hiện tại
                              onChange={(date) => field.onChange(date)}
                              minDate={new Date()}
                              customInput={
                                <input
                                  type="text"
                                  name="start_date"
                                  className="border border-primary-border w-full h-6 text-xs pl-2"
                                  placeholder="Start Date"
                                />
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

                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>due date</label>
                      <div className="relative flex items-center">
                        <Controller
                          control={control}
                          name="due_date"
                          render={({ field }) => (
                            <DatePicker
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              minDate={new Date()}
                              customInput={
                                <input
                                  type="text"
                                  name="due_date"
                                  className="border border-primary-border w-full h-6 text-xs pl-2"
                                  placeholder="Due Date"
                                />
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
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>Estimate time</label>
                      <div className="relative flex items-center">
                        <input type="text" {...register("estimated_hours")} className="p-1 border border-primary-border w-full h-6 text-xs flex-1" />
                        <span className="ml-2 text-xs">Hours</span>
                      </div>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>% Done</label>
                      <div className="relative flex items-center">
                        <select {...register("done_ratio")} className="border border-primary-border w-16 h-6 text-xs flex-1">
                          {ratio.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mr-[180px]">
                  <div className="w-1/3">
                    <div className="mb-2 flex">
                      <label className={labelDataStyle}>
                        Bug Type
                        <span className="text-red-700">*</span>
                      </label>
                      <select
                        defaultValue={defaultValueForBugType}
                        {...register("custom_fields[12]")}
                        className="border border-primary-border w-auto h-6 text-xs flex-grow"
                      >
                        {optionsForBugType.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex">
                      <label className={labelDataStyle}>
                        Severity
                        <span className="text-red-700">*</span>
                      </label>
                      <select
                        defaultValue={defatultValueForSeverity}
                        {...register("custom_fields[13]")}
                        className="border border-primary-border w-auto h-6 text-xs flex-grow"
                      >
                        {optionsForSeverity.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex">
                      <label className={labelDataStyle}>
                        QC Activity
                        <span className="text-red-700">*</span>
                      </label>
                      <select
                        defaultValue={defaultValueForQc}
                        {...register("custom_fields[23]")}
                        className="border border-primary-border w-auto h-6 text-xs flex-grow"
                      >
                        {optionsForQC.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>
                        Cause Category <span className="text-red-700"> * </span>
                      </label>
                      <select
                        defaultValue={[defaultValueForOptions]}
                        {...register("custom_fields[25]")}
                        className="border border-primary-border w-3/4 text-xs p-1 rounded-md"
                        multiple
                      >
                        {selectOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>
                        Is Degrade? <span className="text-red-700"> * </span>
                      </label>
                      <select {...register("custom_fields[62]")} className="border border-primary-border w-3/4 h-6 text-xs">
                        {IsDegree.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 flex items-center">
                      <label className={labelDataStyle}>
                        Reopen counter <span className="text-red-700"> * </span>
                      </label>
                      <input
                        type="text"
                        defaultValue={0}
                        {...register("custom_fields[63]")}
                        className="border border-primary-border w-1/4 h-6 text-xs p-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <FileUpload
                  files={files}
                  handleDescriptionChange={handleDescriptionChange}
                  handleRemoveFile={handleRemoveFile}
                  handleFileChange={handleFileChange}
                />
                <div>
                  <label className="labelStyle">Watchers</label>
                  <span className="grid grid-cols-6 gap-1">
                    {assignee?.Watcher.map((item, index) => (
                      <Controller
                        key={index}
                        name={`watchers.${index}`}
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input type="checkbox" className="mr-2" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                            <label className="text-xs">{item.label}</label>
                          </div>
                        )}
                      />
                    ))}
                  </span>
                </div>
                <a className="flex items-center">
                  <img src={images.add} className="w-4 h-3 pr-1"></img>
                  <p className="text-primary hover:underline hover:text-[#b2290f] text-[0.6rem]">Search for watchers to add</p>
                </a>
              </div>
            </div>
          </div>
          <button className={buttonStyle} type="submit">
            Create
          </button>
          <button className={buttonStyle}>Create and continue</button>
        </>
      </form>
      <a className="text-primary hover:underline hover:text-primary-red text-xs">Preview</a>
      <Preview description={description} />
      {isModalVisible && <ModalCreateVersion onClose={handleCloseModal} onVersionCreated={handleVersionCreated} />}
      {loading && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-50">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      )}
    </>
  );
};

export default NewIssue;
