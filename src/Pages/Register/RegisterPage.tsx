import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { RegisterData } from "../../Interface/Auth.interface";
import { useAuth } from "../../Context/AuthContext";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState<RegisterData | null>(null);
  const { handleRegister } = useAuth();

  const onSubmitForm = (data: RegisterData) => {
    setRegisterData((prevState) => ({
      ...prevState,
      email: data.email,
      password: data.password,
      fname: data.fname,
      lname: data.lname,
    }));
  };

  useEffect(() => {
    if(registerData !== null) {
    console.log("registerData", registerData);
    handleRegister(registerData);
    }
  }, [registerData]);

  return (
    <div className="w-full flex justify-center items-center mt-20">
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        // style={{ maxWidth: 600 }}
        onFinish={onSubmitForm}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="First name"
          name="fname"
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lname"
          rules={[
            {
              required: true,
              message: "Please enter your last name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="tw-flex tw-justify-end tw-w-full tw-gap-4 tw-pt-6">
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
