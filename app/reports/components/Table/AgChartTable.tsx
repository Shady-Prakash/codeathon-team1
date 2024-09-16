'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'; // Import AG Grid Enterprise for charting

interface IReport {
  id: string;
  campaign: string;
  donor: string;
  donorType: 'Company' | 'Individual';
  amount: number;
  date: string;
  type: string;
  category: string;
}

interface CellRendererProps extends ICellRendererParams {
  value: string;
}

// Mock data for local testing
const mockData: IReport[] = [
  {
    id: '1',
    campaign: 'Save the Rainforest',
    donor: 'Fitch',
    donorType: 'Company',
    amount: 150,
    date: '2024-04-08',
    type: 'Donation',
    category: 'Environment',
  },
  {
    id: '2',
    campaign: 'Water for Everyone',
    donor: 'Alexander Ash',
    donorType: 'Individual',
    amount: 200,
    date: '2024-03-09',
    type: 'Donation',
    category: 'Humanitarian',
  },
  {
    id: '3',
    campaign: 'Education for All',
    donor: 'MUFG',
    donorType: 'Company',
    amount: -50,
    date: '2024-02-10',
    type: 'Refund',
    category: 'Education',
  },
  {
    id: '4',
    campaign: 'Mental Health',
    donor: 'Expedia Group',
    donorType: 'Company',
    amount: 2000,
    date: '2024-01-12',
    type: 'Donation',
    category: 'Health',
  },
  {
    id: '5',
    campaign: 'Save the Oceans',
    donor: 'Oceanic Global',
    donorType: 'Company',
    amount: 500,
    date: '2024-05-15',
    type: 'Donation',
    category: 'Environment',
  },
  {
    id: '6',
    campaign: 'Women in Tech',
    donor: 'Tech For Good',
    donorType: 'Company',
    amount: 350,
    date: '2024-06-20',
    type: 'Donation',
    category: 'Education',
  },
  {
    id: '7',
    campaign: 'Fight Against Hunger',
    donor: 'Global Food Initiative',
    donorType: 'Company',
    amount: 100,
    date: '2024-07-22',
    type: 'Refund',
    category: 'Humanitarian',
  },
  {
    id: '8',
    campaign: 'Clean Water Project',
    donor: 'WaterAid',
    donorType: 'Company',
    amount: 300,
    date: '2024-08-02',
    type: 'Donation',
    category: 'Humanitarian',
  },
  {
    id: '9',
    campaign: 'Wildlife Conservation',
    donor: 'WWF',
    donorType: 'Company',
    amount: 600,
    date: '2024-09-05',
    type: 'Donation',
    category: 'Environment',
  },
  {
    id: '10',
    campaign: 'Cure Cancer Initiative',
    donor: 'Medical Research Fund',
    donorType: 'Company',
    amount: 1200,
    date: '2024-10-11',
    type: 'Donation',
    category: 'Health',
  },
  {
    id: '11',
    campaign: 'Solar Energy Project',
    donor: 'GreenTech',
    donorType: 'Company',
    amount: 800,
    date: '2024-11-01',
    type: 'Donation',
    category: 'Environment',
  },
  {
    id: '12',
    campaign: 'Youth Literacy Program',
    donor: 'Books for All',
    donorType: 'Company',
    amount: 450,
    date: '2024-12-05',
    type: 'Donation',
    category: 'Education',
  },
  {
    id: '13',
    campaign: 'Disaster Relief Fund',
    donor: 'Red Cross',
    donorType: 'Company',
    amount: 750,
    date: '2024-12-15',
    type: 'Donation',
    category: 'Humanitarian',
  },
  {
    id: '14',
    campaign: 'Animal Shelter Support',
    donor: 'Paws & Claws',
    donorType: 'Company',
    amount: 300,
    date: '2024-01-22',
    type: 'Donation',
    category: 'Environment',
  },
  {
    id: '15',
    campaign: 'Healthcare for Children',
    donor: 'Health First',
    donorType: 'Company',
    amount: 950,
    date: '2024-02-25',
    type: 'Donation',
    category: 'Health',
  },
];

const AgChartTable: React.FC = () => {
  const gridRef = useRef<AgGridReact<IReport>>(null);
  const [rowData, setRowData] = useState<IReport[]>([]);

  // mock data for testing
  useEffect(() => {
    setRowData(mockData);
  }, []);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      cellStyle: { color: 'rgb(3, 105, 161)' },
    }),
    []
  );

  const [columnDefs] = useState<ColDef<IReport>[]>([
    {
      headerName: 'Campaign',
      field: 'campaign',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Donor Name',
      field: 'donor',
      filter: 'agSetColumnFilter',
      cellRenderer: (params: ICellRendererParams) => <>{params.value}</>,
    },
    {
      headerName: 'Donor Type',
      field: 'donorType',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: ['Company', 'Individual'],
      },
    },
    {
      headerName: 'Amount',
      field: 'amount',
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Date',
      field: 'date',
      filter: 'agDateColumnFilter',
    },
    {
      headerName: 'Type',
      field: 'type',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Category',
      field: 'category',
      filter: 'agTextColumnFilter',
    },
  ]);

  const onChartClick = () => {
    if (gridRef.current) {
      const gridApi = gridRef.current.api;
      gridApi.createRangeChart({
        chartType: 'column',
        cellRange: {
          columns: ['campaign', 'amount'],
        },
        chartOptions: {
          title: {
            text: 'Donation Amount by Campaign',
          },
          series: [
            {
              xKey: 'campaign',
              yKey: 'amount',
              yName: 'Amount',
            },
          ],
        },
      });
    }
  };

  return (
    <div>
      <button
        onClick={onChartClick}
        style={{
          marginBottom: '10px',
          color: 'rgb(3, 105, 161)',
          backgroundColor: 'white',
          border: '1px solid rgb(3, 105, 161)',
          borderRadius: '8px',
          padding: '10px 20px',
          cursor: 'pointer',
          transition: 'background-color 0.3s, color 0.3s',
        }}>
        Generate Chart
      </button>
      <div
        className='ag-theme-alpine'
        style={{
          height: '600px',
          width: '100%',
          backgroundColor: 'rgb(241, 250, 254)',
        }}>
        <AgGridReact<IReport>
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          animateRows={true}
          enableCharts={true}
        />
      </div>
    </div>
  );
};

export default AgChartTable;
