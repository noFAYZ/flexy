"use client";
import { StarRating } from "@/components/rating";
import { Avatar, Badge, Tooltip } from "@nextui-org/react";
import {  BadgeCheck, MapPinIcon } from "lucide-react";


export const ProfileHeader = ({ user }) => (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full lg:w-auto">
      <div className="relative flex flex-col items-center sm:items-start">
        <Badge
          content="online"
          color="success"
          size="sm"
          placement="bottom-right"
          className="shadow"
        >
          <Avatar
            isBordered
            color="success"
            src="https://avatar.iran.liara.run/public"
            className="w-28 h-28 sm:w-36 sm:h-36 text-large"
          />
        </Badge>
      </div>
      <div className="flex flex-col justify-between mt-4 sm:mt-0 text-center sm:text-left">
        <div className="flex flex-col">
          <span className="flex gap-2 text-2xl sm:text-3xl font-medium align-baseline items-center justify-center sm:justify-start">
            {user.name}
            <Tooltip
              showArrow={true}
              content="ID verified"
              className="bg-orange-600 text-white rounded-full"
              placement={"top-start"}
            >
              <span className="bg-orange-600 rounded-full p-[1px]">
                <BadgeCheck className="p-0" stroke="background" />
              </span>
            </Tooltip>
          </span>
          <span className="text-sm font-medium text-gray-400 pb-2 pt-0">
            @{user.username}
          </span>
          <span className="text-md">{user.title}</span>
        </div>
        <div className="mt-2 flex flex-col items-center sm:items-start">
          <StarRating
                    isInteractive={false}
                    size={18}
                    initialRating={user.rating} onRatingChange={undefined}          />
          <span className="flex gap-1 align-baseline items-center text-sm mt-2">
            <MapPinIcon size={18} /> {user.location}
          </span>
        </div>
      </div>
    </div>
  );