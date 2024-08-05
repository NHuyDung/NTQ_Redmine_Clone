import React from "react";
import { Link } from "react-router-dom";
import DragAndDropMyPage from "~/components/DragAndDrop/DragAndDropMyPage";

const MyPage = () => {
  const itemFromLocalStorage = localStorage.getItem("items");
  const items = JSON.parse(itemFromLocalStorage || "[]");
  const hasItems = (items.A && items.A.length > 0) || (items.B && items.B.length > 0) || (items.C && items.C.length > 0);

  return (
    <div>
      {hasItems ? (
        <div>
          <div className="flex justify-between mb-2.5">
            <h2 className="text-[#555] text-xl font-semibold ">My page</h2>
            <Link to={"/my/page_layout"} className="text-primary text-11 hover:underline hover:text-red-400">
              Personalize this page
            </Link>
          </div>
          <DragAndDropMyPage items={items} hasBorder={false} />
        </div>
      ) : (
        <div className="flex justify-between">
          <h2 className="text-[#555] text-xl text-5 font-semibold">My page</h2>
          <Link to={"/my/page_layout"} className="text-primary text-11 hover:underline hover:text-red-400">
            Personalize this page
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPage;
