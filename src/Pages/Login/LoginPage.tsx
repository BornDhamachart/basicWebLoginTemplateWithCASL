import { useEffect, useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loginData, setLoginData] = useState<FormValue>();

  const navigate = useNavigate();

  interface FormValue {
    username: string;
    password: string;
  }
  const onSubmitForm = (data: FormValue) => {
    setLoginData((prevState) => ({
      ...prevState,
      username: data.username,
      password: data.password,
    }));
  };

  const submitLogin = () => {
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: ``,
        headers: {
          "Content-Type": "application/json",
        },
      data: loginData,
    })
      .then((res) => {
        console.log("Login response", res.data);
        if(res.data.status === "ok" ) {
            //Save token to local storage
            localStorage.setItem("token", res.data.token);
            //Redirect to some path
            navigate('/');
        }
      })
      .catch((error) => {
        console.log("API Error", error);
      });
  };

  useEffect(() => {
    console.log("loginData", loginData);
    // submitLogin();
  }, [loginData]);

  return (
    <div className="w-full flex justify-center items-center mt-20">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onSubmitForm}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
