import { all } from "@/tanstack/dashboardTanstack";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardSkeleton from "@/components/dashboardSkeleton";
const STATUS_COLORS = {
  wishlist: "#6E7681",
  applied: "#4A90D9",
  interview: "#F0A500",
  offer: "#3DDC84",
  rejected: "#E05C6B",
};

const OUTCOME_COLORS = {
  passed: "#3DDC84",
  pending: "#F0A500",
  rejected: "#E05C6B",
  no_show: "#6E7681",
};

const TAG_COLORS = [
  { bg: "#F0A50015", color: "#F0A500" },
  { bg: "#4A90D920", color: "#4A90D9" },
  { bg: "#3DDC8420", color: "#3DDC84" },
  { bg: "#6E768120", color: "#6E7681" },
  { bg: "#E05C6B20", color: "#E05C6B" },
];

export default function Dashboard() {
  const { data: analyticsData, isLoading } = all();
  const d = analyticsData?.data;
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const statusData = Object.entries(d?.statusBreakdown || {}).map(
    ([name, value]) => ({ name, value }),
  );

  const outcomeTotal = Object.values(d?.interviewOutcomes || {}).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 bg-[#0D1117]">
      <h1 className="text-[26px] text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Applied", value: d?.stats.totalApplied },
          { label: "Response Rate", value: `${d?.stats.responseRate}%` },
          { label: "Active Interviews", value: d?.stats.activeInterviews },
          { label: "Offers", value: d?.stats.offers },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-4"
          >
            <div className="text-[#6E7681] text-[13px] mb-1">{stat.label}</div>
            <div className="text-[#F0A500] text-[32px]">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* applications per week */}
        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
          <h2 className="text-white text-[16px] mb-4">Applications per week</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={d?.weeklyData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#21262D" />
              <XAxis
                dataKey="week"
                stroke="#6E7681"
                style={{ fontSize: "11px" }}
              />
              <YAxis stroke="#6E7681" style={{ fontSize: "11px" }} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#F0A500"
                strokeWidth={2}
                dot={{ fill: "#F0A500", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* status breakdown */}
        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
          <h2 className="text-white text-[16px] mb-4">Status breakdown</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {statusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{ backgroundColor: STATUS_COLORS[entry.name] }}
                  />
                  <span className="text-[#6E7681] text-[12px] capitalize">
                    {entry.name}
                  </span>
                  <span
                    className="text-[12px]"
                    style={{ color: STATUS_COLORS[entry.name] }}
                  >
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* recent activity */}
        <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
          <h2 className="text-white text-[16px] mb-4">Recent activity</h2>
          <div className="flex flex-col">
            {(d?.recentActivity || []).map((app) => (
              <div
                key={app._id}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#21262D] flex items-center justify-center text-white text-[11px] flex-shrink-0">
                    {app.company.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-[13px]">{app.company}</p>
                    <p className="text-[#6E7681] text-[11px]">
                      {app.role} ·{" "}
                      {new Date(app.appliedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full capitalize"
                  style={{
                    backgroundColor: `${STATUS_COLORS[app.status]}20`,
                    color: STATUS_COLORS[app.status],
                  }}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* top tags + outcomes */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
            <h2 className="text-white text-[16px] mb-3">Top tags</h2>
            <div className="flex flex-wrap gap-2">
              {(d?.topTags || []).map(({ tag, count }, index) => {
                const colorScheme = TAG_COLORS[index % TAG_COLORS.length];
                return (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: colorScheme.bg,
                      color: colorScheme.color,
                    }}
                  >
                    {tag} · {count}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="bg-[#161B22] border-[0.5px] border-white/10 rounded-lg p-5">
            <h2 className="text-white text-[16px] mb-3">Interview outcomes</h2>
            <div className="flex flex-col gap-3">
              {Object.entries(d?.interviewOutcomes || {}).map(
                ([outcome, count]) => (
                  <div key={outcome} className="flex items-center gap-3">
                    <span className="text-[#6E7681] text-[12px] w-16 capitalize">
                      {outcome.replace("_", " ")}
                    </span>
                    <div className="flex-1 bg-[#21262D] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width:
                            outcomeTotal > 0
                              ? `${Math.round((count / outcomeTotal) * 100)}%`
                              : "0%",
                          backgroundColor: OUTCOME_COLORS[outcome],
                        }}
                      />
                    </div>
                    <span
                      className="text-[12px] w-4 text-right"
                      style={{ color: OUTCOME_COLORS[outcome] }}
                    >
                      {count}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
