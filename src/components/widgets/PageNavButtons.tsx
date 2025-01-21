import React from 'react';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationButtonProps {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  direction: 'back' | 'next';
}

const NavigationButton = ({
  href,
  onClick,
  disabled = false,
  className,
  children,
  direction,
}: NavigationButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      size='sm'
      className={cn(
        "relative group flex items-center ",
        "px-4 py-2 ",
        "bg-gradient-to-r from-orange-500 to-pink-500",
        "hover:from-orange-500 hover:to-pink-500",
        "border border-orange-500",
       
        "transition-all duration-100",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        direction === 'back' ? "pr-3 rounded-l-[1.1rem]" : "pl-3 rounded-r-[1.1rem]",
        className
      )}
    >
      {/* Background gradient effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-orange-500/10",
          "rounded-xl transition-opacity duration-300"
        )}
      />

      {/* Content with icons */}
      <div className={cn(
        "relative flex items-center ",
        direction === 'back' ? "flex-row" : "flex-row-reverse"
      )}>
        {direction === 'back' ? (
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        ) : (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
        <span className="text-sm font-medium">{children}</span>
      </div>
    </Button>
  );
};

interface PageNavigationProps {
  backHref?: string;
  nextHref?: string;
  onBackClick?: () => void;
  onNextClick?: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  backLabel?: string;
  nextLabel?: string;
  className?: string;
}

const PageNavigation = ({
  backHref,
  nextHref,
  onBackClick,
  onNextClick,
  backDisabled = false,
  nextDisabled = false,
  backLabel = "",
  nextLabel = "",
  className
}: PageNavigationProps) => {
  return (
    <div className={cn(
      "flex items-center justify-start w-full gap-1",
      className
    )}>
      <NavigationButton
        href={backHref}
        onClick={onBackClick}
        disabled={backDisabled}
        direction="back"
      >
        {backLabel}
      </NavigationButton>

      <NavigationButton
        href={nextHref}
        onClick={onNextClick}
        disabled={nextDisabled}
        direction="next"
      >
        {nextLabel}
      </NavigationButton>
    </div>
  );
};

// Export individual buttons for more flexibility
export const BackButton = (props: Omit<NavigationButtonProps, 'direction'>) => (
  <NavigationButton {...props} direction="back" />
);

export const NextButton = (props: Omit<NavigationButtonProps, 'direction'>) => (
  <NavigationButton {...props} direction="next" />
);

export default PageNavigation;