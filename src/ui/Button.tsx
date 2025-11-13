interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  outline?: boolean;
}

export default function Button({ href, children, outline }: ButtonProps) {
  const base =
    "px-5 py-2 rounded-xl font-medium transition text-center inline-block";
  const filled =
    "bg-udo-primary text-white hover:bg-blue-700 shadow-sm hover:shadow-md";
  const outlined =
    "border border-udo-primary text-udo-primary hover:bg-udo-primary hover:text-white";

  return (
    <a href={href} className={`${base} ${outline ? outlined : filled}`}>
      {children}
    </a>
  );
}
