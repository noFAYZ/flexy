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

export default function Bento() {
  const [items, setItems] = useState([
    { id: 1, width: "45%", height: 400 },
    { id: 2, width: "25%", height: 400 },
    { id: 3, width: "15%", height: 400 },
    { id: 4, width: "15%", height: 400 },
    { id: 5, width: "15%", height: 400 },
    { id: 6, width: "55%", height: 400 },
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
            />
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
