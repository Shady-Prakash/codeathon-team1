import React, { useState } from 'react';
import { mockReportData } from '../../api/reports/reports';
import TableChart from './Charts/TableChart';

interface ReportFiltersProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  setFilters,
}) => {
  const [campaign, setCampaign] = useState(filters.campaign || '');
  const [donor, setDonor] = useState(filters.donor || '');
  const [type, setType] = useState(filters.type || '');
  const [chartView, setChartView] = useState(filters.chartView || 'Table');

  // Extract unique campaigns and donors from the mock data
  const uniqueCampaigns = Array.from(
    new Set(mockReportData.map((item) => item.campaign))
  );
  const uniqueDonors = Array.from(
    new Set(mockReportData.map((item) => item.donor))
  );

  const handleFilterChange = () => {
    setFilters({ campaign, donor, type, chartView });
  };

  // Filter the data based on selected filters
  const filteredData = mockReportData.filter((item) => {
    return (
      (!campaign || item.campaign === campaign) &&
      (!donor || item.donor === donor) &&
      (!type || item.type === type)
    );
  });

  return (
    <div className='my-4'>
      <h2 className='text-xl font-semibold mb-4'>Filters</h2>
      <form>
        <label
          htmlFor='campaign'
          className='block text-sm font-medium text-gray-700'>
          Campaign
        </label>
        <select
          id='campaign'
          value={campaign}
          onChange={(e) => setCampaign(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'>
          <option value=''>All Campaigns</option>
          {uniqueCampaigns.map((camp) => (
            <option key={camp} value={camp}>
              {camp}
            </option>
          ))}
        </select>
        <label
          htmlFor='donor'
          className='block text-sm font-medium text-gray-700 mt-4'>
          Donor
        </label>
        <select
          id='donor'
          value={donor}
          onChange={(e) => setDonor(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'>
          <option value=''>All Donors</option>
          {uniqueDonors.map((donorName) => (
            <option key={donorName} value={donorName}>
              {donorName}
            </option>
          ))}
        </select>
        <label
          htmlFor='type'
          className='block text-sm font-medium text-gray-700 mt-4'>
          Type
        </label>
        <select
          id='type'
          value={type}
          onChange={(e) => setType(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'>
          <option value=''>All Types</option>
          <option value='Donation'>Donation</option>
          <option value='Refund'>Refund</option>
        </select>
        <label
          htmlFor='chartView'
          className='block text-sm font-medium text-gray-700 mt-4'>
          Chart View
        </label>
        <select
          id='chartView'
          value={chartView}
          onChange={(e) => setChartView(e.target.value)}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'>
          <option value='Table'>Table</option>
          <option value='Bar Chart'>Bar Chart</option>
          <option value='Pie Chart'>Pie Chart</option>
          <option value='Line Chart'>Line Chart</option>
        </select>
        <button
          type='button'
          onClick={handleFilterChange}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
          Apply Filters
        </button>
      </form>
      {chartView === 'Table' && <TableChart data={filteredData} />}
    </div>
  );
};

export default ReportFilters;
