// src/components/CashInRequest.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const CashInRequest = () => {
  
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosInstance = useAxiosPublic();
  
    // Parse user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const senderEmail = userData?.email;
    const status = 'pending'    
    const onSubmit = async (data) => {
      // Add senderEmail to data
      const requestData = { ...data, senderEmail, status };
      console.log(requestData);
      try {
        const res = await axiosInstance.post('/transaction/cashin', requestData);
        toast.success("Cash In Request Send successful!");
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.data && error.response.data.message) {
            toast.error('Send Money failed: ' + error.response.data.message);
          } else {
            toast.error('Send Money failed: An unexpected error occurred.');
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast.error('Send Money failed: No response from server.');
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error('Send Money failed: ' + error.message);
        }
      }
    
  
    };


  return (
    <div>
      <h2>Cash-In Request</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body">
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("recipientEmail", { required: true })}
            />
            {errors.recipientEmail && (
              <span className="text-red-500">Recipient Email is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              type="number" // Assuming amount should be a number
              placeholder="Amount"
              className="input input-bordered"
              {...register("amount", { required: true, min: 50 })}
            />
            {errors.amount && (
              <span className="text-red-500">Amount is required (Minimum 50 taka)</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">PIN</span>
            </label>
            <input
              type="password"
              placeholder="PIN"
              className="input input-bordered"
              {...register("PIN", { required: true })}
            />
            {errors.PIN && (
              <span className="text-red-500">PIN is required</span>
            )}
          </div>
          <div className="form-control mt-6 p-0">
            <button type="submit" className="btn btn-neutral">Send Money</button>
          </div>
        
        </div>
      </form>



    </div>
  );
};

export default CashInRequest;
