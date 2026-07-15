import type { Lead } from "@/types";

export type AtlasRiskLevel =
  | "critical"
  | "high"
  | "medium"
  | "low";

export type AtlasActionType =
  | "call"
  | "text"
  | "follow_up"
  | "confirm"
  | "review";

export interface AtlasRecommendation {
  id: string;
  customerId?: Lead["id"];
  title: string;
  description: string;
  actionType: AtlasActionType;
  riskLevel: AtlasRiskLevel;
  estimatedValue: number;
}

export interface AtlasForecast {
  pipeline: number;
  expectedRevenue: number;
  expectedAppointments: number;
}

export interface AtlasPriority {
  customer: Lead;
  score: number;
  confidence: number;
  riskLevel: AtlasRiskLevel;
  estimatedValue: number;
  reason: string;
  recommendedAction: string;
}

export interface AtlasMetrics {
  totalCustomers: number;
  waitingCustomers: number;
  bookedCustomers: number;
  followUpCustomers: number;
}

export interface AtlasSnapshot {
  businessHealth: number;
  businessHealthSummary: string;
  revenueAtRisk: number;
  topPriority: AtlasPriority;
  recommendations: AtlasRecommendation[];
  forecast: AtlasForecast;
  metrics: AtlasMetrics;
}