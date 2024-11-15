import { Card, CardHeader, Chip } from "@nextui-org/react";

import { Milestone, Timer, Wallet } from "lucide-react";

import { CardTitle } from "@/components/ui/card";

const Milestones = () => {
  return (
    <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex flex-wrap  gap-4 justify-between sm:gap-0">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <Milestone size={22} className="text-primary mr-2" />
          Project Milestones{" "}
        </CardTitle>
      </CardHeader>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          {[1, 2, 3].map((milestone) => (
            <Card
              key={milestone}
              className="bg-background shadow-none p-4 rounded-3xl border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Milestone className="w-4 h-4 text-blue-500" />
                    </div>
                    <h4 className="font-medium">Phase {milestone}</h4>
                  </div>
                  <p className="text-sm text-default-500">
                    Smart Contract Development & Testing
                  </p>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-sm text-default-500">
                      <Timer className="w-4 h-4" />
                      <span>2 weeks</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-default-500">
                      <Wallet className="w-4 h-4" />
                      <span>$5,000</span>
                    </div>
                  </div>
                </div>
                <Chip className="bg-orange-500/10 text-orange-500">
                  33% of total
                </Chip>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Milestones;
