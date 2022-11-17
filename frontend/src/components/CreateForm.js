import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    notification,
    Cascader,
} from "antd";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { lbl } from "./data";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrCreateFormerCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const CreateForm = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const filter = (inputValue, path) =>
        path.some(
            (option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                -1
        );

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        values.cpPhoneNum = "+62" + values.cpPhoneNum;
        values.city = values.city[0];
        try {
            await axios.post("http://localhost:8000/donorRequest", {
                ...values,
            });

            notification["success"]({
                message: "Sukses",
                description: "Permohonan donor darah berhasil disimpan",
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            notification["error"]({
                message: "Galat",
                description: "Permohonan donor darah tidak berhasil disimpan",
            });
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}
        >
            <Form.Item
                name="recipient"
                label="Nama Pasien"
                rules={[
                    {
                        required: true,
                        message: "Data ini wajib diisi!",
                    },
                ]}
            >
                <Input placeholder="Nama lengkap pasien" />
            </Form.Item>

            <Form.Item
                name="bloodType"
                label="Golongan Darah"
                rules={[
                    {
                        required: true,
                        message: "Golongan darah wajib diisi!",
                    },
                ]}
                hasFeedback
            >
                <Select placeholder="Pilih golongan darah pasien">
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

            <Form.Item
                name="bagQuantity"
                label="Jumlah Kantong"
                tooltip="Jumlah pendonor darah yang dibutuhkan"
                rules={[
                    {
                        required: true,
                        message: "Data ini wajib diisi!",
                    },
                ]}
            >
                <InputNumber min={1} max={10} defaultValue={1} />
            </Form.Item>

            <Form.Item
                name="donorType"
                label="Tipe Donor Darah"
                rules={[
                    {
                        required: true,
                        message: "Tipe donor darah wajib diisi!",
                    },
                ]}
                hasFeedback
            >
                <Select placeholder="Pilih golongan darah pasien">
                    <Option value="WB">Darah Utuh / Whole Blood (WB)</Option>
                    <Option value="PRC">
                        Sel Darah Merah / Packed Red Cells (PRC)
                    </Option>
                    <Option value="PC">
                        Konsentrat Platelet / Platelet Concentrate (PC)
                    </Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="city"
                label="Kota/Kabupaten"
                rules={[
                    {
                        required: true,
                        message: "Kota/Kabupaten wajib diisi!",
                    },
                ]}
            >
                <Cascader
                    placeholder="Pilih kota/kabupaten"
                    showSearch={{ filter }}
                    onSearch={(value) => console.log(value)}
                    options={lbl}
                />
            </Form.Item>

            <Form.Item
                name="hospital"
                label="Rumah Sakit"
                rules={[
                    {
                        required: true,
                        message: "Nama rumah sakit wajib diisi!",
                    },
                ]}
            >
                <Input placeholder="Nama rumah sakit pasien" />
            </Form.Item>

            <Form.Item
                name="cpName"
                label="Nama Narahubung"
                rules={[
                    {
                        required: true,
                        message: "Nama narahubung wajib diisi!",
                    },
                ]}
            >
                <Input placeholder="Nama narahubung pasien" />
            </Form.Item>

            <Form.Item
                name="cpPhoneNum"
                label="Kontak Narahubung"
                rules={[
                    {
                        required: true,
                        message: "Harap masukkan nomor telepon aktif!",
                    },
                ]}
            >
                <Input
                    placeholder="Nomor telepon narahubung pasien"
                    addonBefore="+62"
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Kirim Permohonan
                </Button>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Link to={"/"}>
                    <Button type="secondary">Batal</Button>
                </Link>
            </Form.Item>
        </Form>
    );
};
export default CreateForm;
