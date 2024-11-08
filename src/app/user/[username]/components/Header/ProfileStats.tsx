
import { Card, CardBody } from "@nextui-org/react";
import ProfileBadges from "./ProfileBadges";
import { MingcuteExchangeDollarLine } from "@/components/icons/icons";


export const ProfileStats = ({ user }) => (
    <div className="flex flex-col  items-center gap-1 sm:gap-2 md:gap-4 w-full lg:w-auto">
      <ProfileBadges />
  
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
  );
  
 const Stat = ({ value, label }) => (
    <div className="flex items-center">
      <div>
        <div className="font-semibold">{value}</div>
        <div className="text-xs">{label}</div>
      </div>
    </div>
  );