import { Button, Cascader, Form, Input, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listGoldar, listKota, listTipeDonor } from "../../data";
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

const EditForm = ({ request, onFinish }) => {
    const [recipient, setRecipient] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [bagQuantity, setBagQuantity] = useState("");
    const [donorType, setDonorType] = useState("");
    const [city, setCity] = useState("");
    const [hospital, setHospital] = useState("");
    const [cpName, setCpName] = useState("");
    const [cpPhoneNum, setCpPhoneNum] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        if (request) {
            setRecipient(request?.recipient);
            setBloodType(request?.bloodType);
            setBagQuantity(request?.bagQuantity);
            setDonorType(request?.donorType);
            setCity(request?.city);
            setHospital(request?.hospital);
            setCpName(request?.cpName);
            setCpPhoneNum(request?.cpPhoneNum);
        }
    }, []);

    const filter = (inputValue, path) =>
        path.some(
            (option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                -1
        );

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}
            fields={[
                {
                    name: ["recipient"],
                    value: recipient,
                },
                {
                    name: ["bloodType"],
                    value: [bloodType],
                },
                {
                    name: ["bagQuantity"],
                    value: bagQuantity,
                },
                {
                    name: ["donorType"],
                    value: [donorType],
                },
                {
                    name: ["city"],
                    value: [city],
                },
                {
                    name: ["hospital"],
                    value: hospital,
                },
                {
                    name: ["cpName"],
                    value: cpName,
                },
                {
                    name: ["cpPhoneNum"],
                    value: cpPhoneNum.slice(3),
                },
            ]}
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
                <Input
                    defaultValue={recipient}
                    placeholder="Nama lengkap pasien"
                />
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
            >
                <Cascader
                    placeholder="Pilih golongan darah"
                    showSearch={{ filter }}
                    options={listGoldar}
                />
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
                <InputNumber min={1} max={10} />
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
            >
                <Cascader
                    placeholder="Pilih tipe transfusi donor"
                    showSearch={{ filter }}
                    options={listTipeDonor}
                />
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
                    options={listKota}
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
                <Input
                    placeholder="Nama rumah sakit pasien"
                    defaultValue={hospital}
                />
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
                <Input
                    placeholder="Nama narahubung pasien"
                    defaultValue={cpName}
                />
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
                    defaultValue={cpPhoneNum}
                    placeholder="Nomor telepon narahubung pasien"
                    addonBefore="+62"
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Simpan Perubahan
                </Button>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Link to={"/search"}>
                    <Button type="secondary">Batal</Button>
                </Link>
            </Form.Item>
        </Form>
    );
};
export default EditForm;
