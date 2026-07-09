type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "dark";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const base = "rounded-xl px-5 py-3 font-semibold transition";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border bg-white text-slate-900 hover:bg-slate-50",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}