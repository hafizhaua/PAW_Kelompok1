import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    notification
  } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

  const { Option } = Select;
  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const optionBloodType = [
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
const optionDonorType = [
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
    
    const navigate = useNavigate()

    const onFinish = async (values) => {
      console.log('Received values of form: ', values);
      const obj = {
            recipient: values.recipient,
            bloodType: values.bloodType[0],
            bagQuantity: parseInt(values.bagQuantity),
            donorType: values.donorType[0],
            city: values.city,
            hospital: values.hospital,
            cpName: values.cpName,
            cpPhoneNum: values.cpPhoneNum,
      }
      console.log(obj)
      try {
        await axios.post("http://localhost:8000/donorRequest", {
            recipient: values.recipient,
            bloodType: values.bloodType[0],
            bagQuantity: parseInt(values.bagQuantity),
            donorType: values.donorType[0],
            city: values.city,
            hospital: values.hospital,
            cpName: values.cpName,
            cpPhoneNum: values.cpPhoneNum,
        });
        notification["success"]({
            message: 'Sukses',
            description:
              'Permohonan donor darah berhasil disimpan',
          });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
    };
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="62">+62</Option>
        </Select>
      </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="recipient"
          label="Nama Pasien"
          rules={[
            {
              required: true,
              message: 'Data ini wajib diisi!',
            },
          ]}
        >
          <Input placeholder="Nama Lengkap Pasien"/>
        </Form.Item>
  
        <Form.Item
          name="bloodType"
          label="Golongan Darah"
          rules={[
            {
              required: true,
              message: 'Golongan darah wajib diisi!',
            },
          ]}
          hasFeedback
        >
            <Cascader
                    options={optionBloodType}
                    placeholder="Pilih golongan darah pasien"
                    />
        </Form.Item>
  
        <Form.Item
          name="bagQuantity"
          label="Jumlah Kantong"
          tooltip="Jumlah pendonor darah yang dibutuhkan"
          rules={[
            {
            //   type: 'number',
            required: true,
              message: 'Jumlah kantong wajib diisi!',
            },
          ]}
        >
            <Input/>
          {/* <InputNumber min={1} max={10} defaultValue={1}/> */}
        </Form.Item>

        <Form.Item
          name="donorType"
          label="Tipe Donor Darah"
          rules={[
            {
              required: true,
              message: 'Tipe donor darah wajib diisi!',
            },
          ]}
          hasFeedback
        >
            <Cascader
                    options={optionDonorType}
                    placeholder="Pilih tipe donor darah"
                    />
        </Form.Item>

        <Form.Item
          name="city"
          label="Kota/Kabupaten"
          rules={[
            {
              required: true,
              message: 'Kota/Kabupaten wajib diisi!',
            },
          ]}
        >
          <Input placeholder="Nama kota/kabupaten pasien"/>
        </Form.Item>

        <Form.Item
          name="hospital"
          label="Rumah Sakit"
          rules={[
            {
              required: true,
              message: 'Nama rumah sakit wajib diisi!',
            },
          ]}
        >
          <Input placeholder="Nama rumah sakit pasien"/>
        </Form.Item>

        <Form.Item
          name="cpName"
          label="Nama Narahubung"
          rules={[
            {
              required: true,
              message: 'Nama narahubung wajib diisi!',
            },
          ]}
        >
          <Input placeholder="Nama narahubung pasien"/>
        </Form.Item>
  
  
        <Form.Item
          name="cpPhoneNum"
          label="Kontak Narahubung"
          rules={[
            {
              required: true,
              message: 'Harap masukkan nomor telepon aktif!',
            },
          ]}
        >
          <Input
            placeholder="Nomor telepon narahubung pasien"
            addonBefore="+62"
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
  
        <Form.Item {...tailFormItemLayout}>
        {/* <Link to={"/"}> */}
          <Button type="primary" htmlType="submit">
            Kirim Permohonan
          </Button>
          {/* </Link> */}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Link to={"/"}>
          <Button type="primary">
            Batal
          </Button>
          </Link>
        </Form.Item>

      </Form>
    );
  };
  export default CreateForm;