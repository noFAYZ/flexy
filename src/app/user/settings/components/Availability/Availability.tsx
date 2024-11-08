  // FreelancerAvailabilitySettings.jsx
 "use client";
import React  from 'react';
import { Card, CardBody, Chip, Progress, Switch} from "@nextui-org/react";


 
  export const FreelancerAvailabilitySettings = () => (
    <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
      <CardBody className="p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Availability
          </h2>
          <p className="text-foreground/60">
            Manage your working hours and availability
          </p>
        </div>
  
        <div className="space-y-6">
          {/* Weekly Hours */}
          <div className="bg-content2 rounded-xl p-4">
            <h3 className="font-medium mb-4">Weekly Availability</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <DaySchedule
                  key={day}
                  day={day}
                  available={true}
                  hours="9:00 - 17:00"
                />
              ))}
            </div>
          </div>
  
          {/* Project Load */}
          <div className="bg-content2 rounded-xl p-4">
            <h3 className="font-medium mb-4">Current Project Load</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Projects</span>
                <Chip>3/5</Chip>
              </div>
              <Progress 
                value={60} 
                className="h-2"
                classNames={{
                  indicator: "bg-gradient-to-r from-pink-500 to-orange-500"
                }}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

   const DaySchedule = ({ day, available, hours }) => (
    <div className={`p-3 rounded-xl text-center ${available ? 'bg-primary/10' : 'bg-default-100'}`}>
      <div className="font-medium mb-1">{day}</div>
      <div className="text-xs text-default-500">{hours}</div>
      <Switch 
        size="sm"
        defaultSelected={available}
        classNames={{
          wrapper: "group-data-[selected=true]:bg-primary"
        }}
      />
    </div>
  );