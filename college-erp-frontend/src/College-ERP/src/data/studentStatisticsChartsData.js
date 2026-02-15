import { CheckCircleIcon, ClockIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

export const studentStatisticsChartsData = [
  {
    color: "blue",
    icon: CheckCircleIcon,
    title: "Attendance",
    value: "95%",
    footer: {
      value: "This month",
      label: "Attendance rate",
    },
  },
  {
    color: "green",
    icon: ArrowUpIcon,
    title: "Grade",
    value: "A",
    footer: {
      value: "Last term",
      label: "Average grade",
    },
  },
  // Add more card data as needed
];
