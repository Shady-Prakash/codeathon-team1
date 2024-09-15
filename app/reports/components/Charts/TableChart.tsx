import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableChartProps {
  data: Array<{
    campaign: string;
    amount: string | number;
    date: string;
  }>;
}

const TableChart: React.FC<TableChartProps> = ({ data }) => {
  return (
    <Table>
      <TableCaption>
        A list of recent campaigns with their amounts and dates.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className='font-medium'>{item.campaign}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{item.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableChart;
