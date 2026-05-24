import PDFDocument from "pdfkit";
import { Application } from "../model/applicationModel.js";
import { User } from "../model/userModel.js";

// ── palette (matches JobQuest UI) ────────────────────────────────────────────
const C = {
  bg: "#0D1117",
  surface: "#161B22",
  elevated: "#21262D",
  border: "#30363D",
  amber: "#F0A500",
  amberDim: "#F0A50030",
  blue: "#4A90D9",
  blueDim: "#4A90D920",
  green: "#3DDC84",
  greenDim: "#3DDC8420",
  red: "#E05C6B",
  redDim: "#E05C6B20",
  white: "#E6EDF3",
  muted: "#6E7681",
};

const STATUS = {
  wishlist: { label: "Wishlist", color: C.muted, bg: C.elevated },
  applied: { label: "Applied", color: C.blue, bg: "#1A2A3A" },
  interview: { label: "Interview", color: C.amber, bg: "#2A2010" },
  offer: { label: "Offer", color: C.green, bg: "#0F2A1A" },
  rejected: { label: "Rejected", color: C.red, bg: "#2A1218" },
};

const isPlaceholder = (role) => {
  if (!role) return true;
  const words = role.trim().split(/\s+/);
  const allLower = words.every(
    (w) => w === w.toLowerCase() && /^[a-z]+$/.test(w),
  );
  return allLower && words.length >= 3;
};

const isValidSalary = (min, max) =>
  (min != null && min >= 5000) || (max != null && max >= 5000);

const formatSalary = (min, max) => {
  if (!isValidSalary(min, max)) return null;
  const fmt = (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`);
  if (min && max && min !== max) return `P${fmt(min)} - P${fmt(max)}`;
  if (min) return `P${fmt(min)}`;
  if (max) return `P${fmt(max)}`;
  return null;
};

const rrect = (doc, x, y, w, h, r, fillColor, strokeColor) => {
  doc.save();
  if (fillColor) {
    doc.roundedRect(x, y, w, h, r).fillColor(fillColor).fill();
  }
  if (strokeColor) {
    doc
      .roundedRect(x, y, w, h, r)
      .lineWidth(0.5)
      .strokeColor(strokeColor)
      .stroke();
  }
  doc.restore();
};

export const exportPDF = async (req, res) => {
  try {
    const userId = req.userId;

    const [user, allApps] = await Promise.all([
      User.findById(userId).select("name email"),
      Application.find({ userId }).sort({ appliedAt: -1 }),
    ]);

    const applications = allApps.filter(
      (a) => a.company && a.role && !isPlaceholder(a.role),
    );

    const total = applications.length;
    const interviews = applications.filter(
      (a) => a.status === "interview",
    ).length;
    const offers = applications.filter((a) => a.status === "offer").length;
    const responded = applications.filter(
      (a) => !["wishlist", "applied"].includes(a.status),
    ).length;
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

    const doc = new PDFDocument({ margin: 0, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="jobquest-report.pdf"`,
    );
    doc.pipe(res);

    const PW = doc.page.width;
    const PH = doc.page.height;
    const ML = 44;
    const MR = 44;
    const CW = PW - ML - MR;

    // full dark background
    doc.rect(0, 0, PW, PH).fillColor(C.bg).fill();

    // ── header ───────────────────────────────────────────
    doc.rect(0, 0, PW, 76).fillColor(C.surface).fill();
    doc.rect(0, 76, PW, 1).fillColor(C.border).fill();
    doc.rect(0, 0, 3, 76).fillColor(C.amber).fill();

    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .fillColor(C.amber)
      .text("JobQuest", ML, 20);
    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(C.muted)
      .text("Application Activity Report", ML, 44);

    const dateStr = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor(C.white)
      .text(user.name.toUpperCase(), 0, 20, { align: "right", width: PW - MR });
    doc
      .fontSize(8.5)
      .font("Helvetica")
      .fillColor(C.muted)
      .text(user.email, 0, 36, { align: "right", width: PW - MR })
      .text(dateStr, 0, 50, { align: "right", width: PW - MR });

    // ── summary cards ─────────────────────────────────────
    let y = 94;

    doc
      .fontSize(7)
      .font("Helvetica-Bold")
      .fillColor(C.muted)
      .text("SUMMARY", ML, y, { characterSpacing: 1 });
    y += 11;

    const cards = [
      { label: "Applications\nSubmitted", value: String(total), color: C.blue },
      { label: "Response\nRate", value: `${responseRate}%`, color: C.blue },
      {
        label: "Interviews\nin Progress",
        value: String(interviews),
        color: C.amber,
      },
      { label: "Offers\nReceived", value: String(offers), color: C.green },
    ];

    const cardW = (CW - 9) / 4;
    const cardH = 66;

    cards.forEach((card, i) => {
      const cx = ML + i * (cardW + 3);
      rrect(doc, cx, y, cardW, cardH, 5, C.surface, C.border);
      doc.rect(cx, y, cardW, 2).fillColor(card.color).fill();
      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor(card.color)
        .text(card.value, cx + 10, y + 10, { width: cardW - 20 });
      doc
        .fontSize(8)
        .font("Helvetica")
        .fillColor(C.muted)
        .text(card.label, cx + 10, y + 40, { width: cardW - 20, lineGap: 1 });
    });

    y += cardH + 14;

    // ── highlights bar ────────────────────────────────────
    if (offers > 0 || interviews > 0) {
      rrect(doc, ML, y, CW, 28, 5, C.surface, C.border);
      doc.rect(ML, y, 3, 28).fillColor(C.amber).fill();

      let msg = "";
      if (offers > 0 && interviews > 0)
        msg = `${offers} offer${offers > 1 ? "s" : ""} received  +  ${interviews} active interview${interviews > 1 ? "s" : ""} in progress`;
      else if (offers > 0)
        msg = `${offers} offer${offers > 1 ? "s" : ""} received`;
      else
        msg = `${interviews} active interview${interviews > 1 ? "s" : ""} in progress`;

      doc
        .fontSize(9)
        .font("Helvetica-Bold")
        .fillColor(C.amber)
        .text(msg, ML + 12, y + 10, { width: CW - 20 });

      y += 42;
    }

    // ── status breakdown ──────────────────────────────────
    doc
      .fontSize(7)
      .font("Helvetica-Bold")
      .fillColor(C.muted)
      .text("STATUS BREAKDOWN", ML, y, { characterSpacing: 1 });
    y += 11;

    const statuses = ["applied", "interview", "offer", "wishlist", "rejected"];
    const sbW = (CW - (statuses.length - 1) * 3) / statuses.length;
    const sbH = 44;

    statuses.forEach((status, i) => {
      const sx = ML + i * (sbW + 3);
      const st = STATUS[status];
      const count = applications.filter((a) => a.status === status).length;

      rrect(doc, sx, y, sbW, sbH, 5, C.surface, C.border);
      doc
        .fontSize(18)
        .font("Helvetica-Bold")
        .fillColor(st.color)
        .text(String(count), sx, y + 6, { width: sbW, align: "center" });
      doc
        .fontSize(7.5)
        .font("Helvetica")
        .fillColor(C.muted)
        .text(st.label, sx, y + 28, { width: sbW, align: "center" });
    });

    y += sbH + 16;

    // ── applications table ────────────────────────────────
    doc
      .fontSize(7)
      .font("Helvetica-Bold")
      .fillColor(C.muted)
      .text("APPLICATIONS", ML, y, { characterSpacing: 1 });
    y += 11;

    const cols = [
      { label: "#", w: 22, align: "center" },
      { label: "Company", w: 112, align: "left" },
      { label: "Role", w: 148, align: "left" },
      { label: "Status", w: 70, align: "center" },
      { label: "Applied", w: 78, align: "left" },
      { label: "Salary", w: CW - 22 - 112 - 148 - 70 - 78, align: "left" },
    ];

    const thH = 28;
    rrect(doc, ML, y, CW, thH, 5, C.elevated, null);

    let hx = ML;
    cols.forEach((col) => {
      doc
        .fontSize(8.5)
        .font("Helvetica-Bold")
        .fillColor(C.white)
        .text(col.label, hx + 6, y + 10, {
          width: col.w - 6,
          align: col.align,
        });
      hx += col.w;
    });
    y += thH;

    const FS = 8.5;
    const PAD = 8;
    const LINE_H = FS * 1.4;

    const estLines = (text, colW) => {
      const cpl = Math.max(1, Math.floor((colW - 14) / (FS * 0.52)));
      return Math.ceil(text.length / cpl);
    };

    const order = ["offer", "interview", "applied", "wishlist", "rejected"];
    const sorted = [...applications].sort(
      (a, b) => order.indexOf(a.status) - order.indexOf(b.status),
    );

    sorted.forEach((app, index) => {
      const salary = formatSalary(app.salaryMin, app.salaryMax);
      const appliedDate = app.appliedAt
        ? new Date(app.appliedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "-";

      const rowData = [
        String(index + 1),
        app.company,
        app.role,
        STATUS[app.status]?.label ?? app.status,
        appliedDate,
        salary ?? "-",
      ];

      const maxLines = Math.max(
        ...rowData.map((text, i) => estLines(text, cols[i].w)),
      );
      const rowH = Math.max(30, maxLines * LINE_H + PAD * 2);

      if (y + rowH > PH - 50) {
        drawFooter(doc, PW, PH, ML, MR, C);
        doc.addPage();
        doc.rect(0, 0, PW, PH).fillColor(C.bg).fill();
        y = 44;

        rrect(doc, ML, y, CW, thH, 5, C.elevated, null);
        let rhx = ML;
        cols.forEach((col) => {
          doc
            .fontSize(8.5)
            .font("Helvetica-Bold")
            .fillColor(C.white)
            .text(col.label, rhx + 6, y + 10, {
              width: col.w - 6,
              align: col.align,
            });
          rhx += col.w;
        });
        y += thH;
      }

      const isRejected = app.status === "rejected";
      const rowBg = index % 2 === 0 ? C.surface : C.elevated;

      doc.rect(ML, y, CW, rowH).fillColor(rowBg).fill();
      doc
        .rect(ML, y + rowH - 0.5, CW, 0.5)
        .fillColor(C.border)
        .fill();

      let rx = ML;
      rowData.forEach((text, i) => {
        const col = cols[i];

        if (i === 3) {
          const st = STATUS[app.status] ?? {
            color: C.muted,
            bg: C.elevated,
            label: text,
          };
          const pillW = col.w - 12;
          const pillH = 17;
          const px = rx + 6;
          const py = y + (rowH - pillH) / 2;
          rrect(
            doc,
            px,
            py,
            pillW,
            pillH,
            pillH / 2,
            isRejected ? C.elevated : st.bg,
            null,
          );
          doc
            .fontSize(7.5)
            .font("Helvetica-Bold")
            .fillColor(isRejected ? C.muted : st.color)
            .text(text, px, py + 5, { width: pillW, align: "center" });
        } else {
          const textColor =
            i === 0
              ? C.muted
              : i === 1
                ? isRejected
                  ? C.muted
                  : C.white
                : isRejected
                  ? C.muted
                  : C.white;

          doc
            .fontSize(FS)
            .font(i === 1 ? "Helvetica-Bold" : "Helvetica")
            .fillColor(textColor)
            .text(text, rx + 6, y + PAD, {
              width: col.w - 12,
              align: col.align,
              ellipsis: true,
            });
        }
        rx += col.w;
      });

      y += rowH;
    });

    drawFooter(doc, PW, PH, ML, MR, C);
    doc.end();
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};

function drawFooter(doc, PW, PH, ML, MR, C) {
  const fy = PH - 32;
  doc
    .rect(0, fy - 1, PW, PH - fy + 1)
    .fillColor(C.surface)
    .fill();
  doc
    .rect(0, fy - 1, PW, 1)
    .fillColor(C.border)
    .fill();
  doc
    .fontSize(8)
    .font("Helvetica")
    .fillColor(C.muted)
    .text("JobQuest  —  Job Application Tracker", ML, fy + 10);
  doc
    .fontSize(8)
    .fillColor(C.muted)
    .text("Confidential", 0, fy + 10, { align: "right", width: PW - MR });
}
