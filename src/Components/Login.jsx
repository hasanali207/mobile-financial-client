import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (token) {
      axiosPublic.get('/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUser(res.data.userData);
      })
      .catch((error) => {
        localStorage.removeItem('access-token');
        setUser(null);
      });
    }
  }, [axiosPublic]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post('/login', data);

      if (res.data.token) {
        localStorage.setItem('access-token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user)); // Ensure user data is a string
        setUser(res.data.user);
        toast.success("Login successful!");
        navigate('/dashboard'); // Navigate after setting the user
      } else {
        toast.error("Login failed: User not found or invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

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
                  type="text"
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
