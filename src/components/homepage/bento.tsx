import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./items/SortableItem";
import LineChart from "./items/profile-view";
import { SalesBar } from "./items/sales-bar";

export default function Bento() {
  const [items, setItems] = useState([
    { id: 1, width: "32%", height: 500, children: <LineChart /> },
    { id: 2, width: "32%", height: 500, children: <SalesBar /> },
    { id: 3, width: "32%", height: 500, children: <SalesBar /> },
    { id: 4, width: "32%", height: 500, children: <SalesBar /> },
    { id: 5, width: "32%", height: 500, children: <SalesBar /> },
    { id: 6, width: "32%", height: 500, children: <SalesBar /> },
  ]);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <SortableContext items={items}>
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              width={item.width}
              height={item.height}
            >
              {item?.children}
             </SortableItem>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
