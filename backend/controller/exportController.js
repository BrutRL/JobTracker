import PDFDocument from "pdfkit";
import { Application } from "../model/applicationModel.js";
import { User } from "../model/userModel.js";

export const exportPDF = async (req, res) => {
  try {
    const userId = req.userId;

    const [user, applications] = await Promise.all([
      User.findById(userId).select("name email"),
      Application.find({ userId }).sort({ appliedAt: -1 }),
    ]);

    const total = applications.length;
    const responded = applications.filter(
      (a) => !["wishlist", "applied"].includes(a.status),
    ).length;
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;
    const activeInterviews = applications.filter(
      (a) => a.status === "interview",
    ).length;
    const offers = applications.filter((a) => a.status === "offer").length;

    const statusBreakdown = applications.reduce(
      (acc, a) => ({ ...acc, [a.status]: (acc[a.status] || 0) + 1 }),
      { wishlist: 0, applied: 0, interview: 0, offer: 0, rejected: 0 },
    );

    const doc = new PDFDocument({ margin: 50, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="jobquest-report.pdf"`,
    );

    doc.pipe(res);

    const W = doc.page.width - 100;
    const gray = "#6b7280";
    const dark = "#1a1a1a";
    const light = "#f9fafb";
    const border = "#e5e7eb";

    // ── header ──────────────────────────────────────────
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .fillColor(dark)
      .text("JobQuest", 50, 50);
    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor(gray)
      .text("Job Application Report", 50, 75);

    const date = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    doc
      .fontSize(10)
      .fillColor(gray)
      .text(`${date}`, 50, 50, { align: "right" })
      .text(user.name, 50, 63, { align: "right" })
      .text(user.email, 50, 76, { align: "right" });

    doc
      .moveTo(50, 100)
      .lineTo(50 + W, 100)
      .lineWidth(2)
      .strokeColor(dark)
      .stroke();

    // ── summary stats ────────────────────────────────────
    let y = 115;
    doc
      .fontSize(9)
      .font("Helvetica-Bold")
      .fillColor(gray)
      .text("SUMMARY", 50, y);

    y += 14;
    const statW = W / 4;
    const stats = [
      { label: "Total Applied", value: total, sub: "applications" },
      {
        label: "Response Rate",
        value: `${responseRate}%`,
        sub: "of applications",
      },
      {
        label: "Active Interviews",
        value: activeInterviews,
        sub: "in progress",
      },
      { label: "Offers", value: offers, sub: "received" },
    ];

    doc.rect(50, y, W, 70).fillColor(light).fill();
    doc.rect(50, y, W, 70).lineWidth(0.5).strokeColor(border).stroke();

    stats.forEach((stat, i) => {
      const x = 50 + i * statW;
      if (i > 0) {
        doc
          .moveTo(x, y)
          .lineTo(x, y + 70)
          .lineWidth(0.5)
          .strokeColor(border)
          .stroke();
      }
      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor(gray)
        .text(stat.label, x + 10, y + 10);
      doc
        .fontSize(20)
        .font("Helvetica-Bold")
        .fillColor(dark)
        .text(String(stat.value), x + 10, y + 24);
      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor(gray)
        .text(stat.sub, x + 10, y + 50);
    });

    // ── status breakdown ─────────────────────────────────
    y += 85;
    doc
      .fontSize(9)
      .font("Helvetica-Bold")
      .fillColor(gray)
      .text("STATUS BREAKDOWN", 50, y);

    y += 14;
    const statuses = ["wishlist", "applied", "interview", "offer", "rejected"];
    const breakW = W / 5;

    statuses.forEach((status, i) => {
      const x = 50 + i * breakW;
      doc
        .rect(x + 2, y, breakW - 4, 48)
        .lineWidth(0.5)
        .strokeColor(border)
        .stroke();
      doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .fillColor(dark)
        .text(String(statusBreakdown[status]), x + 2, y + 8, {
          width: breakW - 4,
          align: "center",
        });
      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor(gray)
        .text(status.charAt(0).toUpperCase() + status.slice(1), x + 2, y + 30, {
          width: breakW - 4,
          align: "center",
        });
    });

    // ── applications table ───────────────────────────────
    y += 65;
    doc
      .fontSize(9)
      .font("Helvetica-Bold")
      .fillColor(gray)
      .text("APPLICATIONS", 50, y);

    y += 14;

    // Applied column is 80px wide to fit "May 21, 2026" on one line
    const cols = [
      { label: "#", width: 25 },
      { label: "Company", width: 105 },
      { label: "Role", width: 125 },
      { label: "Status", width: 65 },
      { label: "Applied", width: 80 },
      { label: "Salary Range", width: W - 400 },
    ];

    // ── table header ─────────────────────────────────────
    const headerH = 24;
    doc.rect(50, y, W, headerH).fillColor(light).fill();
    doc.rect(50, y, W, headerH).lineWidth(0.5).strokeColor(border).stroke();

    let x = 50;
    cols.forEach((col) => {
      doc
        .fontSize(9)
        .font("Helvetica-Bold")
        .fillColor(gray)
        .text(col.label, x + 8, y + 8, { width: col.width - 8 });
      x += col.width;
    });

    y += headerH;

    // ── table rows ────────────────────────────────────────
    // Estimate how many lines a string will wrap to inside a column
    const estimateLines = (text, colWidth) => {
      const avgCharW = 9 * 0.52; // font-size 9, Helvetica approximation
      const usableWidth = colWidth - 12;
      const charsPerLine = Math.max(1, Math.floor(usableWidth / avgCharW));
      return Math.ceil(text.length / charsPerLine);
    };

    const lineH = 11; // height per line at font-size 9
    const padV = 12; // total vertical padding (top + bottom)
    const minRowH = 28;

    applications.forEach((app, index) => {
      const salary =
        app.salaryMin != null &&
        app.salaryMin > 0 &&
        app.salaryMax != null &&
        app.salaryMax > 0
          ? `${(app.salaryMin / 1000).toFixed(0)}k – ${(app.salaryMax / 1000).toFixed(0)}k`
          : app.salaryMin != null && app.salaryMin > 0
            ? `${(app.salaryMin / 1000).toFixed(0)}k`
            : "—";

      const appliedDate = app.appliedAt
        ? new Date(app.appliedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—";

      const rowData = [
        String(index + 1),
        app.company,
        app.role,
        app.status.charAt(0).toUpperCase() + app.status.slice(1),
        appliedDate,
        salary,
      ];

      // Dynamic row height: grow to fit the tallest wrapping cell
      const maxLines = Math.max(
        ...rowData.map((text, i) => estimateLines(text, cols[i].width)),
      );
      const rowH = Math.max(minRowH, maxLines * lineH + padV);

      if (y > doc.page.height - 80) {
        doc.addPage();
        y = 50;
      }

      if (index % 2 === 0) {
        doc.rect(50, y, W, rowH).fillColor("#fafafa").fill();
      }
      doc.rect(50, y, W, rowH).lineWidth(0.5).strokeColor("#f3f4f6").stroke();

      x = 50;
      rowData.forEach((text, i) => {
        doc
          .fontSize(9)
          .font(i === 1 ? "Helvetica-Bold" : "Helvetica")
          .fillColor(i === 0 ? gray : dark)
          .text(text, x + 8, y + padV / 2, {
            width: cols[i].width - 12,
            ellipsis: false,
          });
        x += cols[i].width;
      });

      y += rowH;
    });

    // ── footer ───────────────────────────────────────────
    doc
      .moveTo(50, y + 12)
      .lineTo(50 + W, y + 12)
      .lineWidth(0.5)
      .strokeColor(border)
      .stroke();
    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(gray)
      .text("JobQuest — Job Application Tracker", 50, y + 20)
      .text("Page 1 of 1", 50, y + 20, { align: "right" });

    doc.end();
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
