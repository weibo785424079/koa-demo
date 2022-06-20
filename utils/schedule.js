// index.js
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const axios = require("axios");
const moment = require("moment");
const getOperation = require("./strategy");

const ins = axios.create();

ins.interceptors.response.use((data) => data.data);
const getDetail = (params) =>
  ins.get("https://api.doctorxiong.club/v1/fund/detail", {
    params,
  });

const codes = [
  "003096",
  "010685",
  "160225",
  "161028",
  "502003",
  "161725",
  "320007",
  "007872",
  "011103",
];

const getRes = async (code = "003096") => {
  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD");
  const { data } = await getDetail({
    code,
    startDate,
  });

  return getOperation(data);
};
const getAll = () => Promise.all(codes.map((code) => getRes(code)));

const transporter = nodemailer.createTransport({
  service: "QQ",
  auth: {
    user: "785424079@qq.com",
    pass: "jecwabiixocmbfhc",
  },
});

const send = () => {
  return new Promise(async (resolve) => {
    console.log("---------------------");
    console.log("Running Cron Job");

    const list = await getAll();

    let text = "";
    list.forEach((data) => {
      text += `
            <div>${data.name}</div>
            <div>基金代码：${data.code}</div>
            <div>建议: ${data.msg}</div>
            <div style="color:${
              data.expectGrowth > 0 ? "red" : "green"
            }">预计日涨幅: ${data.expectGrowth}%</div>
            <div>${data.recent}</div>
            ${
              data.desc
                ? `<div  style="color: red">说明: ${data.desc || "-"}</div>`
                : ""
            }
        `;
    });
    const mailOptions = {
      from: "785424079@qq.com",
      to: ["785424079@qq.com"], //  '873001134@qq.com'
      subject: "基金速递",
      text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      } else {
        console.log("Email successfully sent!");
      }
      resolve();
    });
  });
};
// sending emails at periodic intervals
cron.schedule("*/1 * * * *", send);

module.exports = send;
