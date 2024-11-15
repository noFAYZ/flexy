
import { Card, CardHeader } from "@nextui-org/react";

import { Code2, GitBranch } from "lucide-react";

import { HugeiconsNoteDone } from "@/components/icons/icons";
import { CardTitle } from "@/components/ui/card";

const TechnicalStack = () => {
  return (
    <Card className="mb-6 bg-background shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 flex flex-wrap  gap-4 justify-between sm:gap-0">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <HugeiconsNoteDone size={22} className="text-primary mr-2" />
          Technical Requirements
        </CardTitle>
      </CardHeader>
      <div className="p-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Frontend Stack */}
          <Card className="bg-background shadow-none p-4 rounded-3xl border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <Code2 className="w-4 h-4 text-pink-500" />
                </div>
                <h3 className="font-medium">Frontend Stack</h3>
              </div>
              <ul className="space-y-2 text-sm text-default-500">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-500" />
                  Next.js 14 with App Router
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-500" />
                  TailwindCSS & NextUI
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-500" />
                  Ethers.js / Web3.js
                </li>
              </ul>
            </div>
          </Card>

          {/* Backend Stack */}
          <Card className="bg-background shadow-none p-4 rounded-3xl border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <GitBranch className="w-4 h-4 text-orange-500" />
                </div>
                <h3 className="font-medium">Backend Stack</h3>
              </div>
              <ul className="space-y-2 text-sm text-default-500">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-orange-500" />
                  Solidity Smart Contracts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-orange-500" />
                  Hardhat/Truffle
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-orange-500" />
                  IPFS/Arweave Storage
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default TechnicalStack;
