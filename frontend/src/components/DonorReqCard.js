import React, { useEffect, useState } from "react";
import {
    Card,
    Row,
    Col,
    Button,
    Tooltip,
    Typography,
    Badge,
    message,
} from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, CopyTwoTone } from "@ant-design/icons";
import style from "./DonorReqCard.module.css";
import { Link } from "react-router-dom";

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
    const [isAdmin, setIsAdmin] = useState(true);
    const { Paragraph } = Typography;

    date = new Date(date).toDateString();
    date = date.split(" ");
    date.shift();
    [date[0], date[1]] = [date[1], date[0]];
    date = date.join(" ");

    return (
        <Card style={{ width: 295, marginTop: 10 }}>
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
                        <h1 className={style.value}>{hospital}</h1>
                    </Col>
                    <Col span={24}>
                        <h3 className={style.label}>Narahubung</h3>
                    </Col>
                    <Col span={24}>
                        <h1 className={(style.value, style.center)}>
                            {/* <Button
                                type="link"
                                href="https://wa.me/+6281234567890"
                                target="_blank"
                                className="phone-num"
                            > */}
                            <Paragraph
                                className={style.value}
                                copyable={{ text: "081234567890" }}
                            >
                                {cpPhoneNum} ({cpName})
                            </Paragraph>
                        </h1>
                    </Col>
                </Row>

                {isAdmin && (
                    <div
                        className=""
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Tooltip title="Edit">
                            <Link to={`edit/${_id}`}>
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                />
                            </Link>
                        </Tooltip>
                        <div style={{ width: 16 }}></div>
                        <Tooltip title="Hapus">
                            <Button
                                type="secondary"
                                danger
                                shape="circle"
                                onClick={() => onDelete(_id)}
                                icon={<DeleteOutlined />}
                            />
                        </Tooltip>
                    </div>
                )}
            </Row>
        </Card>
    );
}
