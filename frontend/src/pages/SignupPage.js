import React from "react";
import { Card, Typography, Button, Alert, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useSignup } from "../hooks/useSignup";

export default function SignupPage() {
    const { Title } = Typography;
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const response = await signup(
            values.username,
            values.email,
            values.password
        );
        if (response) {
            message.success("Akun berhasil terdaftar. Silakan lakukan login.");
            navigate("/login");
        }
    };

    const [form] = Form.useForm();

    return (
        <>
            <Title
                data-aos="zoom-out"
                level={3}
                style={{ textAlign: "center", margin: "1rem" }}
            >
                Daftar Akun
            </Title>
            <Card
                data-aos="fade"
                data-aos-delay={200}
                title="Formulir Daftar Akun"
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
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        label=""
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Masukkan usernamemu!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: "grey" }} />}
                            placeholder="Username"
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
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "Email ini tidak valid!",
                            },
                            {
                                required: true,
                                message: "Harap isi email terlebih dahulu!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined style={{ color: "grey" }} />}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Harap isi kata sandi terlebih dahulu!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder="Kata sandi"
                            prefix={<LockOutlined style={{ color: "grey" }} />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Harap konfirmasi kata sandi Anda!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Kedua kata sandi tidak cocok!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Konfirmasi kata sandi"
                            prefix={<LockOutlined style={{ color: "grey" }} />}
                        />
                    </Form.Item>

                    <Form.Item style={{ margin: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Daftar
                        </Button>
                        <p style={{ margin: "1rem 0" }}>
                            Sudah memiliki akun? <Link to="/login">Masuk</Link>{" "}
                            sekarang!
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
