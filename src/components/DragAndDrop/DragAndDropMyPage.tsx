import React from "react";
import "./DragAndDrop.css";
import LogTime from "~/pages/MyPage/components/TotalTime/LogTime";
import Schedule from "~/pages/MyPage/components/Schedule/Schedule";
import TableIssue from "~/pages/MyPage/components/TableIssue/TableIssue";
import TotalTime from "~/pages/MyPage/components/TotalTime/TotalTime";

type Item = {
  id: string;
  content?: string;
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
  // Add more components as needed...
};

const DragAndDrop: React.FC<DragAndDropProps> = ({ items, hasBorder }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderItems = (items: Item[], targetList: "A" | "B" | "C") => {
    return items.map((item) => {
      const Component = componentsMap[item.componentName as keyof typeof componentsMap];
      return (
        <div key={item.id} className="item">
          {Component ? <Component /> : null}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <div className={`table_primary ${hasBorder ? "with-border" : ""}`} id="table-A">
        {renderItems(items.A, "A")}
      </div>
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
