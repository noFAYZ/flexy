"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Image from 'next/image';

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative min-h-screen flex items-center justify-end bg-cover bg-center">
      <Image
        src="/images/s2.webp"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-25"></div>
      
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className=" flex flex-col justify-center h-screen md:w-1/2  z-10 md:p-20 p-4 "
      >
        <Card className="flex justify-center p-6 h-screen bg-gradient-to-r from-black via-transparent to-black opacity-95 backdrop-filter backdrop-blur-lg rounded-[3.5rem] ">
       
          <CardBody className="  justify-center py-2">
            <form className="space-y-4">
              <Input
                type="email"
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                className="max-w-xs"
              />
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>
            </form>
          </CardBody>
     
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;