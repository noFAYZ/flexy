import React from "react";
import { Card, Button, Input, Chip, Avatar } from "@nextui-org/react";
import { Search, Filter, Briefcase, DollarSign, Clock, MapPin } from "lucide-react";

interface JobsTabProps {
  jobs: any[];
}

export const JobsTab = ({ jobs }: JobsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Find Work</h2>
          <p className="text-default-500">Discover projects that match your skills</p>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search projects..."
            startContent={<Search className="w-4 h-4 text-default-400" />}
            className="flex-1"
          />
          <Button
            variant="flat"
            startContent={<Filter className="w-4 h-4" />}
          >
            Filters
          </Button>
        </div>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <div className="flex items-center gap-2 text-default-500">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.category}</span>
                    <span>•</span>
                    <span>Posted 2 days ago</span>
                  </div>
                </div>
                <p className="text-default-600 line-clamp-2">
                  {job.description || "Looking for an experienced developer to help with our blockchain project..."}
                </p>
                <div className="flex gap-2">
                  {["Smart Contracts", "Solidity", "Web3.js"].map((skill) => (
                    <Chip key={skill} size="sm" variant="flat">
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>
              <Button color="primary">Apply Now</Button>
            </div>
            <div className="mt-4 pt-4 border-t border-default-200">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-default-500" />
                  <span>${job.budget.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-default-500" />
                  <span>{job.timeline.endDate ? "Fixed Term" : "Ongoing"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-default-500" />
                  <span>Remote</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}; 