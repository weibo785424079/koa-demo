const fetch = require("node-fetch");
const email = require('./emil')

const run = async ({ username, password, city, phone }) => {
  try {
    const data = await fetch("http://chifan.taimei.com/login", {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        Referer: "http://chifan.taimei.com/login",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: "username=" + username + "&password=" + password,
      method: "POST",
    });

    const cookies = data.headers.raw()["set-cookie"] || [];

    let JSESSIONID;
    cookies.forEach((item) => {
      if (item.includes("JSESSIONID")) {
        JSESSIONID = item.split(";")[0];
      }
    });

    const res = await fetch("http://chifan.taimei.com/module/dinner/add", {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "proxy-connection": "keep-alive",
        "x-requested-with": "XMLHttpRequest",
        cookie: JSESSIONID,
        Referer: "http://chifan.taimei.com/module/dinner/add",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: "city=" + city + "&phone=" + phone,
      method: "POST",
    });
    await email({text: (await res.text())})
  } catch (error) {
    console.log("订餐失败！");
  }
};

module.exports = () => run({
  username: "bo.wei",
  password: "Taimei@321",
  city: "上海",
  phone: 18521703909,
});
