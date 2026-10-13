interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  role?: string;
  "aria-labelledby"?: string;
}

export const Card = ({
  children,
  className = "",
  hover = false,
  onClick,
  role,
  "aria-labelledby": ariaLabelledby,
}: CardProps) => {
  return (
    <div
      className={`
        bg-white rounded-xl border border-slate-200 shadow-sm
        ${hover ? "hover:shadow-md hover:border-slate-300 transition-shadow transition-colors cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
      role={role}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-5 py-4 border-b border-slate-100 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-5 py-4 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-5 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl ${className}`}>{children}</div>
);

export const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}