import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    Form,
    Input,
    Cascader,
    Card,
    Col,
    Row,
    Select,
    message,
} from "antd";
import { lbl } from "./data";

import DonorReqCard from "./DonorReqCard";

const UserList = () => {
    const [users, setUser] = useState([]);
    const { Option } = Select;

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:8000/donorRequest");
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/donorRequest/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const [form] = Form.useForm();

    const filter = (inputValue, path) =>
        path.some(
            (option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                -1
        );
    const filterRequest = async (values) => {
        let filterParams = "";
        for (const prop in values) {
            if (values[prop] != undefined && values[prop] != "") {
                console.log(prop, values[prop]);
                filterParams += `&${prop}=` + encodeURIComponent(values[prop]);
            }
        }

        console.log(
            "http://localhost:8000/donorRequest/?sort=newest" + filterParams
        );

        try {
            const response = await axios.get(
                "http://localhost:8000/donorRequest/?sort=newest" + filterParams
            );
            setUser(response.data);
            console.log(users);
            message.info(`Penyaringan berhasil dilakukan`);
        } catch (error) {
            console.log(error);
        }
    };

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
                <Form layout="vertical" form={form} onFinish={filterRequest}>
                    <Row gutter={16}>
                        <Col className="gutter-row" xs={24} md={12}>
                            <Form.Item label="Nama Pasien" name="name">
                                <Input placeholder="Ex: Syahroni Pramana" />
                            </Form.Item>
                            <Form.Item label="Tipe Donor" name="donorType">
                                <Select placeholder="Pilih tipe transfusi donor darah">
                                    <Option value="">Semua</Option>
                                    <Option value="WB">
                                        Darah Utuh / Whole Blood (WB)
                                    </Option>
                                    <Option value="PRC">
                                        Sel Darah Merah / Packed Red Cells (PRC)
                                    </Option>
                                    <Option value="PC">
                                        Konsentrat Platelet / Platelet
                                        Concentrate (PC)
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" xs={24} md={12}>
                            <Form.Item label="Golongan Darah" name="bloodType">
                                <Select placeholder="Pilih golongan darah pasien">
                                    <Option value="">Semua</Option>
                                    <Option value="A+">A+</Option>
                                    <Option value="A-">A-</Option>
                                    <Option value="B+">B+</Option>
                                    <Option value="B-">B-</Option>
                                    <Option value="O+">O+</Option>
                                    <Option value="O-">O-</Option>
                                    <Option value="AB+">AB+</Option>
                                    <Option value="AB-">AB-</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Kota/Kabupaten" name="city">
                                <Cascader
                                    placeholder="Pilih kota/kabupaten"
                                    showSearch={{ filter }}
                                    onSearch={(value) => console.log(value)}
                                    options={lbl}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
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
                    justifyContent: "center",
                    gap: 7,
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
