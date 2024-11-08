"use client";
import { CarbonBadge, ClarityCertificateLine } from "@/components/icons/icons";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const CertificationsCard = ({ certifications }) => {
    return (
      <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
            <motion.div className="mr-2">
              <CarbonBadge size={22} className="text-primary" />
            </motion.div>
            Certifications
          </CardTitle>
        </CardHeader>
        <CardBody className="p-4">
          <motion.ul className="space-y-2">
            {certifications.map((certification, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group mb-4 "
              >
                <div className=" transition-colors duration-300  ">
                  <div className="flex gap-3 content-center items-center align-middle ">
                    <ClarityCertificateLine className="text-primary" size={20} />
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors duration-300">
                        {certification.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {certification.issuer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <Button
              type="submit"
              size="sm"
              className={` text-xs bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full 
                  transition-all duration-100 transform hover:scale-105 `}
              endContent={<ChevronRight size={16} />}
            >
              View all!
            </Button>
          </motion.div>
        </CardBody>
      </Card>
    );
  };