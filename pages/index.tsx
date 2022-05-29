import { useState } from "react";

import axios from "../node_modules/axios/index";
import Button from "../node_modules/react-bootstrap/esm/Button";
import Container from "../node_modules/react-bootstrap/esm/Container";
import Form from "../node_modules/react-bootstrap/esm/Form";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState([]);
  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const zipCode = (
      await axios.get(
        `https://ipinfo.io?token=${process.env.NEXT_PUBLIC_TOKEN}`
      )
    ).data.postal;

    const locationData = (
      await axios.get("https://zipcloud.ibsnet.co.jp/api/search", {
        params: {
          zipcode: zipCode,
        },
      })
    ).data.results;
    setData(locationData);
    setIsClicked(true);
  };
  return (
    <Container className="text-center" style={{ backgroundColor: "#F0EDD1" }}>
      <h1 className="m-5 text-primary" style={{ fontWeight: "bold" }}>
        少しゾッとする
        <br />
        アプリ
      </h1>
      <h4 className="m-5">ボタンを押すだけであなたの〇〇がわかります↓</h4>
      <Form onSubmit={onSubmit} className="m-5">
        <Button type="submit" className="text-center ">
          ボタンをクリック！！
        </Button>
      </Form>
      {isClicked && (
        <div style={{ fontWeight: "bold" }} className="m-5">
          あなたは
          <p
            className="text-danger"
            style={{ borderBottom: "solid 2px red", boxSizing: "border-box" }}
          >
            {data[0].address1 + data[0].address2}
          </p>
          に住んでいますね
          <div className="m-5">IPアドレスから位置情報を取得しました。</div>
        </div>
      )}
    </Container>
  );
}
