import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";
import cardCreateImg from "../images/card-create-req.png";
import cardSearchImg from "../images/card-search-req.png";
import section1Bg from "../images/bg-hero.png";
import section2Bg from "../images/bg-gradient.png";
import section3Bg from "../images/bg-map.png";

export default function LandingPage() {
    return (
        <div>
            <SectionOne />
            <SectionTwo />
            <SectionThree />
        </div>
    );
}

const SectionOne = () => {
    return (
        <section
            className={style.section1}
            style={{
                backgroundImage: `url(${section1Bg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className={style.contentContainer}>
                <div
                    style={{
                        padding: "0.9rem 1.8rem",
                        backgroundColor: "#001529",
                        display: "flex",
                        borderRadius: 30,
                    }}
                    data-aos="fade-up"
                >
                    <img
                        src={process.env.PUBLIC_URL + "/bloodio-logo.png"}
                        alt="logo of bloodio, the web app name"
                        style={{ height: 18 }}
                    />
                    <h1
                        style={{
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            color: "white",
                            margin: "0 0 0 0.8rem",
                        }}
                    >
                        Blood
                        <span style={{ fontWeight: "normal" }}>io</span>
                    </h1>
                </div>
                <h1
                    className={style.title}
                    data-aos="zoom-in"
                    data-aos-delay="300"
                >
                    Tingkatkan solidaritas dengan men<b>donor</b>kan{" "}
                    <b>darah</b>🩸
                </h1>
                <div style={{ display: "flex" }}>
                    <div data-aos="flip-left" data-aos-delay="500">
                        <Link to="/signup">
                            <Button
                                type="primary"
                                style={{
                                    fontSize: "0.8rem",
                                    borderRadius: 3,
                                }}
                            >
                                Daftar Sekarang
                            </Button>
                        </Link>
                    </div>
                    <div data-aos="flip-right" data-aos-delay="600">
                        <Link to="/login">
                            <Button
                                style={{
                                    marginLeft: "1rem",
                                    fontSize: "0.8rem",
                                    borderRadius: 3,
                                }}
                            >
                                Masuk
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SectionTwo = () => {
    return (
        <section
            className={style.section2}
            style={{
                backgroundImage: `url(${section2Bg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className={style.contentContainer}>
                <img
                    data-aos="fade"
                    data-aos-anchor-placement="bottom-bottom"
                    src={cardCreateImg}
                    alt=""
                    className={style.img}
                />
                <div className={style.textContainer}>
                    <h1
                        className={style.title}
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        Butuh kantong darah secara mendesak?
                    </h1>
                    <p
                        className={style.description}
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        Buat permohonan kebutuhan donor darah dengan mudah
                        dengan publikasi secara <em>realtime</em>.
                    </p>
                    <div data-aos="fade" data-aos-delay="750">
                        <Link to="/add">
                            <Button
                                type="primary"
                                style={{
                                    marginTop: "1rem",
                                    fontSize: "0.8rem",
                                    borderRadius: 3,
                                }}
                            >
                                Ajukan Kebutuhan Darah
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SectionThree = () => {
    return (
        <section
            className={style.section3}
            style={{
                backgroundImage: `url(${section3Bg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className={style.textContainer}>
                <h1 className={style.title} data-aos="zoom-out">
                    Cari kebutuhan donor di daerahmu dan bantu yang membutuhkan
                </h1>

                <div data-aos="flip-left" data-aos-delay="300">
                    <Link to="/search">
                        <Button
                            type="primary"
                            style={{
                                marginTop: "1rem",
                                fontSize: "0.8rem",
                                borderRadius: 3,
                            }}
                        >
                            Cari Kebutuhan Darah
                        </Button>
                    </Link>
                </div>
            </div>
            <img
                data-aos="fade"
                data-aos-delay="500"
                src={cardSearchImg}
                alt=""
                className={style.img}
            />
        </section>
    );
};
