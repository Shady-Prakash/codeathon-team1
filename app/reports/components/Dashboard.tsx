import React, { useEffect, useState } from 'react';
import { DataTable } from './Table/DataTable';
import { columns } from './Table/columns';
import { getReportsData } from '../../api/reports/reports';
import { fetchPayPalData } from '../../api/paypal/paypal';
import { BarChartComponent } from './Charts/BarChart';
import { LineChartComponent } from './Charts/LineChart';

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [payPalData, setPayPalData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});

  const fetchData = async () => {
    const data = await getReportsData({ page: 1, pageSize: 10, filters }); // Fetch data for the first page
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
      {/* Data Table Component */}
      <DataTable columns={columns} data={reportData} />

      {/* Charts Section */}
      <div className='my-8'>
        {/* <h2 className='text-xl font-semibold mb-4'>Charts</h2> */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            {/* <h3 className='text-lg font-medium mb-2'>
              Bar Chart - Donations vs Refunds
            </h3> */}
            <BarChartComponent data={chartData} />
          </div>
          <div>
            {/* <h3 className='text-lg font-medium mb-2'>
              Line Chart - Donations & Refunds
            </h3> */}
            <LineChartComponent data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
