import React from 'react';
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
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

interface LineChartData {
  month: string;
  donations: number;
  refunds: number;
}

interface LineChartProps {
  data: LineChartData[];
}

export function LineChartComponent({ data }: LineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donations</CardTitle>
        <CardDescription>Report</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data}>
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
            <Line
              type='monotone'
              dataKey='donations'
              stroke={chartConfig.donations.color}
              dot={false}
            />
            <Line
              type='monotone'
              dataKey='refunds'
              stroke={chartConfig.refunds.color}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
