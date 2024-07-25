import React, { useState, useEffect } from "react";
import DragAndDrop from "~/components/DragAndDrop/DragAndDrop";
import { ItemsState } from "~/types/ItemDragAndDrop";
import LogTime from "../MyPage/components/TotalTime/LogTime";
import Schedule from "../MyPage/components/Schedule/Schedule";
import TableIssue from "../MyPage/components/TableIssue/TableIssue";
import TotalTime from "../MyPage/components/TotalTime/TotalTime";
import SpentTime from "../MyPage/components/SpentTime/SpentTime";
import { getIssueAssigned, getIssueReport, getIssueWatched } from "~/services/IssueService";
import { IssueReport } from "~/types/Issue";

const componentMap: { [key: string]: React.ReactNode } = {
  LogTime: <LogTime />,
  Schedule: <Schedule />,
  TableIssue: <TableIssue data={[]} />,
  TotalTime: <TotalTime />,
  SpentTime: <SpentTime />,
};

interface Option {
  label: string;
  value: string;
  componentName?: string;
  isAdded?: boolean;
}

const MyPageLayoutPage = () => {
  const initialOptions: Option[] = [
    { label: "Issues assigned to me", value: "1", componentName: "TableIssue" },
    { label: "Reported issues", value: "2", componentName: "TableIssue" },
    { label: "Watched issues", value: "3", componentName: "TableIssue" },
    { label: "Latest news", value: "4", componentName: "" },
    { label: "Calendar", value: "5", componentName: "Schedule" },
    { label: "Documents", value: "6", componentName: "" },
    { label: "Spent time", value: "7", componentName: "SpentTime" },
  ];

  const [options, setOptions] = useState<Option[]>(initialOptions);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState<ItemsState>({
    A: [],
    B: [],
    C: [],
  });
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    // Đọc danh sách options đã thêm từ localStorage
    const addedOptions: string[] = JSON.parse(localStorage.getItem("addedOptions") || "[]");
    setOptions((prevOptions) => prevOptions.map((option) => (addedOptions.includes(option.value) ? { ...option, isAdded: true } : option)));

    // Đọc dữ liệu items từ localStorage
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find((option) => option.value === selectedValue);
    setSelectedOption(selectedOption || null); // Lưu option được chọn vào trạng thái tạm thời
  };

  const addOption = async () => {
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      const fetchData = fetchDataForOption(selectedValue);
      const newComponent = componentMap[selectedOption.componentName || ""];
      try {
        const data = await fetchData;
        if (newComponent) {
          // Cập nhật trạng thái với dữ liệu mới
          setItems((prevItems) => {
            const updatedItems = {
              A: [
                ...prevItems.A,
                {
                  id: selectedValue,
                  componentName: selectedOption.componentName || "",
                  data: data, // Store the fetched data here
                },
              ],
              B: prevItems.B,
              C: prevItems.C,
            };

            // Lưu dữ liệu vào localStorage
            localStorage.setItem("items", JSON.stringify(updatedItems));
            return updatedItems;
          });

          // Cập nhật danh sách options để loại bỏ option đã chọn
          setOptions((prevOptions) => prevOptions.map((option) => (option.value === selectedValue ? { ...option, isAdded: true } : option)));

          // Lưu danh sách options đã thêm vào localStorage
          const addedOptions: string[] = JSON.parse(localStorage.getItem("addedOptions") || "[]");
          localStorage.setItem("addedOptions", JSON.stringify([...addedOptions, selectedValue]));
          // Xóa trạng thái tạm thời và tải lại trang
          setSelectedOption(null);
          window.location.reload();
        } else {
          console.log("new component not found");
        }
      } catch (error) {
        console.error("Error adding option:", error);
      }
    }
  };

  // Helper function to fetch data based on the selected option
  const fetchDataForOption = async (optionValue: string): Promise<IssueReport[]> => {
    switch (optionValue) {
      case "1":
        return await getIssueAssigned();
      case "2":
        return await getIssueReport();
      case "3":
        return await getIssueWatched();
      default:
        return [];
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[#555] text-lg text-5 font-semibold">My page</h2>
        <div className="flex items-center">
          <p className="pr-2 text-xs">My page block</p>
          <select onChange={handleOptionChange} className="border border-primary-border w-32 h-6 text-xs mx-2">
            <option value=""></option>
            {options
              .filter((option) => !option.isAdded)
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>

          <a onClick={addOption} className="flex items-center mx-2 cursor-pointer" rel="noreferrer noopener">
            <img src="https://redmine.ntq.solutions/images/add.png" className="w-4 h-4" alt="Add" />
            <p className="text-xs hover:underline hover:text-red-400 ml-1">Add</p>
          </a>

          <a href="/my-page" rel="noreferrer noopener" className="flex items-center mx-2">
            <img src="https://redmine.ntq.solutions/images/cancel.png" className="w-4 h-4" alt="Back" />
            <p className="text-xs hover:underline hover:text-red-400 ml-1">Back</p>
          </a>
        </div>
      </div>
      <DragAndDrop hasBorder={true} />
    </div>
  );
};

export default MyPageLayoutPage;
