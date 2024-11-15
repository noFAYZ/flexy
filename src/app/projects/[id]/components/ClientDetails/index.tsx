import { Button, Card, Divider, User } from "@nextui-org/react";
import { ArrowUpRight } from "lucide-react";

import { Building2, ShieldCheck } from "lucide-react";

const ClientDetails = () => {
  return (
    <Card className="bg-default/40 backdrop-blur-xl border border-default-200 rounded-[2rem] sticky top-4">
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-500" />
          About the Client
        </h2>

        <div className="space-y-4">
          <User
            name="Web3 Innovations Ltd"
            description={
              <div className="flex items-center gap-1 text-success-500">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-xs">Verified Client</span>
              </div>
            }
            avatarProps={{
              src: "https://example.com/avatar.jpg",
              className: "w-12 h-12 text-large border-2 border-orange-500/20",
            }}
          />

          <Divider className="bg-default-200/50" />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-default-500">Member since</p>
              <p className="font-medium">March 2022</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-default-500">Total Spent</p>
              <p className="font-medium">$425,000</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-default-500">Projects Posted</p>
              <p className="font-medium">34</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-default-500">Hire Rate</p>
              <p className="font-medium">89%</p>
            </div>
          </div>

          <Button
            className="w-full bg-default-100 hover:bg-default-200"
            variant="flat"
            endContent={<ArrowUpRight className="w-4 h-4" />}
          >
            View Full Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ClientDetails;
