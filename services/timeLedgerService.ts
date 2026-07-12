export type TimeLedgerEntry = {
  id: number;
  time: string;
  title: string;
  minutesReturned: number;
  description: string;
};

const entries: TimeLedgerEntry[] = [
  {
    id: 1,
    time: "7:08 AM",
    title: "Recovered Missed Call",
    minutesReturned: 18,
    description:
      "EMBUR answered, captured the customer, and scheduled a callback.",
  },
  {
    id: 2,
    time: "8:14 AM",
    title: "Appointment Confirmed",
    minutesReturned: 11,
    description:
      "The customer confirmed automatically without office involvement.",
  },
  {
    id: 3,
    time: "9:41 AM",
    title: "Review Request Sent",
    minutesReturned: 4,
    description:
      "EMBUR requested a review after the completed service.",
  },
  {
    id: 4,
    time: "10:32 AM",
    title: "Customer Follow-up",
    minutesReturned: 13,
    description:
      "A waiting customer received an automatic follow-up message.",
  },
];

export function getTimeLedger() {
  return entries;
}

export function getTodayTimeReturned() {
  return entries.reduce(
    (total, item) => total + item.minutesReturned,
    0
  );
}