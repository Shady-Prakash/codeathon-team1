export const mockPayPalData = [
  {
    id: 'txn001',
    transactionType: 'Sale',
    amount: 120,
    date: '2024-08-15',
    status: 'Completed',
  },
  {
    id: 'txn002',
    transactionType: 'Sale',
    amount: 200,
    date: '2024-08-18',
    status: 'Completed',
  },
  {
    id: 'txn003',
    transactionType: 'Refund',
    amount: -50,
    date: '2024-08-22',
    status: 'Completed',
  },
];

// Mock function for fetching PayPal data
export const fetchPayPalData = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockPayPalData;
};
