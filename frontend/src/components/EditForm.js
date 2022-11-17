import {
    Button,
    Cascader,
    Form,
    Input,
    InputNumber,
    Select,
    notification,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const EditForm = () => {
    const [recipient, setRecipient] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [bagQuantity, setBagQuantity] = useState("");
    const [donorType, setDonorType] = useState("");
    const [city, setCity] = useState("");
    const [hospital, setHospital] = useState("");
    const [cpName, setCpName] = useState("");
    const [cpPhoneNum, setcpPhoneNum] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        getUserById();
    }, []);

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
            await axios.patch(`http://localhost:8000/donorRequest/${id}`, {
                ...values,
            });
            notification["success"]({
                message: "Berhasil!",
                description: "Perubahan data donor darah berhasil disimpan",
            });
            navigate("/");
        } catch (error) {
            notification["error"]({
                message: "Gagal!",
                description: "Perubahan data donor darah gagal disimpan",
            });
            console.log(error);
        }
    };

    const getUserById = async () => {
        const response = await axios.get(
            `http://localhost:8000/donorRequest/${id}`
        );
        console.log(response.data);
        await setRecipient(response.data.recipient);
        await setBloodType(response.data.bloodType);
        await setBagQuantity(response.data.bagQuantity);
        await setDonorType(response.data.donorType);
        await setCity(response.data.city);
        await setHospital(response.data.hospital);
        await setCpName(response.data.cpName);
        await setcpPhoneNum(response.data.cpPhoneNum);
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            fields={[
                {
                    name: ["recipient"],
                    value: recipient,
                },
                {
                    name: ["bloodType"],
                    value: bloodType,
                },
                {
                    name: ["bagQuantity"],
                    value: bagQuantity,
                },
                {
                    name: ["donorType"],
                    value: donorType,
                },
                {
                    name: ["city"],
                    value: city,
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
                <Select
                    placeholder="Pilih golongan darah pasien"
                    defaultValue={bloodType}
                >
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
                <InputNumber
                    min={1}
                    max={10}
                    defaultdefaultValue={1}
                    defaultValue={bagQuantity}
                />
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
                <Select
                    placeholder="Pilih golongan darah pasien"
                    defaultValue={donorType}
                >
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
                <Link to={"/"}>
                    <Button type="secondary">Batal</Button>
                </Link>
            </Form.Item>
        </Form>
    );
};
export default EditForm;
