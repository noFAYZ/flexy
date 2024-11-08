"use client";
import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import {

  Check,

} from "lucide-react";

import { useTheme } from 'next-themes';




export const AppearanceSettings = () => {
    const { theme, setTheme } = useTheme();
  
    return (
      <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
        <CardBody className="p-6 space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
              Appearance
            </h2>
            <p className="text-foreground/60">
              Customize how your profile looks to others
            </p>
          </div>
  
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Theme</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['light', 'dark', 'system'].map((themeName) => (
                  <ThemeOption
                    key={themeName}
                    name={themeName}
                    active={theme === themeName}
                    onClick={() => setTheme(themeName)}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };
  
  const ThemeOption = ({ name, active, onClick }) => (
    <div
      className={`p-4 rounded-xl border-2 ${
        active ? 'border-primary' : 'border-default'
      } cursor-pointer hover:border-primary/50 transition-colors`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <span className="capitalize font-medium">{name}</span>
        {active && <Check size={16} className="text-primary" />}
      </div>
    </div>
  );
  