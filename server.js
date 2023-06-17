const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());


const port=process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('build'));
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'build','index.html')));
}


app.use("/", router);
app.listen(port, () => console.log("Server Running"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);


const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'tremayne.lynch52@ethereal.email',
      pass: 'BcZPFjs1bpVuK2x9KN'
  }
});

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
    to: "sharmaaniket682@gmail.com",
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
