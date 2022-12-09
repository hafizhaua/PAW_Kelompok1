import React, { useEffect, useState } from "react";
import { Card, Typography, Result, notification, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditForm from "../components/forms/EditForm";
import { useAuthContext } from "../hooks/useAuthContext";

export default function EditRequestPage() {
    const { Title } = Typography;
    const [request, setRequest] = useState(null);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const getRequestById = async () => {
        const response = await axios.get(
            `https://bloodio-api.vercel.app/api/donorRequest/${id}`
        );

        if (
            response.data.userId === user?.id ||
            user?.roles.includes("ROLE_ADMIN")
        ) {
            console.log("Permitted");
            setRequest(response.data);
            setError(false);
        } else {
            console.log("Not Permitted");
            setError(true);
        }
    };

    const onFinish = async (values) => {
        values.cpPhoneNum = "+62" + values.cpPhoneNum;
        values.city = values.city[0];
        values.bloodType = values.bloodType[0];
        values.donorType = values.donorType[0];

        try {
            await axios.patch(
                `https://bloodio-api.vercel.app/api/donorRequest/${id}`,

                {
                    ...values,
                },
                {
                    headers: {
                        "x-access-token": `${user.accessToken}`,
                    },
                }
            );
            notification["success"]({
                message: "Berhasil!",
                description: "Perubahan data donor darah berhasil disimpan",
            });
            navigate("/search");
        } catch (error) {
            notification["error"]({
                message: "Gagal!",
                description: "Perubahan data donor darah gagal disimpan",
            });
        }
    };

    useEffect(() => {
        getRequestById();
    }, []);

    return (
        <>
            {error ? (
                <Result
                    status="error"
                    title="401"
                    subTitle="Maaf, anda tidak memiliki akses untuk halaman ini."
                />
            ) : (
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
                        {request ? (
                            <div data-aos="fade">
                                <EditForm
                                    request={request}
                                    onFinish={onFinish}
                                />
                            </div>
                        ) : (
                            <Skeleton active style={{ margin: "2rem 1rem" }} />
                        )}
                    </Card>
                </>
            )}
        </>
    );
}
