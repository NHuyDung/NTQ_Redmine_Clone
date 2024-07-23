import React from "react";
import DragAndDropMyPage from "~/components/DragAndDrop/DragAndDropMyPage";
import SpentTime from "./components/SpentTime/SpentTime";
import TotalTime from "./components/TotalTime/TotalTime";

const MyPage = () => {
  const itemFromLocalStorage = localStorage.getItem("items");
  const items = JSON.parse(itemFromLocalStorage || "[]");
  const hasItems = (items.A && items.A.length > 0) || (items.B && items.B.length > 0) || (items.C && items.C.length > 0);

  return (
    <div>
      <TotalTime />
      <SpentTime />
      {hasItems ? (
        <div>
          <div className="flex justify-between">
            <h2 className="text-[#555] text-xl text-5 font-semibold">My page</h2>
            <a className="text-primary text-11 hover:underline hover:text-red-400" href="my/page_layout">
              Personalize this page
            </a>
          </div>
          <DragAndDropMyPage items={items} hasBorder={false} />
        </div>
      ) : (
        <div className="flex justify-between">
          <h2 className="text-[#555] text-xl text-5 font-semibold">My page</h2>
          <a className="text-primary text-11 hover:underline hover:text-red-400" href="my/page_layout">
            Personalize this page
          </a>
        </div>
      )}
    </div>
  );
};

export default MyPage;
