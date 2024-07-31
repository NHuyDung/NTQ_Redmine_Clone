import React from "react";
import "./DragAndDrop.css";
import LogTime from "~/pages/MyPage/components/TotalTime/LogTime";
import Schedule from "~/pages/MyPage/components/Schedule/Schedule";
import TableIssue from "~/pages/MyPage/components/TableIssue/TableIssue";
import TotalTime from "~/pages/MyPage/components/TotalTime/TotalTime";
import SpentTime from "~/pages/MyPage/components/SpentTime/SpentTime";

type Item = {
  id: string;
  componentName: string;
};

type ItemsState = {
  A: Item[];
  B: Item[];
  C: Item[];
};

interface DragAndDropProps {
  items: ItemsState;
  hasBorder: boolean;
}

const componentsMap = {
  LogTime,
  Schedule,
  TableIssue,
  TotalTime,
  SpentTime,
  // Add more components as needed...
};

const DragAndDrop: React.FC<DragAndDropProps> = ({ items, hasBorder }) => {
  const getLabelById = (itemId: string, targetList: "A" | "B" | "C") => {
    const storedItems = JSON.parse(localStorage.getItem("items") || "{}");
    const item = storedItems[targetList].find((item: { id: string }) => item.id === itemId);
    return item ? item.label : "Unknown label";
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderItems = (items: Item[] | [], targetList: "A" | "B" | "C") => {
    return items.map((item) => {
      const Component = componentsMap[item.componentName as keyof typeof componentsMap];
      return (
        <div key={item.id} className="item">
          <div className="flex flex-1 mb-2">
            <a className="text-primary">{getLabelById(item.id, targetList)}</a>
          </div>
          {Component ? <Component id={item.id} /> : null}
        </div>
      );
    });
  };

  return (
    <div className="App">
      {items.A.length > 0 && (
        <div className={`table_primary ${hasBorder ? "with-border" : ""}`} id="table-A">
          {renderItems(items.A, "A")}
        </div>
      )}
      <div className="table_side-wrapper">
        <div className={`table_side ${hasBorder ? "with-border" : ""}`} id="table-B">
          {renderItems(items.B, "B")}
        </div>
        <div className={`table_side ${hasBorder ? "with-border" : ""}`} id="table-C">
          {renderItems(items.C, "C")}
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
