import React from "react";
import { Card, Button, Progress, Badge, Avatar, Chip } from "@nextui-org/react";
import { Clock, DollarSign, Calendar, CheckCircle2 } from "lucide-react";

interface WorkTabProps {
  projects: any[];
}

export const WorkTab = ({ projects }: WorkTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">My Work</h2>
          <p className="text-default-500">Manage your active contracts and deliverables</p>
        </div>
        <Button 
          className="bg-primary text-white"
          startContent={<Calendar className="w-4 h-4" />}
        >
          View Schedule
        </Button>
      </div>

      {/* Active Contracts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Contracts</h3>
        <div className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="border border-default-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-default-500">{project.category}</p>
                </div>
                <Chip color="success" variant="flat">
                  ${project.budget.amount}/month
                </Chip>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-default-500" />
                    <span className="text-sm">
                      {new Date(project.timeline.startDate).toLocaleDateString()} - 
                      {new Date(project.timeline.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-default-500" />
                    <span className="text-sm">
                      ${project.budget.spent} earned
                    </span>
                  </div>
                </div>
                <Progress 
                  value={project.timeline.progress} 
                  className="h-2"
                  color="success"
                />
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {project.team.map((member) => (
                      <Avatar 
                        key={member.id}
                        src={member.avatar}
                        size="sm"
                        className="border-2 border-background"
                      />
                    ))}
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Milestones */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Milestones</h3>
        <div className="space-y-3">
          {projects[0].milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between p-3 rounded-lg bg-default-50">
              <div className="flex items-center gap-3">
                <CheckCircle2 
                  className={`w-5 h-5 ${milestone.completed ? 'text-success' : 'text-default-400'}`} 
                />
                <span>{milestone.title}</span>
              </div>
              <Chip size="sm" variant="flat" color={milestone.completed ? "success" : "default"}>
                {milestone.completed ? "Completed" : "Pending"}
              </Chip>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}; 