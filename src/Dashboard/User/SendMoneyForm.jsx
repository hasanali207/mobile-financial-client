import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SendMoneyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosInstance = useAxiosPublic();

  // Parse user data from local storage
  const userData = JSON.parse(localStorage.getItem('user'));
  const senderEmail = userData?.email;

  const onSubmit = async (data) => {
    // Add senderEmail to data
    const requestData = { ...data, senderEmail };
    console.log(requestData);

    try {
      const res = await axiosInstance.post('/transactions/send', requestData);
      if (res.data.message === 'Transaction successful') {
        toast.success("Send Money successful!");
      }
    } catch (error) {
      toast.error('Send Money failed: ' + error.message);
    }
  };

  return (
    <>
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
    </>
  );
};

export default SendMoneyForm;
