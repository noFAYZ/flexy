import { CardTitle } from "@/components/ui/card";
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import { LanguagesIcon } from "lucide-react";

export  const LanguageesCard = ({ languages }) => (
    <Card className="bg-accent shadow backdrop-blur-0 rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-center">
          <LanguagesIcon size={22} className="text-primary mr-2" />
          Languages
        </CardTitle>
      </CardHeader>
      <CardBody className="p-4">
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <Chip
              key={index}
              className="bg-gradient-to-r from-pink-500/10 to-orange-500/10"
            >
              {lang}
            </Chip>
          ))}
        </div>
      </CardBody>
    </Card>
  );