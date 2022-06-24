const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "QQ",
  auth: {
    user: "785424079@qq.com",
    pass: "jecwabiixocmbfhc"
  }
});

const email = ({ text, to = "785424079@qq.com" }) => {
  const str = `
    <div>${text}</div>
  `
  const mailOptions = {
    from: "785424079@qq.com",
    to: Array.isArray(to) ? to : [to], //  '873001134@qq.com'
    subject: "餐券通知",
    text: str
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
        console.log("Email successfully sent!");
      }
    });
  });
};

module.exports = email;