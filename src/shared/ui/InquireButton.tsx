import Link from 'next/link';
import { Icon } from '@iconify/react';

interface InquireButtonProps {
  onClick?: () => void;
  className?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  href?: string;
}

export default function InquireButton({
  onClick,
  className = '',
  icon = 'bi:chat-left-text',
  iconPosition = 'left',
  href = '/enquire',
}: InquireButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`items-center justify-center gap-2 rounded-xs bg-gold font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light ${className}`}
    >
      {iconPosition === 'left' && <Icon icon={icon} className="h-4 w-4" />}
      Inquire Now
      {iconPosition === 'right' && <Icon icon={icon} className="h-4 w-4" />}
    </Link>
  );
}
