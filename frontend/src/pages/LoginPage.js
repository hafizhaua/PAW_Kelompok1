import React from "react";
import { Card, Typography, Button, Form, Input, Alert } from "antd";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
    const { Title } = Typography;
    const { login, isLoading, error } = useLogin();

    const onFinish = async (values) => {
        console.log("Success:", values);
        await login(values.username, values.password);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const [form] = Form.useForm();

    return (
        <>
            <Title
                data-aos="zoom-out"
                level={3}
                style={{ textAlign: "center", margin: "1rem" }}
            >
                Masuk
            </Title>
            <Card
                data-aos="fade"
                data-aos-delay={200}
                title="Formulir Masuk Akun"
                bordered={false}
                style={{
                    width: "100%",
                    maxWidth: 650,
                    margin: "0 auto",
                    borderRadius: 8,
                    padding: "24px 16px",
                    filter: "drop-shadow(0px 4px 40px rgba(66, 95, 138, 0.1))",
                }}
            >
                <Form
                    form={form}
                    name="basic"
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{ margin: "0 auto" }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Harap isi email atau username terlebih dahulu!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: "grey" }} />}
                            placeholder="Email atau username"
                            onChange={() => {
                                form.setFieldsValue({
                                    username: form
                                        .getFieldValue("username")
                                        .toLowerCase()
                                        .trim(),
                                });
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Masukkan passwordmu!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Kata sandi"
                            prefix={<LockOutlined style={{ color: "grey" }} />}
                        />
                    </Form.Item>

                    <Form.Item style={{ margin: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ margin: "0 auto" }}
                            loading={isLoading}
                        >
                            Login
                        </Button>
                        <p style={{ margin: "1rem 0" }}>
                            Belum memiliki akun?{" "}
                            <Link to="/signup">Daftar</Link> sekarang!
                        </p>
                    </Form.Item>
                </Form>

                {error && (
                    <Alert
                        data-aos="fade"
                        message={error.response.data.message}
                        type="error"
                        showIcon
                    />
                )}
            </Card>
        </>
    );
}
