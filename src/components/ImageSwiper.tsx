'use client'

import { useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Heart, Plus } from 'lucide-react'

export const ImageSwiper: React.FC<{ images: string[]; className?: string }> = ({
  images,
  className
}) => {
  const [imgIndex, setImgIndex] = useState(0)
  const dragX = useMotionValue(0)

  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -10 && imgIndex < images.length - 1) {
      setImgIndex((e) => e + 1)
    } else if (x >= 10 && imgIndex > 0) {
      setImgIndex((e) => e - 1)
    }
  }

  return (
    <div className={cn(
      'group/hover relative aspect-square h-[14rem] w-full overflow-hidden rounded-lg',
      className
    )}>
      <div className="absolute top-7 z-10 flex w-full -translate-y-1/2 justify-between px-5">
        <button
          className="h-fit w-fit rounded-full bg-white/80 p-2 opacity-0 transition-all group-hover/hover:opacity-100"
          onClick={() => {/* Add functionality */}}
        >
          <Plus className="stroke-neutral-600 font-bold" size={16} />
        </button>
        <button
          className="h-fit w-fit rounded-full bg-white/80 p-2 opacity-0 transition-all group-hover/hover:opacity-100"
          onClick={() => {/* Add functionality */}}
        >
          <Heart className="stroke-neutral-600" size={18} />
        </button>
      </div>
      <div className="absolute top-[65%] z-10 flex w-full -translate-y-1/2 justify-between px-5">
        {imgIndex > 0 && (
          <button
            className="h-fit w-fit rounded-full bg-white/80 p-2 opacity-0 transition-all group-hover/hover:opacity-100"
            onClick={() => setImgIndex((pv) => pv - 1)}
          >
            <ChevronLeft className="stroke-neutral-600" size={20} />
          </button>
        )}
        {imgIndex < images.length - 1 && (
          <button
            className="h-fit w-fit rounded-full bg-white/80 p-2 opacity-0 transition-all group-hover/hover:opacity-100"
            onClick={() => setImgIndex((pv) => pv + 1)}
          >
            <ChevronRight className="stroke-neutral-600" size={20} />
          </button>
        )}
      </div>
      <div className="absolute bottom-2 z-10 flex w-full items-center justify-center">
        <div className="flex w-9 items-center justify-center rounded-md bg-black/80 p-0.5 text-xs text-white opacity-0 transition-all group-hover/hover:opacity-100">
          {imgIndex + 1}/{images.length}
        </div>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0
        }}
        dragMomentum={false}
        style={{
          x: dragX
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`
        }}
        onDragEnd={onDragEnd}
        transition={{ damping: 18, stiffness: 90, type: 'spring', duration: 0.2 }}
        className="flex h-full cursor-grab items-center rounded-[inherit] active:cursor-grabbing"
      >
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="h-full w-full shrink-0 overflow-hidden bg-neutral-800 object-cover first:rounded-l-[inherit] last:rounded-r-[inherit]"
          >
            <img src={src} className="pointer-events-none h-full w-full object-cover" alt={`Image ${i + 1}`} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}