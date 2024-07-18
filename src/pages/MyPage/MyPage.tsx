import React from "react";
import DragAndDropMyPage from "~/components/DragAndDrop/DragAndDropMyPage";

const MyPage = () => {
  const itemFromLocalStorage = localStorage.getItem("items");
  const items = JSON.parse(itemFromLocalStorage || "[]");
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-[#555] text-lg text-5 font-semibold">My page</h2>
        <a className="text-primary" href="my/page_layout">
          Personalize this page
        </a>
      </div>
      <DragAndDropMyPage items={items} hasBorder={false} />
    </div>
  );
};

export default MyPage;
