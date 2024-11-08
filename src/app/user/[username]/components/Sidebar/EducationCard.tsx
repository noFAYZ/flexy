"use client";
import { FluentMdl2Education } from "@/components/icons/icons";
import { CardTitle, CardContent } from "@/components/ui/card";
import { Card, CardHeader, Chip } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image'


export const EducationCard = ({ education }) => (
    <Card className="border-medium border-default rounded-3xl bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <motion.div className="mr-2">
          <FluentMdl2Education height={24} className="text-primary" />
          </motion.div>
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <AnimatePresence>
          <div className="relative">
            {education.map((ed, index) => (
              <EducationItem
                key={index}
                education={ed}
                isLast={index === education.length - 1}
              />
            ))}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );

  const EducationItem = ({ education, isLast }) => (
    <div className="flex items-start space-x-4 mb-4 relative">
      <div className="w-full ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={`https://avatar.iran.liara.run/public/`}
              alt={`${education.company} logo`}
              width={40}
              height={40}
              className="rounded-full bg-white p-1 shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${education.company}&background=random`;
              }}
            />
            <div>
              <h3 className="font-semibold text-sm">{education.degree}</h3>
              <p className="text-xs">{education.school}</p>
            </div>
          </div>
          <Chip className="text-xs">{education.year}</Chip>
        </div>
      </div>
    </div>
  );