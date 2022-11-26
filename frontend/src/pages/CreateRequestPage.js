import React from "react";
import { Card, Typography } from "antd";
import CreateForm from "../components/forms/CreateForm";

export default function CreateRequestPage() {
    const { Title } = Typography;
    return (
        <>
            <Title
                level={3}
                style={{ textAlign: "center", margin: "1rem" }}
                data-aos="zoom-out"
            >
                Pengajuan Kebutuhan Donor Darah
            </Title>
            <Card
                data-aos="fade"
                data-aos-delay={200}
                title="Formulir Permohonan Donor Darah"
                bordered={false}
                style={{
                    width: "100%",
                    margin: "0 auto",
                    borderRadius: 8,
                    padding: "24px 16px",
                    filter: "drop-shadow(0px 4px 40px rgba(66, 95, 138, 0.1))",
                }}
            >
                <CreateForm />
            </Card>
        </>
    );
}
