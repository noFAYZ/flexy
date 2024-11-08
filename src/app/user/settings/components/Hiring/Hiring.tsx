"use client";
import React  from 'react';
import { Card, CardBody, Chip, Switch } from "@nextui-org/react";
import {
  Globe,
  Clock,
  Star,
  Code,
} from "lucide-react";
import { RangeSlider } from '@/components/RangeSlider';




export const ClientHiringSettings = () => (
    <Card className="bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50">
      <CardBody className="p-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Hiring Preferences
          </h2>
          <p className="text-foreground/60">
            Configure your hiring and talent screening preferences
          </p>
        </div>
  
        <div className="space-y-6">
          {/* Talent Requirements */}
          <div className="bg-content2 rounded-xl p-4">
            <h3 className="font-medium mb-4">Default Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PreferenceCard
                icon={<Code />}
                title="Skills Verification"
                description="Require verified skills"
                enabled={true}
              />
              <PreferenceCard
                icon={<Star />}
                title="Minimum Rating"
                description="4.5+ stars required"
                enabled={true}
              />
              <PreferenceCard
                icon={<Globe />}
                title="Location Preference"
                description="Remote worldwide"
                enabled={false}
              />
              <PreferenceCard
                icon={<Clock />}
                title="Response Time"
                description="Within 24 hours"
                enabled={true}
              />
            </div>
          </div>
  
          {/* Budget Settings */}
          <div className="bg-content2 rounded-xl p-4">
            <h3 className="font-medium mb-4">Budget Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BudgetPreference
                type="Hourly Rate"
                range="$30 - $60"
                currency="USD"
              />
              <BudgetPreference
                type="Fixed Price"
                range="$1,000 - $5,000"
                currency="USD"
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

    
   const PreferenceCard = ({ icon, title, description, enabled }) => (
    <Card className="bg-default-50">
      <CardBody className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              {React.cloneElement(icon, { size: 20, className: "text-primary" })}
            </div>
            <div>
              <h4 className="font-medium">{title}</h4>
              <p className="text-sm text-default-500">{description}</p>
            </div>
          </div>
          <Switch defaultSelected={enabled} />
        </div>
      </CardBody>
    </Card>
  );
  
   const BudgetPreference = ({ type, range, currency }) => (
    <Card className="bg-default-50">
      <CardBody className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{type}</span>
          <Chip size="sm" variant="flat">{currency}</Chip>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-default-500">
            <span>Range</span>
            <span>{range}</span>
          </div>
          <RangeSlider
                      defaultValue={[30, 60]}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full" onChange={undefined}          />
        </div>
      </CardBody>
    </Card>
  );