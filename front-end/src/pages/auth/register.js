import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col, Card, message } from "antd";
import authService from "../../services/auth.service";
const Register = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authService.register(values.username, values.email, values.password).then(
      (response) => {
        console.log(response);
        message.success("Đăng ký thành công");
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error("Đăng ký thất bại");
      }
    );
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Card
        title={
          <span
            style={{
              display: "flex",

              justifyContent: " space-around",
            }}
          >
            ĐĂNG KÝ
          </span>
        }
        style={{
          backgroundColor: "rgba(255,255,255,$bg-white)",
          borderRadius: "0.75rem",
          backgroundColor: "white",
          boxShadow:
            " 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
        }}
      >
        <Col>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Bạn hãy nhập email!",
                },
              ]}
            >
              <Input
                autoFocus
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "E-mail không hợp lệ!",
                },
                {
                  required: true,
                  message: "Bạn hãy nhập email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Bạn hãy nhập mật khẩu!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Bạn hãy nhập lại mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Mật khẩu không trùng nhau!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                style={{ width: "100%" }}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Card>
    </Row>
  );
};
export default Register;
