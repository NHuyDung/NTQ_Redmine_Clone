import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { setShowClosed } from "../showClosedSlice";
import { setShowBug } from "../showBugSlice";
import { setShowTask } from "../showTaskSlice";

const ApplyButton: React.FC = () => {
  const dispatch = useDispatch();
  const tempShowClosed = useSelector((state: RootState) => state.tempSettings.tempShowClosed);
  const tempShowBug = useSelector((state: RootState) => state.tempSettings.tempShowBug);
  const tempShowTask = useSelector((state: RootState) => state.tempSettings.tempShowTask);

  const applyChanges = () => {
    dispatch(setShowClosed(tempShowClosed));
    dispatch(setShowBug(tempShowBug));
    dispatch(setShowTask(tempShowTask));
  };

  return (
    <button
      className="border border-[#cccccc] border-[1px] text-[#222222] bg-[#f2f2f2] text-13 mt-2.5 w-12 hover:bg-[#c3c2c2]"
      onClick={applyChanges}
    >
      Apply
    </button>
  );
};

export default ApplyButton;
