// src/components/CashInApproval.js
import React, { useState, useEffect } from 'react';

const CashInApproval = () => {
  const [requests, setRequests] = useState([]);
const axiosInstance = useAxiosPublic()
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get('/transactions/cashin/pending');
        setRequests(response.data.requests);
      } catch (error) {
        toast.error(`Failed to fetch requests: ${error.response.data.message}`);
      }
    };

    fetchRequests();
  }, []);

  const handleApproveRequest = async (requestId) => {
    try {
      const response = await axiosInstance.patch(`/transactions/cash-in/approve/${requestId}`, {
        agentEmail: localStorage.getItem('userEmail'), // Agent email from local storage or context
      });
      toast.success('Cash-in request approved successfully!');
      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      toast.error(`Failed to approve request: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <h2>Cash-In Approval</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request._id}>
              {request.userEmail} requests {request.amount} Taka
              <button onClick={() => handleApproveRequest(request._id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CashInApproval;
