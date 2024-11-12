import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  className?: string;
  title?: string;
  children: React.ReactNode;
}

export const BentoCard = ({ className, title, children }: BentoCardProps) => {
  return (
    <Card 
      className={cn(
        "bg-background/60 shadow-none rounded-[2.5rem] border-medium border-default bg-gradient-to-br from-background to-muted/50 overflow-hidden hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      {title && (
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>
      )}
      <CardBody className="p-6 gap-4">
        {children}
      </CardBody>
    </Card>
  );
}; 