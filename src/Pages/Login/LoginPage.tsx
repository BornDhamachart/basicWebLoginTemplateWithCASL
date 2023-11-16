import { useEffect, useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { useAuth } from "../../Context/AuthContext";
import { LoginData } from "../../Interface/Auth.interface";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const { handleLogin } = useAuth();

  const onSubmitForm = (data: LoginData) => {
    setLoginData((prevState : any) => ({
      ...prevState,
      email: data.username,
      password: data.password,
    }));
  }

  useEffect(() => {
    if(loginData !== null) {
    console.log("loginData", loginData);
    handleLogin(loginData);
    }
  }, [loginData]);

  return (
    <>
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
    </>
  );
};

export default LoginPage;
