type StatusBadgeProps = {
  status: "Booked" | "Follow-up Sent" | "Waiting" | "High" | "Normal";
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Booked: "bg-green-100 text-green-700",
    "Follow-up Sent": "bg-blue-100 text-blue-700",
    Waiting: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-700",
    Normal: "bg-slate-100 text-slate-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}