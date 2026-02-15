import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Total Student",
    value: "200",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last year",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Today's Present",
    value: "50",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "New Student",
    value: "100",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Student graduated",
    value: "10430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than last year",
    },
  },
];

export default statisticsCardsData;
