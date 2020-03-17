const plivo = require("plivo");
const config = require("../config");

module.exports = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("Request Body********");
  console.log(req.body.mobileNo);
  console.log(req.body.messageBody);
  try {
    // const client = new twilio(config.twilio.SID, config.twilio.AUTH_TOKEN);
    // await client.messages.create({
    //   to: req.body.mobileNo,
    //   from: config.twilio.MOBILE_NUMBER,
    //   body: req.body.messageBody
    // });
    const client = new plivo.Client(config.plivo.ID, config.plivo.TOKEN);
    await client.messages.create(
      "9999988888",
      req.body.mobileNo,
      req.body.messageBody
    );
    console.log("Message sent**********");
    res.json({
      message: "Message sent!"
    });
  } catch (err) {
    console.log("Message not sent**********");
    res.json({
      message: "Message not sent!"
    });
  }
};
