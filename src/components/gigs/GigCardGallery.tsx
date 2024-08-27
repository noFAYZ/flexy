import React from "react";
import GigCard from "./GigCard";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { CustomCheckbox } from "../ui/customCheckbox";
import { cn } from "@/lib/utils";
const list = [
  {
    title:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra sapien turpis rhoncus vehicula fermentum risus.",
    img: "https://picsum.photos/500/500",
    price: "$500.50",
  },
  {
    title:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra sapien turpis rhoncus vehicula fermentum risus.",
    img: "https://picsum.photos/500/500",
    price: "$3.00",
  },
  {
    title:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Lacus himenaeos natoque diam sed dolor tempor.",
    img: "https://picsum.photos/500/500",
    price: "$10.00",
  },
  {
    title: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
    img: "https://picsum.photos/500/500",
    price: "$50.30",
  },
  {
    title:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Parturient himenaeos eros; magna torquent est laoreet.",
    img: "https://picsum.photos/500/500",
    price: "$1500.70",
  },
  {
    title: "Lemon 2",
    img: "https://picsum.photos/500/500",
    price: "$800.00",
  },
  {
    title: "Banana",
    img: "https://picsum.photos/500/500",
    price: "$7.50",
  },
  {
    title: "Watermelon",
    img: "https://picsum.photos/500/500",
    price: "$102.20",
  },
  {
    title: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
    img: "https://picsum.photos/500/500",
    price: "$500.30",
  },
  {
    title:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Parturient himenaeos eros; magna torquent est laoreet.",
    img: "https://picsum.photos/500/500",
    price: "$150.70",
  },
];

const GigCardGallery = () => {
  const [groupSelected, setGroupSelected] = React.useState<Array<string>>([]);
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div>
      <div>
        <Popover placement="bottom" showArrow offset={10}>
          <PopoverTrigger>
            <Button
              variant="bordered"
              className="rounded-full border-1"
              endContent={<ChevronDown size={20} />}
            >
              Service Options
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            {(titleProps) => (
              <div className="px-1 py-2 w-full">
                <p
                  className="text-small font-bold text-foreground"
                  {...titleProps}
                >
                  Dimensions
                </p>
                <div className="mt-2 flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <CheckboxGroup
                      className="gap-1"
                      label="Select amenities"
                      orientation="horizontal"
                      value={groupSelected}
                      onChange={(i) => setGroupSelected(i)}
                    >
                      <CustomCheckbox value="wifi">Wifi</CustomCheckbox>
                      <CustomCheckbox value="tv">TV</CustomCheckbox>
                      <CustomCheckbox value="kitchen">Kitchen</CustomCheckbox>
                      <CustomCheckbox value="parking">Parking</CustomCheckbox>
                      <CustomCheckbox value="pool">Pool</CustomCheckbox>
                      <CustomCheckbox value="gym">Gym</CustomCheckbox>
                    </CheckboxGroup>
                    <p className="mt-4 ml-1 text-default-500">
                      Selected: {groupSelected.join(", ")}
                    </p>
                  </div>

                  <Checkbox
                    aria-label="{user.name}"
                    classNames={{
                      base: cn(
                        "inline-flex w-full max-w-md bg-content1",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                      label: "w-full",
                    }}
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                  >
                    <div className="w-full flex justify-between gap-2">
                      <div className="flex flex-col items-end gap-1">
                        <p>Websites</p>
                        <Chip color="success" size="sm" variant="flat">
                          Active
                        </Chip>
                      </div>
                    </div>
                  </Checkbox>

                  <RadioGroup
                    label="Select your favorite city"
                    color="secondary"
                    defaultValue="london"
                  >
                    <Radio value="buenos-aires">Buenos Aires</Radio>
                    <Radio value="sydney">Sydney</Radio>
                    <Radio value="san-francisco">San Francisco</Radio>
                    <Radio value="london">London</Radio>
                    <Radio value="tokyo">Tokyo</Radio>
                  </RadioGroup>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className="my-10 gap-8 grid  grid-cols-1 sm:grid-cols-4 ">
        {list.map((item, index) => (
          <GigCard item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default GigCardGallery;
