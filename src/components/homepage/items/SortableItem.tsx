import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp01Icon, ArrowUpRight, Settings2 } from "lucide-react";
import { ThemeSwitch } from "../../theme-switch";

export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: props?.width || 500,
    display: "flex",
    height: props?.height || 500,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=" bg-muted-foreground border-1 border-background/80  dark:bg-card shadow-lg shadow-foreground/5 dark:border-card dark:shadow-card rounded-[3rem] sm:h-[200px] md:h-[400px] lg:h-[400px] xl:h-[400px] 2xl:h-[1000px] md:m-15 m-2 "
    >
      <div className="relative w-full h-full group ">
      <Link
          color="foreground"
          href=""
          className="flex justify-center items-center "
        >
          <button className="absolute bg-foreground-100 top-4 right-20 w-10 h-10 md:w-[5.95rem] md:h-[3.55rem]  px-2 rounded-3xl hover:bg-white border-0 border-transparent  hover:text-black text-lg ">
            <div className="flex justify-center items-center">
              Weekly
            </div>
          </button>{" "}
        </Link>
        <Link
          color="foreground"
          href=""
          className="flex justify-center items-center "
        >
          <button className="absolute bg-foreground-100 top-4 right-4 w-10 h-10 md:w-[3.55rem] md:h-[3.55rem]  px-2 rounded-3xl hover:bg-white border-0 border-transparent  hover:text-black">
            <div className="flex justify-center items-center">
              <Settings2 size={26}  />
            </div>
          </button>{" "}
        </Link>

      

        <button className="absolute bg-foreground-100 bottom-4 right-4 transition-all w-14 h-14 md:w-[3.75rem] md:h-[3.75rem] duration-500 ease-in-out group-hover:w-40 p-2 rounded-full hover:bg-default-100 border-2 border-transparent dark:border-knight">
          <div className="flex justify-center items-center">
            <Link
              color="foreground"
              href="https://beta.simplegen.ai/"
              className="flex justify-center items-center "
            >
              <span className="text-sm md:text-medium text-nowrap hidden group-hover:block invisible group-hover:visible mr-1 animate-fade">
                Check Now
              </span>
              <ArrowUpRight size={26} />
            </Link>
          </div>
        </button>
      </div>
    </div>
  );
}
