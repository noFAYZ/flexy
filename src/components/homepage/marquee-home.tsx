import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";
import { Star, ThumbsUp, Heart } from 'lucide-react';

const reviews = [
   {
      name: 'Jack',
      username: '@jack',
      body: 'I\'ve never seen anything like this before. It\'s amazing. I love it.',
      img: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
   },
   {
      name: 'Jill',
      username: '@jill',
      body: 'I don\'t know what to say. I\'m speechless. This is amazing.',
      img: 'https://i.pravatar.cc/150?img=2',
      rating: 4,
   },
   {
      name: 'John',
      username: '@john',
      body: 'I\'m at a loss for words. This is amazing. I love it.',
      img: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
   },
   {
      name: 'Jane',
      username: '@jane',
      body: 'This platform has transformed how I work. Highly recommended!',
      img: 'https://i.pravatar.cc/150?img=4',
      rating: 5,
   },
   {
      name: 'Jenny',
      username: '@jenny',
      body: 'The talent pool here is exceptional. I found the perfect freelancer for my project.',
      img: 'https://i.pravatar.cc/150?img=5',
      rating: 4,
   },
   {
      name: 'James',
      username: '@james',
      body: 'As a freelancer, this platform has opened up so many opportunities for me.',
      img: 'https://i.pravatar.cc/150?img=6',
      rating: 5,
   },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function ReviewCard({
   img,
   name,
   username,
   body,
   rating,
}: {
   img: string;
   name: string;
   username: string;
   body: string;
   rating: number;
}) {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <motion.figure
         className={cn(
            'relative w-80 h-40 cursor-pointer overflow-hidden rounded-xl border p-4 bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between',
            isHovered ? 'shadow-lg scale-105' : 'shadow-md'
         )}
         onHoverStart={() => setIsHovered(true)}
         onHoverEnd={() => setIsHovered(false)}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
      >
         <div>
            <div className="flex flex-row items-center gap-3 ">
               <motion.img 
                  className="rounded-full border-2 border-primary/20" 
                  width="40" 
                  height="40" 
                  alt="" 
                  src={img}
                  whileHover={{ scale: 1.1, rotate: 5 }}
               />
               <div className="flex flex-col">
                  <figcaption className="text-sm font-medium text-foreground">
                     {name}
                  </figcaption>
                  <p className="text-xs font-medium text-muted-foreground">{username}</p>
               </div>
            </div>
            <blockquote className="text-sm leading-relaxed line-clamp-2">{body}</blockquote>
         </div>
         <div className="flex justify-between items-center ">
            <div className="flex items-center gap-1">
               {Array(rating).fill(0).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
               ))}
            </div>
            <motion.div 
               className="flex gap-2"
               initial={{ opacity: 0 }}
               animate={{ opacity: isHovered ? 1 : 0 }}
            >
               <ThumbsUp size={16} className="text-primary cursor-pointer" />
               <Heart size={16} className="text-rose-500 cursor-pointer" />
            </motion.div>
         </div>
      </motion.figure>
   );
}

export default function MarqueeDemo() {
   return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border-0 pt-8 bg-gradient-to-b from-background to-background/50 -skew-y-3">
    <div className="relative w-full">
       <div className="absolute top-0 bottom-0 left-0 w-32 z-50 bg-gradient-to-r from-background to-black"></div>
       <div className="absolute top-0 bottom-0 right-0 w-32 z-50 bg-gradient-to-l from-background to-black"></div>
       
       <Marquee pauseOnHover className="[--duration:30s] mb-2">
          {firstRow.map(review => (
             <div key={review.username} className="mx-2">
                <ReviewCard {...review} />
             </div>
          ))}
       </Marquee>
    </div>
    
    <div className="relative w-full">
       <div className="absolute top-0 bottom-0 left-0 w-32 z-50 bg-gradient-to-r from-background to-black"></div>
       <div className="absolute top-0 bottom-0 right-0 w-32 z-50 bg-gradient-to-l from-background to-transparent"></div>
       
       <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map(review => (
             <div key={review.username} className="mx-2">
                <ReviewCard {...review} />
             </div>
          ))}
       </Marquee>
    </div>
 </div>
   );
}