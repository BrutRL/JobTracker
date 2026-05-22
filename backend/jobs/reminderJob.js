import dotenv from "dotenv";
dotenv.config();
import { Reminder } from "../model/reminderModel.js";
import { User } from "../model/userModel.js";
import { Application } from "../model/applicationModel.js";
import { transporter } from "../middleware/nodemailer.js";

export function registerJobs(agenda) {
  agenda.define("send reminder", async (job) => {
    const { reminderId } = job.attrs.data;

    try {
      const reminder = await Reminder.findById(reminderId);
      if (!reminder || reminder.sent) {
        console.log("Reminder already sent or not found, skipping.");
        return;
      }

      const user = await User.findById(reminder.userId);
      const app = await Application.findById(reminder.applicationId);

      if (!user || !app) {
        console.log("User or application not found, skipping.");
        return;
      }

      if (!user.emailReminders) {
        console.log("User has email reminders disabled.");
        reminder.sent = true;
        await reminder.save();
        return;
      }

      console.log("Attempting to send email to:", user.email);
      await transporter.sendMail({
        from: `"JobQuest" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: `Reminder: ${app.company} — ${app.role}`,
        html: `
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D1117; padding:20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#161B22; padding:30px; border-radius:8px; font-family:Arial, sans-serif; color:#E6EDF3;">
                  <tr>
                    <td align="left" style="padding-bottom:20px;">
                      <h2 style="color:#F0A500; margin:0; font-family:monospace;">JobQuest</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="font-size:16px; margin:0 0 15px 0;">Hi <strong>${user.name}</strong>,</p>
                      <p style="font-size:16px; margin:0 0 20px 0;">
                        This is your <strong>${reminder.type}</strong> reminder for
                        <strong>${app.role}</strong> at <strong>${app.company}</strong>.
                      </p>
                      <table width="100%" cellpadding="8" cellspacing="0" style="background-color:#21262D; border-radius:6px; margin:0 0 20px 0;">
                        <tr>
                          <td style="font-size:14px; color:#8B949E;">Company</td>
                          <td style="font-size:14px; color:#E6EDF3;">${app.company}</td>
                        </tr>
                        <tr>
                          <td style="font-size:14px; color:#8B949E;">Role</td>
                          <td style="font-size:14px; color:#E6EDF3;">${app.role}</td>
                        </tr>
                        <tr>
                          <td style="font-size:14px; color:#8B949E;">Status</td>
                          <td style="font-size:14px; color:#F0A500;">${app.status}</td>
                        </tr>
                        <tr>
                          <td style="font-size:14px; color:#8B949E;">Type</td>
                          <td style="font-size:14px; color:#E6EDF3;">${reminder.type}</td>
                        </tr>
                      </table>
                      <div style="text-align:center; margin:30px 0;">
                        <a href="${process.env.FRONT_END_URL}/user"
                           style="background-color:#F0A500; color:#0D1117; padding:12px 24px; text-decoration:none; border-radius:5px; font-weight:bold; display:inline-block;">
                          View Application
                        </a>
                      </div>
                      <hr style="border:none; border-top:1px solid #21262D; margin:30px 0;">
                      <p style="font-size:14px; color:#8B949E; margin:0;">
                        Best regards,<br>
                        <strong style="color:#F0A500;">JobQuest Team</strong>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        `,
      });

      reminder.sent = true;
      await reminder.save();
    } catch (error) {
      console.error("Reminder job error:", error);
    }
  });
}
