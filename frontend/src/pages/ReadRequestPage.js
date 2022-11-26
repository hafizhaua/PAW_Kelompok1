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
    message,
    Typography,
    Empty,
} from "antd";

import { listGoldar, listKota, listTipeDonor } from "../data/index";
import DonorReqCard from "../components/card/DonorReqCard";
import { useAuthContext } from "../hooks/useAuthContext";

const ReadRequestPage = () => {
    const [users, setUser] = useState([]);
    const [form] = Form.useForm();
    const { Title } = Typography;
    const { user } = useAuthContext();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get(
            "http://localhost:8000/donorRequest/?sort=newest"
        );
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/donorRequest/${id}`, {
                headers: {
                    "x-access-token": `${user.accessToken}`,
                },
            });
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

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
            setUser([]);
            setUser(response.data);
            message.success(`Penyaringan berhasil dilakukan!`);
        } catch (error) {
            message.error(`Penyaringan gagal dilakukan!`);
        }
    };

    return (
        <>
            <Title
                level={3}
                style={{ textAlign: "center", margin: "1rem" }}
                data-aos="zoom-out"
            >
                Pencarian Kebutuhan Donor Darah
            </Title>
            <Card
                data-aos="fade"
                data-aos-delay={200}
                title="Filter Informasi"
                bordered={false}
                style={{
                    width: "100%",
                    margin: "0 auto",
                    borderRadius: 8,
                    padding: "24px 16px",
                    filter: "drop-shadow(0px 4px 40px rgba(66, 95, 138, 0.1))",
                }}
            >
                <Form layout="vertical" form={form} onFinish={filterRequest}>
                    <Row gutter={16}>
                        <Col className="gutter-row" xs={24} md={12}>
                            <Form.Item label="Nama Pasien" name="name">
                                <Input placeholder="Ex: Syahroni Pramana" />
                            </Form.Item>
                            <Form.Item label="Tipe Donor" name="donorType">
                                <Cascader
                                    placeholder="Pilih tipe transfusi donor"
                                    showSearch={{ filter }}
                                    onSearch={(value) => console.log(value)}
                                    options={listTipeDonor}
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" xs={24} md={12}>
                            <Form.Item label="Golongan Darah" name="bloodType">
                                <Cascader
                                    placeholder="Pilih golongan darah"
                                    showSearch={{ filter }}
                                    onSearch={(value) => console.log(value)}
                                    options={listGoldar}
                                />
                            </Form.Item>
                            <Form.Item label="Kota/Kabupaten" name="city">
                                <Cascader
                                    placeholder="Pilih kota/kabupaten"
                                    showSearch={{ filter }}
                                    onSearch={(value) => console.log(value)}
                                    options={listKota}
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
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    // alignItems: "center",
                    gap: 7,
                }}
            >
                {users.length == 0 && (
                    <Empty
                        style={{ margin: "5rem" }}
                        description="Data tidak ditemukan"
                        data-aos="fade-down"
                    />
                )}
                {users.map((user, index) => (
                    <div
                        data-aos="fade-up"
                        data-aos-delay={(index % 3) * 250}
                        // data-aos-anchor-placement="center-bottom"
                    >
                        <DonorReqCard {...user} onDelete={deleteUser} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ReadRequestPage;
