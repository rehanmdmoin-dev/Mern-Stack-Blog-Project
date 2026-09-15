"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark shadow-sm shadow-accent/20 disabled:bg-accent/50",
  secondary: "bg-accent-soft text-accent-dark hover:bg-accent-soft/70 disabled:opacity-50",
  ghost: "bg-transparent text-ink hover:bg-black/5 border border-border disabled:opacity-50",
  danger: "bg-danger-soft text-danger hover:bg-danger hover:text-white disabled:opacity-50",
  success: "bg-success-soft text-success hover:bg-success hover:text-white disabled:opacity-50",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; loading?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", loading, disabled, className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-control px-4 py-2 text-sm font-semibold transition-all duration-200 hover:brightness-105 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  )
);
Button.displayName = "Button";
export default Button;
