import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const from = "/";

  const axiosInstance = useAxiosPublic();

  const onSubmit = async (data) => {
    const { email, PIN, fullName, number } = data;
    

    console.log("Password:", PIN); // Log the password to debug
    if (!/^\d{5}$/.test(PIN)) {
      toast.error("Password must be a 5-digit number");
      return;
    }

    try {
      const res = await axiosInstance.post('/users', data);
      if (res.data.insertedId) {
        toast.success("Registration successful!");
        navigate(from, { replace: true });
      }
    } catch (error) {
        toast.error('Registration failed: ' + error.message);
    }
  }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
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
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="input input-bordered"
                    {...register("fullName", { required: true })}
                  />
                  {errors.fullName && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
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
                    type="number"
                    placeholder="number"
                    className="input input-bordered"
                    {...register("number", { required: true })}
                  />
                  {errors.email && (
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
                  <button className="btn btn-neutral">Register</button>
                </div>
                <label className="label">
                  Have an account?{" "}
                  <Link to="/login" className="label-text-alt link link-hover">
                    Please Login
                  </Link>
                </label>
              </div>
            </form>
            <div className="divider">OR</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
