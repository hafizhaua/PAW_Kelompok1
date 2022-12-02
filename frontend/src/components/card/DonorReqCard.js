import React from "react";
import { Card, Row, Col, Button, Tooltip, Typography, Popconfirm } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PushpinOutlined,
} from "@ant-design/icons";
import style from "./DonorReqCard.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function DonorReqCard({
    _id,
    recipient = "Alice Bandowoso",
    date = "17 November 2022",
    bloodType = "O+",
    bagQuantity = 4,
    donorType = "WB",
    city = "Temanggung",
    hospital = "RS Temanggung",
    cpName = "Kayla",
    cpPhoneNum = "081234567890",
    onDelete,
}) {
    const { user } = useAuthContext();
    const { Paragraph } = Typography;

    date = new Date(date).toDateString();
    date = date.split(" ");
    date.shift();
    [date[0], date[1]] = [date[1], date[0]];
    date = date.join(" ");

    const confirm = (e) => {
        onDelete(_id);
    };

    return (
        <Card
            style={{
                width: 283,
                marginTop: 10,
                borderRadius: 8,
                padding: "24px 16px",
                backgroundImage:
                    "linear-gradient(to right top, #F1F5FA, white)",
                filter: "drop-shadow(0px 4px 40px rgba(66, 95, 138, 0.1))",
            }}
            bordered={false}
        >
            <Row gutter={[0, 12]}>
                <Row style={{ width: "100%" }} gutter={[0, 4]}>
                    <Col span={24}>
                        <h1 className={style.name}>{recipient}</h1>
                    </Col>
                    <Col span={24}>
                        <h3 className={style.date}>{date}</h3>
                    </Col>
                </Row>

                <Row style={{ width: "100%" }} gutter={[0, 4]}>
                    <Col span={8}>
                        <h3 className={style.label}>Goldar</h3>
                    </Col>
                    <Col span={8}>
                        <h3 className={style.label}>Kantong</h3>
                    </Col>
                    <Col span={8}>
                        <h3 className={style.label}>Transfusi</h3>
                    </Col>
                    <Col span={8}>
                        <h1 className={style.value}>{bloodType}</h1>
                    </Col>
                    <Col span={8}>
                        <h1 className={style.value}>{bagQuantity}</h1>
                    </Col>
                    <Col span={8}>
                        <h1 className={style.value}>{donorType}</h1>
                    </Col>
                </Row>

                <Row style={{ width: "100%" }} gutter={[0, 4]}>
                    <Col span={24}>
                        <h3 className={style.label}>Kota/Kab.</h3>
                    </Col>
                    <Col span={24}>
                        <h1 className={style.value}>{city}</h1>
                    </Col>
                    <Col span={24}>
                        <h3 className={style.label}>Rumah Sakit</h3>
                    </Col>
                    <Col span={24}>
                        <h1 className={style.value}>
                            {hospital}{" "}
                            <Tooltip title="Google Maps">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${hospital}+${city}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <PushpinOutlined
                                        style={{ color: "#1890ff" }}
                                    />
                                </a>
                            </Tooltip>
                        </h1>
                    </Col>
                    <Col span={24}>
                        <h3 className={style.label}>Narahubung</h3>
                    </Col>
                    <Col span={24}>
                        <h1 className={style.value}>
                            <Paragraph
                                className={style.value}
                                style={{ marginBottom: 0 }}
                                copyable={{ text: cpPhoneNum }}
                            >
                                {cpPhoneNum}
                            </Paragraph>
                            <Paragraph
                                className={style.value}
                                style={{ fontSize: "0.9rem" }}
                            >
                                {cpName}
                            </Paragraph>
                        </h1>
                    </Col>
                </Row>

                {user?.roles.includes("ROLE_ADMIN") && (
                    <div
                        className=""
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Link to={`/edit/${_id}`}>
                            <Button
                                type="primary"
                                style={{
                                    width: 100,
                                    fontSize: "0.8rem",
                                    borderRadius: 3,
                                }}
                                icon={<EditOutlined />}
                            >
                                Edit
                            </Button>
                        </Link>
                        <Popconfirm
                            title="Apakah Anda yakin menghapus data ini?"
                            onConfirm={confirm}
                            okText="Ya"
                            cancelText="Tidak"
                        >
                            <Button
                                // danger
                                // type=""
                                icon={<DeleteOutlined />}
                                style={{
                                    width: 100,
                                    fontSize: "0.8rem",
                                    borderRadius: 3,
                                }}
                            >
                                Hapus
                            </Button>
                        </Popconfirm>
                    </div>
                )}
            </Row>
        </Card>
    );
}
