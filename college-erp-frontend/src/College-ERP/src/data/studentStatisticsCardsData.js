export const studentStatisticsCardsData = [
    {
      color: "blue",
      chart: {
        series: [{ name: "Attendance", data: [75, 80, 90, 95, 100] }],
        options: {
          chart: { type: "line" },
          xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
        },
      },
      title: "Attendance Over Time",
      description: "Monthly attendance rate",
      footer: "Updated 1 day ago",
    },
    // Add more chart data as needed
  ];
