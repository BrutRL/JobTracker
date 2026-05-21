import { Application } from "../model/applicationModel.js";
import { Interview } from "../model/interviewModel.js";

const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

export const dashboard = async (req, res) => {
  try {
    const { userId } = req;

    const [applications, interviews] = await Promise.all([
      Application.find({ userId }),
      Interview.find({ userId }),
    ]);

    const total = applications.length;
    const responded = applications.filter(
      (a) => !["wishlist", "applied"].includes(a.status),
    ).length;

    const statusBreakdown = applications.reduce(
      (acc, a) => ({ ...acc, [a.status]: (acc[a.status] || 0) + 1 }),
      { wishlist: 0, applied: 0, interview: 0, offer: 0, rejected: 0 },
    );

    const weeklyData = Object.entries(
      applications.reduce((acc, a) => {
        const key = `${new Date(a.appliedAt).getFullYear()}-W${getWeekNumber(a.appliedAt)}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    )
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([week, count]) => ({ week, count }));

    const topTags = Object.entries(
      applications
        .flatMap((a) => a.tags.map((t) => t.trim()))
        .reduce((acc, t) => {
          if (t) acc[t] = (acc[t] || 0) + 1;
          return acc;
        }, {}),
    )
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    const interviewOutcomes = interviews.reduce(
      (acc, i) => ({ ...acc, [i.outcome]: (acc[i.outcome] || 0) + 1 }),
      { passed: 0, pending: 0, rejected: 0, no_show: 0 },
    );

    const recentActivity = [...applications]
      .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
      .slice(0, 5)
      .map(({ _id, company, role, status, appliedAt }) => ({
        _id,
        company,
        role,
        status,
        appliedAt,
      }));

    res.status(200).json({
      ok: true,
      data: {
        stats: {
          totalApplied: total,
          responseRate: total > 0 ? Math.round((responded / total) * 100) : 0,
          activeInterviews: statusBreakdown.interview,
          offers: statusBreakdown.offer,
        },
        statusBreakdown,
        recentActivity,
        weeklyData,
        topTags,
        interviewOutcomes,
      },
    });
  } catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};
