import React, { useState, useRef, useEffect } from "react";
import "./DragAndDrop.css";
import LogTime from "~/pages/MyPage/components/TotalTime/LogTime";
import Schedule from "~/pages/MyPage/components/Schedule/Schedule";
import TableIssue from "~/pages/MyPage/components/TableIssue/TableIssue";
import TotalTime from "~/pages/MyPage/components/TotalTime/TotalTime";
import SpentTime from "~/pages/MyPage/components/SpentTime/SpentTime";
import closeButton from "~/assets/img/close.png";
import { GroupedIssues, IssueReport, IssueType } from "~/types/Issue";

type ComponentMap = {
  LogTime: () => JSX.Element;
  Schedule: React.FC<{ data: GroupedIssues[] | [] }>;
  TableIssue: React.FC<{ data: IssueReport[] | [] }>;
  TotalTime: React.FC;
  SpentTime: () => JSX.Element;
  // Thêm các component khác nếu cần...
};

const componentMap: ComponentMap = {
  LogTime,
  Schedule,
  TableIssue,
  TotalTime,
  SpentTime,
  // Add more components as needed...
};

type Item = {
  id: string;
  data: IssueType;
  componentName: keyof ComponentMap;
};

type ItemsState = {
  A: Item[];
  B: Item[];
  C: Item[];
};

const initialItems: ItemsState = {
  A: [],
  B: [],
  C: [],
};

interface DragAndDropProps {
  hasBorder: boolean;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ hasBorder }) => {
  const [items, setItems] = useState<ItemsState>(initialItems);
  const [draggingItem, setDraggingItem] = useState<Item | null>(null);
  const [draggingStyle, setDraggingStyle] = useState<React.CSSProperties>({});
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const [itemSources, setItemSources] = useState<{ [itemId: string]: "A" | "B" | "C" }>({});
  const [currentList, setCurrentList] = useState<"A" | "B" | "C">("A");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [targetList, setTargetList] = useState<"A" | "B" | "C" | "">("A");

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const onDrop = (item: Item, targetList: "A" | "B" | "C") => {
    const sourceList = itemSources[item.id];

    if (sourceList === targetList) {
      setDraggingItem(null);
      setDraggingStyle({});
      setIsDragging(false);
      return;
    }

    setItems((prevItems) => {
      const updatedItems = {
        ...prevItems,
        [sourceList]: prevItems[sourceList].filter((i) => i.id !== item.id),
        [targetList]: [...prevItems[targetList], item],
      };
      localStorage.setItem("items", JSON.stringify(updatedItems));
      return updatedItems;
    });

    setDraggingItem(null);
    setDraggingStyle({});
    setIsDragging(false);

    setItemSources((prevSources) => {
      const updatedSources = { ...prevSources };
      delete updatedSources[item.id];
      return updatedSources;
    });
  };

  const onDragStart = (e: React.MouseEvent, item: Item, list: "A" | "B" | "C") => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    setDraggingItem(item);
    setItemSources((prevSources) => ({
      ...prevSources,
      [item.id]: list,
    }));
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDraggingStyle({
      position: "absolute",
      top: rect.top - containerRef.current!.getBoundingClientRect().top,
      left: rect.left - containerRef.current!.getBoundingClientRect().left,
      zIndex: 1000,
      width: rect.width,
      height: rect.height,
    });
    isMouseDownRef.current = true;
    setCurrentList(list);
  };

  const onDrag = (e: React.MouseEvent) => {
    if (isDragging && draggingItem) {
      setDraggingStyle((prevStyle) => ({
        ...prevStyle,
        top: e.clientY - offset.y - containerRef.current!.getBoundingClientRect().top,
        left: e.clientX - offset.x - containerRef.current!.getBoundingClientRect().left,
      }));
    }
  };

  const getCurrentDropTarget = (x: number, y: number) => {
    if (checkDropTarget(x, y, "A")) {
      return "A";
    } else if (checkDropTarget(x, y, "B")) {
      return "B";
    } else if (checkDropTarget(x, y, "C")) {
      return "C";
    }

    return null; // Trường hợp không nằm trong bất kỳ bảng nào
  };

  const onDragEnd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (draggingItem) {
      const x = e.clientX;
      const y = e.clientY;
      const currentDropTarget = getCurrentDropTarget(x, y);

      if (currentDropTarget) {
        onDrop(draggingItem, currentDropTarget);
      } else {
        resetDragState();
      }

      if (currentList === currentDropTarget && draggingItem) {
        const itemsContainer = containerRef.current!.querySelector(`#table-${currentDropTarget}`);
        if (itemsContainer) {
          const itemElements = itemsContainer.children;
          const currentIndex = items[currentDropTarget].findIndex((item) => item.id === draggingItem.id);
          let newIndex = -1;

          for (let i = 0; i < itemElements.length; i++) {
            const itemRect = itemElements[i].getBoundingClientRect();
            if (y >= itemRect.top && y <= itemRect.bottom) {
              const itemMiddleY = (itemRect.top + itemRect.bottom) / 2;
              if (y >= itemMiddleY - itemRect.height && y <= itemMiddleY + itemRect.height) {
                newIndex = i;
                break;
              }
            }
          }

          if (currentIndex >= 0 && newIndex >= 0 && newIndex < items[currentDropTarget].length && newIndex !== currentIndex) {
            const newItems = [...items[currentDropTarget]];
            const [movedItem] = newItems.splice(currentIndex, 1);
            newItems.splice(newIndex, 0, movedItem);

            setItems((prevItems) => ({
              ...prevItems,
              [currentDropTarget]: newItems,
            }));

            localStorage.setItem(
              "items",
              JSON.stringify({
                ...items,
                [currentDropTarget]: newItems,
              }),
            );
          }
        }
      }

      resetDragState();
    }
  };

  const resetDragState = () => {
    setDraggingItem(null);
    setDraggingStyle({});
    setIsDragging(false);
    isMouseDownRef.current = false;
  };

  const checkDropTarget = (x: number, y: number, targetList: "A" | "B" | "C") => {
    const target =
      targetList === "A"
        ? containerRef.current!.querySelector("#table-A")
        : targetList === "B"
          ? containerRef.current!.querySelector("#table-B")
          : containerRef.current!.querySelector("#table-C");

    if (target) {
      const rect = target.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }
    return false;
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      setDraggingItem(null);
      setDraggingStyle({});
    }
    isMouseDownRef.current = false;
  };

  useEffect(() => {
    const handleMouseMove = () => {
      if (isMouseDownRef.current && !isDragging) {
        setIsDragging(true);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleCloseItem = (itemId: string, targetList: "A" | "B" | "C") => {
    const storedItems = JSON.parse(localStorage.getItem("items") || "{}");
    const updatedList = storedItems[targetList].filter((item: { id: string }) => item.id !== itemId);
    storedItems[targetList] = updatedList;
    localStorage.setItem("items", JSON.stringify(storedItems));

    const addedItems = JSON.parse(localStorage.getItem("addedOptions") || "[]");
    const updatedAddedItems = addedItems.filter((item: string) => item !== itemId);
    console.log(updatedAddedItems);
    localStorage.setItem("addedOptions", JSON.stringify(updatedAddedItems));

    window.location.reload();
  };
  const getLabelById = (itemId: string, targetList: "A" | "B" | "C") => {
    const storedItems = JSON.parse(localStorage.getItem("items") || "{}");
    const item = storedItems[targetList].find((item: { id: string }) => item.id === itemId);
    return item ? item.label : "Unknown label";
  };

  const renderItems = (items: Item[], targetList: "A" | "B" | "C") => {
    return items.map((item) => {
      const Component = componentMap[item.componentName as keyof typeof componentMap];

      return (
        <div
          key={item.id}
          className="item"
          onMouseDown={(e) => onDragStart(e, item, targetList)}
          style={draggingItem?.id === item.id && isDragging ? { visibility: "hidden" } : {}}
        >
          <div className="flex justify-between items-center">
            <p>{getLabelById(item.id, targetList)}</p>
            <a className="close-button" onClick={() => handleCloseItem(item.id, targetList)}>
              <img className="close" alt="close" src={closeButton}></img>
            </a>
          </div>
          <Component data={item.data} />
        </div>
      );
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (Component: React.ElementType, props: any) => {
    return <Component {...props} />;
  };

  return (
    <div onMouseMove={onDrag} onMouseUp={onDragEnd} ref={containerRef} style={{ position: "relative" }}>
      {isDragging && draggingItem && (
        <div style={draggingStyle} className="item dragging">
          {renderComponent(componentMap[draggingItem.componentName], { data: draggingItem.data })}
        </div>
      )}

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
    </div>
  );
};

export default DragAndDrop;
