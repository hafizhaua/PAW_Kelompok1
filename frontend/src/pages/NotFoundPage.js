import React from "react";
import { Button, Result } from "antd";

export default function NotFoundPage() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Maaf, laman yang anda akses tidak ditemukan."
            // extra={<Button type="primary"></Button>}
        />
    );
}
