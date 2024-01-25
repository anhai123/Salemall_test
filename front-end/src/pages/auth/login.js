import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Card,
  Space,
  message,
} from "antd";
import authService from "../../services/auth.service";
import { GlobalState } from "../../GlobalState";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const state = useContext(GlobalState);
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authService.login(values.username, values.password).then(
      (response) => {
        console.log(response);
        message.success("Đăng nhập thành công");
        window.location.href = `/shopping`;
        navigate('/shopping', { replace: true })
        // window.location.href = `/`;
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(_content);
        message.error(_content);
      }
    );
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        backgroundColor: "rgba(255,255,255,$bg-white)",
        borderRadius: "0.75rem",
        backgroundColor: "white",
        boxShadow:
          " 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
      }}
    >
      <Card
        title={
          <span
            style={{
              display: "flex",

              justifyContent: " space-around",
            }}
          >
            ĐĂNG NHẬP
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
            name="normal_login"
            className="login-form"
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
                placeholder="Email"
              />
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Đăng nhập
              </Button>

            </Form.Item>

            <Form.Item>

              <span
              >
                Chưa có tài khoản? <a href="register">đăng ký ngay!</a>
              </span>
            </Form.Item>
          </Form>
        </Col>
      </Card>
    </Row>
  );
};
export default Login;
