import nodemailer from "nodemailer";

export class MailService {
  private static transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "smartdoorbellsystem.site@gmail.com", //server mail
      pass: "zyztcbbbvnrejtgz", //server mail password
    },
  });

  private static async sendEmail(to: string, subject: string, text: string) {
    var content = "";
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <span style="color: black">${text}</span>
            </div>
        </div>
    `;
    var mainOptions = {
      from: "Online Meeting Verification",
      to,
      subject,
      text,
      html: content,
    };
    await this.transport.sendMail(mainOptions);
  }

  public static async sendCameraNotificationEmail(
    to: string,
    title: string,
    detail: string,
    image: string
  ) {
    const text = `<div>${detail}</div><div><img src="${image}" /></div>`;
    await this.sendEmail(to, title, text);
  }
}
