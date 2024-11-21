import { Button, Card, CardBody } from "@nextui-org/react";
import ProfileBadges from "./ProfileBadges";
import {
  MageMessageDotsRound,
  MingcuteExchangeDollarLine,
} from "@/components/icons/icons";
import { MessageSquare, UserPlus, UserPlus2Icon } from "lucide-react";

export const ProfileStats = ({ user }) => (
  <div className="flex flex-col  items-center gap-1 sm:gap-2 md:gap-4 w-full lg:w-auto">
    <ProfileBadges />

    <div className="flex gap-2 sm:w-full py-2 flex-wrap justify-center sm:justify-end">
      <Button
        className="flex-1 sm:flex-none bg-secondary text-white
                    shadow-lg hover:shadow-orange-500/25 transition-all duration-300 rounded-2xl"
        startContent={<MageMessageDotsRound width={22} height={22} />}
      >
        Message
      </Button>
      <Button
        className="flex-1 sm:flex-none bg-gradient-to-r from-orange-500 to-pink-500 text-white
                    shadow-lg hover:shadow-orange-500/25 transition-all duration-300 rounded-2xl"
        variant="flat"
        startContent={<UserPlus2Icon size={20} />}
      >
        Connect
      </Button>
    </div>

    <div className="flex gap-2">
      <Card className="flex flex-row mb-6 w-fit px-4 bg-gradient-to-tl from-pink-500 to-orange-500 text-white shadow backdrop-blur-0 rounded-[2.5rem] items-center content-center justify-center align-middle">
        <CardBody>
          <div className="flex gap-1 md:gap2 lg:gap-4 items-center  py-2 ">
            <div
              className="flex flex-row  w-fit items-center shadow-lg  align-middle bg-card text-foreground/80 px-1 py-1 md:px-2 
             md:py-2 rounded-full gap-1"
            >
              <MingcuteExchangeDollarLine
                fill={"lime-500"}
                height={24}
                className="text-semibold"
              />
              <span className="font-semibold">${user.hourlyRate}.00/hr</span>
            </div>
            <div className="flex gap-4 sm:gap-5 md:gap-6">
              {" "}
              <Stat value={"$2k"} label="Earned" />
              <Stat value={user.projectsCompleted} label="Projects" />
              <Stat value={`${user.hoursWorked}`} label="Hours" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="flex items-center">
    <div>
      <div className="font-semibold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  </div>
);
