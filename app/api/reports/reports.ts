export const mockReportData = [
  {
    id: '1',
    campaign: 'Save the Rainforest',
    donor: 'Fitch',
    amount: 150,
    date: '2024-04-08',
    type: 'Donation',
    category: 'Environment',
  },
  {
    id: '2',
    campaign: 'Water for Everyone',
    donor: 'Alexander Ash',
    amount: 200,
    date: '2024-03-09',
    type: 'Donation',
    category: 'Humanitarian',
  },
  {
    id: '3',
    campaign: 'Education for All',
    donor: 'MUFG',
    amount: -50,
    date: '2024-02-10',
    type: 'Refund',
    category: 'Education',
  },
  {
    id: '4',
    campaign: 'Mental Health',
    donor: 'Expedia Group',
    amount: 2000,
    date: '2024-01-12',
    type: 'Refund',
    category: 'Health',
  },
];

// Mock function for fetching reports data
export const getReportsData = async ({
  page,
  pageSize,
  filters,
}: {
  page: number;
  pageSize: number;
  filters: any;
}) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Apply filters (if any)
  let filteredData = mockReportData;

  if (filters.campaign) {
    filteredData = filteredData.filter(
      (report) => report.campaign === filters.campaign
    );
  }
  if (filters.donor) {
    filteredData = filteredData.filter(
      (report) => report.donor === filters.donor
    );
  }
  if (filters.type) {
    filteredData = filteredData.filter(
      (report) => report.type === filters.type
    );
  }

  // Pagination logic
  const startIndex = (page - 1) * pageSize;
  const pagedData = filteredData.slice(startIndex, startIndex + pageSize);

  return {
    items: pagedData,
    totalPages: Math.ceil(filteredData.length / pageSize),
  };
};
