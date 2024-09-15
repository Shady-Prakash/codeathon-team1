'use client';

import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import { getReportsData } from '../api/reports/reports';

const ReportsPage: React.FC = () => {
  const [reportData, setReportData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReportsData({ page: 1, pageSize: 10, filters: {} });
      setReportData(data.items);
    };

    fetchData();
  }, []);

  return (
    <div className='p-4'>
      <Dashboard />
      {/* Removed the export buttons and their handlers */}
    </div>
  );
};

export default ReportsPage;
