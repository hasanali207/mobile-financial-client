import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const from = "/";

  const axiosInstance = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axiosInstance.post('/login', data);

      if (res.data.user) {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      } else {
        toast.error("Login failed: User not found or invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mobile Number</span>
                </label>
                <input
                  type="text" // Assuming number can include non-numeric characters
                  placeholder="number"
                  className="input input-bordered"
                  {...register("number", { required: true })}
                />
                {errors.number && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PIN</span>
                </label>
                <input
                  type="text"
                  placeholder="PIN"
                  className="input input-bordered"
                  {...register("PIN", { required: true })}
                />
                {errors.PIN && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control mt-6 p-0">
                <button type="submit" className="btn btn-neutral">Login</button>
              </div>
              <label className="label">
                Don't have an account?{" "}
                <Link to="/register" className="label-text-alt link link-hover">
                  Register here
                </Link>
              </label>
            </div>
          </form>
          <div className="divider">OR</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
