import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { SwapDao } from "../database/swap.dao";
import { SwapState } from "../enums/swapState.enum";
import { userRepository } from "../app";

export const swapEmail = async (swap: SwapDao): Promise<void> => {
  let recipitent;
  let subject = "";
  let title = "";
  let body = "";

  switch (swap.state) {
    case SwapState.OFFERED:
      recipitent = swap.receiver;
      subject = "You have a new swap offer";
      title = "New swap offer";
      body =
        "A user has offered you a swap. Please check your swap offers to accept or reject the swap 👀";
      break;
    case SwapState.REJECTED:
      recipitent = swap.creator;
      subject = "Your swap offer has been rejected";
      title = "Swap offer rejected";
      body = "The recipient of your swap offer has rejected it 😞";
      break;
    case SwapState.CANCELLED:
      recipitent = swap.receiver;
      subject = "Swap offer has been cancelled";
      title = "Swap offer cancelled";
      body = "The creator of your swap offer has cancelled it 😞";
      break;
    case SwapState.EXECUTED:
      recipitent = swap.creator;
      subject = "Your swap offer has been accepted";
      title = "Swap offer accepted";
      body = "The recipient of your swap offer has accepted it 🎉";
      break;
  }

  const user = await userRepository.findByPk(recipitent);
  if (user?.receiveNotifications && user?.email) {
    const template = fs
      .readFileSync(
        path.join(__dirname, "..", "resources", "email-template.html")
      )
      .toString();
    const content = template
      .replace("{{title}}", title)
      .replace("{{body}}", body)
      .replace("{{link}}", `${process.env.WEB_URL!}swap/${swap.id}`);
    sendEmail(user.email, subject, content);
  }
};

const sendEmail = async (
  to: string,
  subject: string,
  content: string
): Promise<void> => {
  const username = process.env.EMAIL_USERNAME;
  const password = process.env.EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
  });

  var mailOptions = {
    from: `"gotSwapz" <${username}>`,
    to,
    subject,
    html: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
