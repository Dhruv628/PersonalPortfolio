const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());


const port= process.env.PORT || 5000;



app.use("/", router);
app.listen(port, () => console.log("Server Running"));



const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user :"reactshopecommerce@gmail.com",
      pass :"jbasnsvkukreoxai"
  }
})

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: email,
    to: "reactshopecommerce@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  let success=false;
  transporter.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      success=true
      console.log("success",success)
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
