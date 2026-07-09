export type LeadStatus = "Booked" | "Follow-up Sent" | "Waiting";

export interface Lead {
  id: number;
  name: string;
  service: string;
  status: LeadStatus;
  value: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ActivityItem {
  id: number;
  text: string;
}

export interface SettingItem {
  id: number;
  label: string;
}