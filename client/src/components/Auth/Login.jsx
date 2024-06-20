import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import "./signup.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../utils/context";
import Loading from "../shared/Loading";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["swiftbuyToken"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setUser } = useContext(Context);

  const onSubmit = async (ndata) => {
    try {
      setLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_DEV_URL + "/api/auth/login",
        ndata
      );

      if (response.data && response.data.error) {
        toast.error(response.data.error || "Login failed");
        setLoading(false);
        return;
      }

      const { data } = response;

      const token = data.token;
      const date = new Date();
      date.setDate(date.getDate() + 10 * 60 * 60 * 1000);

      setUser(data.user);
      toast.success("Login successful!");
      setTimeout(() => {
        localStorage.setItem("swiftbuyUser", JSON.stringify(data));
        setCookie("swiftbuyToken", token, { path: "/", expires: date });
        window.location.reload();
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error in login", error.message);
      toast.error(error.response?.data?.error || "Login failed!");
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
          // reset();
        })}
        className="auth-content"
      >
        <h2 className="auth-title">
          <span>Log In</span>
        </h2>
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

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <Loading /> : "Login"}
        </button>
        <div className="nav-link top-0">
          <span onClick={() => navigate("/signup")}>
            Don't have an account? <span>Signup</span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
