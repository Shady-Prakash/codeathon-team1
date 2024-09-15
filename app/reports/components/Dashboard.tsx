import React, { useEffect, useState } from 'react';
import ReportFilters from './ReportFilters';
import TableChart from './Charts/TableChart'; // Import the new TableChart component
import { BarChartComponent } from './Charts/BarChart';
import { LineChartComponent } from './Charts/LineChart';
import { PieChartComponent } from './Charts/PieChart';
import { getReportsData } from '../../api/reports/reports';
import { fetchPayPalData } from '../../api/paypal/paypal';

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [payPalData, setPayPalData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  const fetchData = async () => {
    const data = await getReportsData({ page: currentPage, pageSize, filters });
    setReportData(data.items);
    setTotalPages(data.totalPages);

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
  }, [currentPage, filters]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='p-4'>
      <ReportFilters filters={filters} setFilters={setFilters} />
      <TableChart data={reportData} />{' '}
      {/* Replace ReportTable with TableChart */}
      <div className='my-8'>
        <h2 className='text-xl font-semibold mb-4'>Charts</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h3 className='text-lg font-medium mb-2'>
              Bar Chart - Donations vs Refunds
            </h3>
            <BarChartComponent data={chartData} />
          </div>
          <div>
            <h3 className='text-lg font-medium mb-2'>
              Line Chart - Donations & Refunds
            </h3>
            <LineChartComponent data={chartData} />
          </div>
          <div>
            <h3 className='text-lg font-medium mb-2'>
              Pie Chart - Payment Types
            </h3>
            <PieChartComponent data={payPalData} />
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-300 text-black rounded'>
          Previous
        </button>
        <span className='text-lg'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-gray-300 text-black rounded'>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
