import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);

      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <h1 className="text-2xl text-white">
            Online Quiz Portal - <span className="secondd-word">REGISTER</span>
            <i class="ri-user-add-line"></i>
          </h1>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item
              name="name"
              label={<label style={{ color: "white" }}>Name</label>}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              name="email"
              label={<label style={{ color: "white" }}>E-mail</label>}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              name="password"
              label={<label style={{ color: "white" }}>Password</label>}
            >
              <input type="password" />
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="buttonn contained-btn mt-2 w-100"
              >
                Register
              </button>
              <Link to="/login" className="underline text-white">
                Already a member? <span className="secondd-word">Login</span>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
