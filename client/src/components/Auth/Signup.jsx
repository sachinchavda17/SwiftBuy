import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import "./signup.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import Loading from "../shared/Loading";
import Cookies from "js-cookie";
import { Context } from "../../utils/context";

const SignupModal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (ndata) => {
    try {
      setLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_DEV_URL + "/api/auth/signup",
        ndata
      );

      if (response.data && response.data.error) {
        toast.error(response.data.error || "Signup failed");
        setLoading(false);
        return;
      }

      const { data } = response;
      setUser(data);

      // Save the token in a cookie
      Cookies.set("swiftbuyToken", data.token, { expires: 2 }); // Expires in 2 days

      localStorage.setItem("swiftbuyUser", JSON.stringify(data));
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      // console.error("Error in login", error.message);
      toast.error(error.response?.data?.error || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
        className="auth-content"
      >
        <h2 className="auth-title">
          <span>Sign Up</span>
        </h2>
        <div className="input-field">
          <label htmlFor="firstName">First Name </label>
          <input
            type="text"
            {...register("firstName", { required: "First Name is required" })}
            placeholder="John"
          />
          {errors.firstName && (
            <span className="error">{errors.firstName.message}</span>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name </label>
          <input
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
            placeholder="Doe"
          />
          {errors.lastName && (
            <span className="error">{errors.lastName.message}</span>
          )}
        </div>
        <div className="input-field gender-field">
          <label htmlFor="gender">Gender </label>
          <label>
            Male
            <input
              type="radio"
              name="gender"
              {...register("gender", { required: "Gender is required" })}
              value="Male"
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              {...register("gender", { required: "Gender is required" })}
              value="Female"
            />
          </label>
          {errors.gender && (
            <span className="error">{errors.gender.message}</span>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\b\w+@[\w.-]+\.\w{2,4}\b/gi,
                message: "Email not valid",
              },
            })}
            placeholder="johndoe@gmail.com"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="input-field">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="*********"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm Password </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            placeholder="*********"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <Loading /> : "Signup"}
        </button>
        <div className="nav-link">
          <span onClick={() => navigate("/login")}>
            Already have an account? <span>Login</span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignupModal;
