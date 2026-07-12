export type PulseStatus = "healthy" | "busy" | "attention";

export type BusinessPulse = {
  status: PulseStatus;
  title: string;
  message: string;
};

export function getBusinessPulse(): BusinessPulse {
  return {
    status: "healthy",
    title: "Business Healthy",
    message:
      "Everything is under control. One customer needs your attention. EMBUR is handling the rest.",
  };
}