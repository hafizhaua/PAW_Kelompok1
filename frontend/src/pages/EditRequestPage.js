import React from "react";
import { Card, Typography } from "antd";
import EditForm from "../components/forms/EditForm";

export default function EditRequestPage() {
    const { Title } = Typography;
    return (
        <>
            <Title
                data-aos="zoom-out"
                level={3}
                style={{ textAlign: "center", margin: "1rem" }}
            >
                Perubahan Kebutuhan Donor Darah
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
                <EditForm />
            </Card>
        </>
    );
}
