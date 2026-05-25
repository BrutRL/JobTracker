import { User } from "../model/userModel.js";
import { Application } from "../model/applicationModel.js";
import { Interview } from "../model/interviewModel.js";
import { resend } from "../middleware/nodemailer.js";
import { MOTIVATIONAL_MESSAGES } from "../utils/MOTIVATIONAL_MESSAGES.js";

export function weeklySummary(agenda) {
  agenda.define("weekly summary", async (job) => {
    try {
      const users = await User.find({ emailReminders: true });

      for (const user of users) {
        const now = new Date();
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

        const weeklyApps = await Application.find({
          userId: user._id,
          appliedAt: { $gte: weekAgo },
        });

        const followUpApps = await Application.find({
          userId: user._id,
          status: "applied",
          appliedAt: { $lte: weekAgo },
        });

        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcomingInterviews = await Interview.find({
          userId: user._id,
          scheduledAt: { $gte: now, $lte: nextWeek },
          outcome: "pending",
        }).populate("applicationId", "company role");

        const motivation =
          MOTIVATIONAL_MESSAGES[
            Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)
          ];

        const statusColors = {
          wishlist: "#6E7681",
          applied: "#4A90D9",
          interview: "#F0A500",
          offer: "#3DDC84",
          rejected: "#E05C6B",
        };

        await resend.emails.send({
          from: "JobQuest <onboarding@resend.dev>",
          to: user.email,
          subject: `Your Weekly Job Search Summary Report`,
          html: `
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0D1117; padding:20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#161B22; padding:30px; border-radius:8px; font-family:Arial, sans-serif; color:#E6EDF3;">
                    <tr>
                      <td style="padding-bottom:20px; border-bottom:1px solid #21262D;">
                        <h2 style="color:#F0A500; margin:0; font-family:monospace;">JobQuest</h2>
                        <p style="color:#6E7681; font-size:13px; margin:4px 0 0 0;">Weekly Job Application Summary · ${now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 0 0 0;">
                        <p style="font-size:16px; margin:0 0 20px 0;">Hi <strong>${user.name}</strong>, here's your weekly job search summary</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom:24px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="33%" style="text-align:center; background:#21262D; padding:16px; border-radius:8px;">
                              <div style="font-size:28px; font-weight:bold; color:#F0A500; font-family:monospace;">${weeklyApps.length}</div>
                              <div style="font-size:12px; color:#6E7681; margin-top:4px;">Applied this week</div>
                            </td>
                            <td width="4%"></td>
                            <td width="33%" style="text-align:center; background:#21262D; padding:16px; border-radius:8px;">
                              <div style="font-size:28px; font-weight:bold; color:#F0A500; font-family:monospace;">${followUpApps.length}</div>
                              <div style="font-size:12px; color:#6E7681; margin-top:4px;">Need follow up</div>
                            </td>
                            <td width="4%"></td>
                            <td width="33%" style="text-align:center; background:#21262D; padding:16px; border-radius:8px;">
                              <div style="font-size:28px; font-weight:bold; color:#F0A500; font-family:monospace;">${upcomingInterviews.length}</div>
                              <div style="font-size:12px; color:#6E7681; margin-top:4px;">Interviews this week</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    ${
                      weeklyApps.length > 0
                        ? `
                    <tr>
                      <td style="padding-bottom:24px;">
                        <h3 style="color:#fff; font-size:14px; margin:0 0 12px 0;">Applied this week</h3>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#21262D; border-radius:8px; overflow:hidden;">
                          ${weeklyApps
                            .map(
                              (app, i) => `
                            <tr style="border-bottom:${i < weeklyApps.length - 1 ? "1px solid #30363D" : "none"};">
                              <td style="padding:10px 14px;">
                                <div style="font-size:13px; color:#fff; font-weight:500;">${app.company}</div>
                                <div style="font-size:12px; color:#6E7681;">${app.role}</div>
                              </td>
                              <td style="padding:10px 14px; text-align:right;">
                                <span style="background:${statusColors[app.status]}20; color:${statusColors[app.status]}; font-size:11px; padding:2px 8px; border-radius:20px;">${app.status}</span>
                              </td>
                            </tr>
                          `,
                            )
                            .join("")}
                        </table>
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      followUpApps.length > 0
                        ? `
                    <tr>
                      <td style="padding-bottom:24px;">
                        <h3 style="color:#fff; font-size:14px; margin:0 0 12px 0;">⚡ Consider following up</h3>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#21262D; border-radius:8px; overflow:hidden;">
                          ${followUpApps
                            .map(
                              (app, i) => `
                            <tr style="border-bottom:${i < followUpApps.length - 1 ? "1px solid #30363D" : "none"};">
                              <td style="padding:10px 14px;">
                                <div style="font-size:13px; color:#fff; font-weight:500;">${app.company}</div>
                                <div style="font-size:12px; color:#6E7681;">${app.role}</div>
                              </td>
                              <td style="padding:10px 14px; text-align:right;">
                                <span style="font-size:11px; color:#6E7681;">
                                  ${Math.floor((new Date() - new Date(app.appliedAt)) / (1000 * 60 * 60 * 24))} days ago
                                </span>
                              </td>
                            </tr>
                          `,
                            )
                            .join("")}
                        </table>
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      upcomingInterviews.length > 0
                        ? `
                    <tr>
                      <td style="padding-bottom:24px;">
                        <h3 style="color:#fff; font-size:14px; margin:0 0 12px 0;">🎯 Upcoming interviews</h3>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#21262D; border-radius:8px; overflow:hidden;">
                          ${upcomingInterviews
                            .map(
                              (interview, i) => `
                            <tr style="border-bottom:${i < upcomingInterviews.length - 1 ? "1px solid #30363D" : "none"};">
                              <td style="padding:10px 14px;">
                                <div style="font-size:13px; color:#fff; font-weight:500;">${interview.applicationId?.company || "Company"}</div>
                                <div style="font-size:12px; color:#6E7681;">${interview.round || "Interview"} · ${interview.format}</div>
                              </td>
                              <td style="padding:10px 14px; text-align:right;">
                                <span style="font-size:11px; color:#F0A500;">
                                  ${new Date(interview.scheduledAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </td>
                            </tr>
                          `,
                            )
                            .join("")}
                        </table>
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    <tr>
                      <td style="padding:20px; background:#F0A50010; border-radius:8px; border:1px solid #F0A50030;">
                        <p style="color:#F0A500; font-size:13px; margin:0; font-style:italic;">"${motivation}"</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:24px; text-align:center;">
                        <a href="${process.env.FRONT_END_URL}/user/board"
                          style="background-color:#F0A500; color:#0D1117; padding:12px 32px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block; font-size:14px;">
                          View your board
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:24px; border-top:1px solid #21262D;">
                        <p style="font-size:12px; color:#6E7681; margin:0; text-align:center;">
                          You're receiving this because you have email reminders enabled.<br/>
                          <a href="${process.env.FRONT_END_URL}/user/reminders" style="color:#F0A500;">Manage preferences</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          `,
        });

        console.log(`Weekly Summary Successfully sent to ${user.email}`);
      }
    } catch (error) {
      console.error("Weekly Summary error:", error);
    }
  });
}
