import React, { useEffect, useState } from 'react';
import { columns } from './Table/columns';
import { getReportsData } from '../../api/reports/reports';
import { fetchPayPalData } from '../../api/paypal/paypal';
// import { BarChartComponent } from './Charts/BarChart';
// import { LineChartComponent } from './Charts/LineChart';
import AgChartTable from './Table/AgChartTable';

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [payPalData, setPayPalData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});

  const fetchData = async () => {
    const data = await getReportsData({ page: 1, pageSize: 10, filters });
    setReportData(data.items);

    const payPalData = await fetchPayPalData();
    setPayPalData(payPalData);

    // Prepare data for charts
    const chartData = data.items.map((item: any) => ({
      month: item.date.slice(0, 7),
      donations: item.type === 'Donation' ? item.amount : 0,
      refunds: item.type === 'Refund' ? item.amount : 0,
    }));

    setChartData(chartData);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <div className='p-4'>
      <AgChartTable />
      <div className='my-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'></div>
      </div>
    </div>
  );
};

export default Dashboard;
