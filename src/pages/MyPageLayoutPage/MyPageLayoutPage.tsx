import React, { useState, useEffect } from "react";
import DragAndDrop from "~/components/DragAndDrop/DragAndDrop";
import { ItemsState } from "~/types/ItemDragAndDrop";
// import LogTime from "../MyPage/components/TotalTime/LogTime";
import Schedule from "../MyPage/components/Schedule/Schedule";
import TableIssue from "../MyPage/components/TableIssue/TableIssue";
// import TotalTime from "../MyPage/components/TotalTime/TotalTime";
import SpentTime from "../MyPage/components/SpentTime/SpentTime";
import { getIssueAssigned, getIssueReport, getIssueSchedule, getIssueWatched } from "~/services/IssueService";
// import { IssueType } from "~/types/Issue";
const componentMap: { [key: string]: React.ReactNode } = {
  // LogTime: <LogTime />,
  Schedule: <Schedule data={[]} />,
  TableIssue: <TableIssue data={[]} />,
  // TotalTime: <TotalTime />,
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
      const componentName = selectedOption.componentName || "";
      const selectedLabel = selectedOption.label;
      const fetchData = fetchDataForOption(selectedValue);
      try {
        const data = await fetchData;
        if (selectedValue && componentName) {
          const newComponent = componentMap[componentName];
          if (newComponent) {
            // Cập nhật trạng thái với dữ liệu mới
            setItems((prevItems) => {
              const updatedItems = {
                A: [
                  ...prevItems.A,
                  {
                    id: selectedValue,
                    componentName: componentName,
                    label: selectedLabel,
                    data: data,
                  },
                ],
                B: prevItems.B,
                C: prevItems.C,
              };

              // Lưu dữ liệu vào localStorage
              // eslint-disable-next-line quotes
              const storedItems = JSON.parse(localStorage.getItem("items") || '{"A": [], "B": [], "C": []}');
              const newStoredItems = {
                A: [...storedItems.A, { id: selectedValue, componentName: componentName, label: selectedLabel, data: data }],
                B: storedItems.B,
                C: storedItems.C,
              };
              localStorage.setItem("items", JSON.stringify(newStoredItems));
              return updatedItems;
            });

            // Cập nhật danh sách options để loại bỏ option đã chọn
            setOptions((prevOptions) => prevOptions.map((option) => (option.value === selectedValue ? { ...option, isAdded: true } : option)));

            // Lưu danh sách options đã thêm vào localStorage
            const addedOptions = JSON.parse(localStorage.getItem("addedOptions") || "[]");
            localStorage.setItem("addedOptions", JSON.stringify([...addedOptions, selectedValue]));

            // Xóa trạng thái tạm thời
            setSelectedOption(null);
            window.location.reload();
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };
  const fetchDataForOption = async (optionValue: string) => {
    switch (optionValue) {
      case "1":
        return await getIssueAssigned();
      case "2":
        return await getIssueReport();
      case "3":
        return await getIssueWatched();
      case "5":
        return await getIssueSchedule();
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
