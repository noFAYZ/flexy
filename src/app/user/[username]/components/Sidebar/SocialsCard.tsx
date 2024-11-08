"use client";
import { HugeiconsContact } from "@/components/icons/icons";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import ProfileSocials from "./ProfileSocials";

export const SocialsCard = () => (
    <Card className=" bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default  bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <motion.div className="mr-2">
            <HugeiconsContact size={22} className="text-primary" />
          </motion.div>
          Contacts
      </CardHeader>
      <CardBody className="p-4">
        <ul className="space-y-2">
          <li className="flex gap-2 ">
            {" "}
            <h3> Phone:</h3> <span>+1 233 232 233</span>
          </li>
          <li className="flex gap-2 ">
            {" "}
            <h3> Email:</h3> <span>hello@mywebsite.com</span>
          </li>
          <li>
            {" "}
            <ProfileSocials />
          </li>
        </ul>
      </CardBody>
    </Card>
  );