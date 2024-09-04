"use client";

import GigCardGallery from "@/components/gigs/GigCardGallery";
import Bento from "@/components/homepage/bento";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <>
    <ScrollArea className="rounded-md border" scrollHideDelay={5} >
      <Bento />
      <div className="flex flex-col lg:px-32 md:px-24 shadow pb-10">
        <section className=" px-10">
          <GigCardGallery />
          <GigCardGallery />
        </section>
      </div>
      </ScrollArea>
    </>
  );
}
