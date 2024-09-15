import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  donations: {
    label: 'Donations',
    color: 'hsl(var(--chart-1))',
  },
  refunds: {
    label: 'Refunds',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface BarChartData {
  month: string;
  donations: number;
  refunds: number;
}

interface BarChartProps {
  data: BarChartData[];
}

export function BarChartComponent({ data }: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Donations vs Refunds</CardTitle>
        <CardDescription>Monthly Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip
              content={<ChartTooltipContent indicator='dashed' />}
              cursor={false}
            />
            <Bar
              dataKey='donations'
              fill={chartConfig.donations.color}
              radius={4}
            />
            <Bar
              dataKey='refunds'
              fill={chartConfig.refunds.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
