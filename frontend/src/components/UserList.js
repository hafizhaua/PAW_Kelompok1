import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Cascader, Card, Col, Row } from "antd";

import DonorReqCard from "./DonorReqCard";

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:8000/donorRequest");
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        console.log("masuk delete");
        try {
            await axios.delete(`http://localhost:8000/donorRequest/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const [form] = Form.useForm();

    const optionDonorType = [
        {
            value: "",
            label: "Semua",
        },
        {
            value: "WB",
            label: "Darah Utuh / Whole Blood (WB)",
        },
        {
            value: "PRC",
            label: "Sel Darah Merah / Packed Red Cells (PRC)",
        },
        {
            value: "PC",
            label: "Konsentrat Platelet / Platelet Concentrate (PC)",
        },
    ];
    const optionBloodType = [
        {
            value: "",
            label: "Semua",
        },
        {
            value: "A+",
            label: "A+",
        },
        {
            value: "A-",
            label: "A-",
        },
        {
            value: "B+",
            label: "B+",
        },
        {
            value: "B-",
            label: "B-",
        },
        {
            value: "AB+",
            label: "AB+",
        },
        {
            value: "AB-",
            label: "AB-",
        },
        {
            value: "O+",
            label: "O+",
        },
        {
            value: "O-",
            label: "O-",
        },
    ];
    const optionRegion = [
        {
            value: "",
            label: "Semua",
        },
        {
            value: "zhejiang",
            label: "Zhejiang",
        },
        {
            value: "jiangsu",
            label: "Jiangsu",
        },
    ];

    const filter = (inputValue, path) =>
        path.some(
            (option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                -1
        );

    return (
        <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
            <Card
                title="Filter Informasi"
                bordered={false}
                style={{
                    width: "100%",
                    margin: "0 auto",
                }}
            >
                <Form layout="vertical" form={form}>
                    <Row gutter={16}>
                        <Col className="gutter-row" xs={24} md={12}>
                            <Form.Item label="Nama Pasien">
                                <Input placeholder="Ex: Syahroni Pramana" />
                            </Form.Item>
                            <Form.Item label="Tipe Donor">
                                <Cascader
                                    options={optionDonorType}
                                    placeholder="Pilih jenis donor"
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" xs={24} md={12}>
                            <Form.Item label="Golongan Darah">
                                <Cascader
                                    options={optionBloodType}
                                    placeholder="Pilih golongan darah"
                                />
                            </Form.Item>
                            <Form.Item label="Kota/Kabupaten">
                                <Cascader
                                    options={optionRegion}
                                    placeholder="Pilih kota/kabupaten"
                                    showSearch={{ filter }}
                                    onSearch={(value) => console.log(value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    style={{ width: "100%" }}
                                >
                                    Cari
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <div
                className=""
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                {users.map((user, index) => (
                    <DonorReqCard {...user} onDelete={deleteUser} />
                ))}
            </div>
        </div>
    );
};

export default UserList;
