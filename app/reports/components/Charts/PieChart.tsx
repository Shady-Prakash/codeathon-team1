import React from 'react';
import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts';
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
  payments: {
    label: 'Payments',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
}

export function PieChartComponent({ data }: PieChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pie Chart - Payment Types</CardTitle>
        <CardDescription>Distribution of Payment Types</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie
              data={data}
              dataKey='value'
              outerRadius={100}
              fill={chartConfig.payments.color}
              label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartConfig.payments.color} />
              ))}
            </Pie>
            <Tooltip
              content={<ChartTooltipContent indicator='dashed' />}
              cursor={false}
            />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
