"use client"

import React from "react";
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear area chart"
const chartData = [
  { month: "January", desktop: 186, mobile: 80, other: 45 },
  { month: "February", desktop: 305, mobile: 200, other: 100 },
  { month: "March", desktop: 237, mobile: 120, other: 150 },
  { month: "April", desktop: 73, mobile: 190, other: 50 },
  { month: "May", desktop: 209, mobile: 130, other: 100 },
  { month: "June", desktop: 214, mobile: 140, other: 160 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export default function LineChart() {
  return (
    <Card className="w-full h-full rounded-[3rem] bg-[#1f1f1f] dark:bg-[#222222]! border-none shadow p-0">
      <CardHeader>
        <CardTitle>Monthly Traffic</CardTitle>
        <CardDescription>Traffic breakdown by device type</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                 
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                dataKey="other"
                type="monotone"
                stackId="1"
                stroke={chartConfig.other.color}
                fill={chartConfig.other.color}
                fillOpacity={0.1}
              />
              <Area
                dataKey="mobile"
                type="monotone"
                stackId="1"
                stroke={chartConfig.mobile.color}
                fill={chartConfig.mobile.color}
                fillOpacity={0.4}
              />
              <Area
                dataKey="desktop"
                type="monotone"
                stackId="1"
                stroke={chartConfig.desktop.color}
                fill={chartConfig.desktop.color}
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-center">
          <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">+20.1% from last month</span>
        </div>
      </CardFooter>
    </Card>
  )
}