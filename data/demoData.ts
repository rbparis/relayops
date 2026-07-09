import type { ActivityItem, Lead, Metric, SettingItem } from "@/types";

export const metrics: Metric[] = [
  { value: "12", label: "Leads Today" },
  { value: "6", label: "Recovered Calls" },
  { value: "4", label: "Appointments" },
  { value: "2", label: "Need Attention" },
];

export const leads: Lead[] = [
  {
    id: 1,
    name: "John Smith",
    service: "Emergency AC Repair",
    status: "Booked",
    value: "$750–$1,500",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    service: "New Install Estimate",
    status: "Follow-up Sent",
    value: "$2,000–$5,000",
  },
  {
    id: 3,
    name: "Mike Brown",
    service: "No Cooling",
    status: "Waiting",
    value: "$1,250",
  },
];

export const activity: ActivityItem[] = [
  { id: 1, text: "John Smith booked emergency AC repair." },
  { id: 2, text: "Sarah Johnson received install estimate follow-up." },
  { id: 3, text: "Mike Brown still needs callback." },
];

export const settings: SettingItem[] = [
  { id: 1, label: "Business Name: Mike's Heating & Air" },
  { id: 2, label: "After-hours follow-up: Enabled" },
  { id: 3, label: "Review requests: Enabled" },
];