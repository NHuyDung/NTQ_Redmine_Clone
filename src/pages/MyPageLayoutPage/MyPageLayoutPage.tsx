import React, { useState, useEffect } from "react";
import DragAndDrop from "~/components/DragAndDrop/DragAndDrop";
import { ComponentMap, Item, ItemsState, Option } from "~/types/ItemDragAndDrop";
import Schedule from "../MyPage/components/Schedule/Schedule";
import TableIssue from "../MyPage/components/TableIssue/TableIssue";
import SpentTime from "../MyPage/components/SpentTime/SpentTime";
import addButton from "~/assets/img/mypage_add.png";
import backButton from "~/assets/img/mypage_back.png";
import { Link } from "react-router-dom";

const componentMap: { [key: string]: React.ReactNode } = {
  Schedule: <Schedule />,
  TableIssue: <TableIssue id="" />,
  SpentTime: <SpentTime />,
};

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

  const addOption = () => {
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      const componentName = selectedOption.componentName as keyof ComponentMap; // Ensure correct type
      const selectedLabel = selectedOption.label;

      try {
        if (selectedValue && componentName) {
          const newComponent = componentMap[componentName];

          if (newComponent) {
            // Cập nhật trạng thái với dữ liệu mới
            setItems((prevItems) => {
              const newItem: Item = {
                id: selectedValue,
                componentName: componentName,
                label: selectedLabel,
              };

              const updatedItems: ItemsState = {
                A: [...prevItems.A, newItem],
                B: prevItems.B,
                C: prevItems.C,
              };

              // eslint-disable-next-line quotes
              const storedItems: ItemsState = JSON.parse(localStorage.getItem("items") || '{"A": [], "B": [], "C": []}');
              const newStoredItems: ItemsState = {
                A: [...storedItems.A, newItem],
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
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
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

          <button onClick={addOption} className="flex items-center mx-2 cursor-pointer" aria-label="Add Option">
            <img src={addButton} className="w-4 h-4" alt="Add" />
            <p className="text-xs hover:underline hover:text-red-400 ml-1">Add</p>
          </button>

          <Link to="/my-page" className="flex items-center mx-2" rel="noreferrer noopener">
            <img src={backButton} className="w-4 h-4" alt="Back" />
            <p className="text-xs hover:underline hover:text-red-400 ml-1">Back</p>
          </Link>
        </div>
      </div>
      <DragAndDrop hasBorder={true} items={items} setItems={setItems} setOptions={setOptions} />
    </div>
  );
};

export default MyPageLayoutPage;
