import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    Button,
    Space,
    Table,
    Tag,
    Popconfirm,
    message,
    Modal,
    Form,
    Checkbox,
    notification,
} from "antd";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export default function AdminPage() {
    const { Title } = Typography;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPopconfirmOpen, setIsPopConfirmOpen] = useState(false);
    const [focusedAcc, setFocusedAcc] = useState({});
    const [checkedList, setCheckedList] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const CheckboxGroup = Checkbox.Group;

    const handleConfirm = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/user/${id}`, {
                headers: {
                    "x-access-token": `${user.accessToken}`,
                },
            });

            message.success("Data berhasil dihapus!");
            getAccounts();
        } catch (error) {
            message.error("Data gagal dihapus.");
            console.log(error);
        }
    };

    const showPopConfirm = () => {
        setIsPopConfirmOpen(true);
    };

    const handleCancel = (e) => {
        setIsPopConfirmOpen(false);
        message.error("Data gagal dihapus!");
    };

    const handleOkModal = () => {
        setIsModalOpen(false);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = (record) => {
        setFocusedAcc(record);
        setCheckedList(record.roles);
        setIsModalOpen(true);
    };

    const options = [
        { label: "User", value: "user", disabled: true },
        { label: "Admin", value: "admin" },
        { label: "Moderator", value: "moderator" },
    ];

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Roles",
            key: "roles",
            dataIndex: "roles",
            filters: [
                {
                    text: "Moderator",
                    value: "moderator",
                },
                {
                    text: "Admin",
                    value: "admin",
                },
                {
                    text: "User",
                    value: "user",
                    disabled: true,
                },
            ],
            filterMode: "tree",
            filterSearch: true,
            onFilter: (value, record) => record.roles.includes(value),
            render: (_, { roles }) => (
                <>
                    {roles.map((role) => {
                        let color = "";
                        switch (role) {
                            case "moderator":
                                color = "geekblue";
                                break;
                            case "admin":
                                color = "green";
                                break;
                            case "user":
                                color = "volcano";
                                break;
                            default:
                                color = "cyan";
                        }
                        return (
                            <Tag color={color} key={role}>
                                {role.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {user.id !== record.id && (
                        <>
                            <Button
                                type="primary"
                                onClick={() => handleModalOpen(record)}
                            >
                                Ubah Roles
                            </Button>

                            <Popconfirm
                                title="Apakah Anda yakin menghapus data ini?"
                                open={isPopconfirmOpen}
                                onConfirm={() => handleConfirm(record.id)}
                                onCancel={handleCancel}
                                okText="Ya"
                                cancelText="Tidak"
                            >
                                <Button
                                    danger
                                    type="primary"
                                    onClick={showPopConfirm}
                                >
                                    Delete
                                </Button>
                            </Popconfirm>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const getAccounts = async (req, res) => {
        const response = await axios.get("http://localhost:8000/user/", {
            headers: {
                "x-access-token": `${user.accessToken}`,
            },
        });

        // let filteredAcc = response.data.filter((rsp) => rsp.id !== user.id);
        setAccounts(response.data);
    };

    useEffect(() => {
        getAccounts();
    }, []);

    useEffect(() => {
        setData(
            accounts.map((acc) => {
                return {
                    key: acc.id,
                    id: acc.id,
                    username: acc.username,
                    roles: acc.roles,
                };
            })
        );
    }, [accounts]);

    const onCheckboxChange = (list) => {
        setCheckedList(list);
    };

    const onSubmitRoleChange = async () => {
        setIsLoading(true);

        try {
            await axios.patch(
                `http://localhost:8000/user/${focusedAcc.id}`,
                {
                    roles: checkedList,
                },
                {
                    headers: {
                        "x-access-token": `${user.accessToken}`,
                    },
                }
            );

            getAccounts();

            notification["success"]({
                message: "Berhasil!",
                description: `Perubahan role akun berhasil disimpan`,
            });
        } catch (error) {
            notification["error"]({
                message: "Gagal!",
                description: "Perubahan role akun gagal disimpan",
            });
            console.log(error);
        }
        setIsLoading(false);
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title={`Pengubahan Roles Akun ${focusedAcc.username}`}
                open={isModalOpen}
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => onSubmitRoleChange()}
                        loading={isLoading}
                    >
                        Simpan
                    </Button>,
                    <Button onClick={() => setIsModalOpen(false)}>
                        Batal
                    </Button>,
                ]}
            >
                <Form name="edit_roles">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <CheckboxGroup
                            options={options}
                            value={checkedList}
                            onChange={onCheckboxChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Title
                data-aos="zoom-out"
                level={3}
                style={{ textAlign: "center", margin: "1rem" }}
            >
                Pengelolaan Akun Sistem
            </Title>
            <Title
                level={5}
                style={{
                    textAlign: "center",
                    margin: "1rem",
                }}
            >
                🔐 MODERATOR ONLY 🔐
            </Title>

            <Card
                data-aos="fade"
                data-aos-delay={200}
                title="Tabel List Akun Terdaftar"
                bordered={false}
                style={{
                    width: "100%",
                    margin: "2rem auto",
                    borderRadius: 8,
                    padding: "24px 16px",
                    filter: "drop-shadow(0px 4px 40px rgba(66, 95, 138, 0.1))",
                }}
            >
                <Table columns={columns} dataSource={data} />
            </Card>
        </>
    );
}
