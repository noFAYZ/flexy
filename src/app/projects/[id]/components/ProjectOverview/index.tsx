
import { Card } from "@nextui-org/react";

import { CheckCircle2, ListChecks } from "lucide-react";

const ProjectOverview = () => {
  return (
    <Card className=" mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
              Project Overview
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-default-500 leading-relaxed">
            We're building a revolutionary NFT marketplace that will transform
            how digital assets are traded. The platform will feature:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success-500" />
                Key Features
              </h3>
              <ul className="space-y-2 text-default-500">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
                  <span>Smart contract-based NFT minting</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
                  <span>Multi-chain support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
                  <span>Advanced trading features</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-pink-500" />
                Requirements
              </h3>
              <ul className="space-y-2 text-default-500">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
                  <span>5+ years Web3 experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
                  <span>Smart contract development</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
                  <span>UI/UX expertise</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectOverview;
