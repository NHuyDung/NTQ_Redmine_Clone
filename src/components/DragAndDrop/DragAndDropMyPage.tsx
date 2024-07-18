import React from "react";
import "./DragAndDrop.css";

type Item = {
  id: string;
  content: string;
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

const DragAndDrop: React.FC<DragAndDropProps> = ({ items, hasBorder }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderItems = (items: Item[], targetList: "A" | "B" | "C") => {
    return items.map((item) => (
      <div key={item.id} className="item">
        {item.content}
      </div>
    ));
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
