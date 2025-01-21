
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Wallet, BarChart3, Users } from "lucide-react";

export const RightSidebar = () => {
  return (
    <div className="w-[320px] h-screen p-4 border-l border-gray-200 overflow-y-auto">
      <div className="space-y-4">
        {/* Notifications Section */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Notifications</h3>
              <Bell className="w-4 h-4 text-orange-500" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`/api/placeholder/${100 + i}/100`} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">New job matching your skills: React Developer needed...</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <Wallet className="w-5 h-5 text-orange-500 mb-2" />
              <h4 className="text-sm font-medium">Balance</h4>
              <p className="text-2xl font-bold">$2,450</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <BarChart3 className="w-5 h-5 text-orange-500 mb-2" />
              <h4 className="text-sm font-medium">Proposals</h4>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
        </div>

        {/* Online Freelancers */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Online Freelancers</h3>
              <Users className="w-4 h-4 text-orange-500" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`/api/placeholder/${120 + i}/100`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Message
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

