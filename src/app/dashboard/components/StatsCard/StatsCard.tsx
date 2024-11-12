import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

// StatsCard Component
export const StatsCard = ({
    title,
    value,
    trend,
    trendLabel,
    icon: Icon,
    color,
    background,
  }) => {
    return (
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        <Card className="p-4 rounded-[2.5rem]">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div
                className={`w-12 h-12 rounded-lg ${background} flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${color}`} height={22} />
              </div>
              <div>
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-sm text-default-500">{title}</p>
              </div>
            </div>
            <div className="flex items-start gap-1 text-green-500">
              <TrendingUp className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="text-xs font-medium">{trend}</span>
                <span className="text-xs text-default-400">{trendLabel}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };