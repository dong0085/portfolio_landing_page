import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  label: string;
  items: Crumb[];
}

export default function Breadcrumbs({ label, items }: Props) {
  return (
    <nav aria-label={label} className="min-w-0">
      <ol className="flex min-w-0 items-center gap-1.5 text-sm">
        {items.map((item, index) => (
          <li
            key={item.label}
            className={`flex items-center gap-1.5 ${item.href ? 'shrink-0' : 'min-w-0'}`}>
            {index > 0 && (
              <FaChevronRight
                aria-hidden="true"
                className="size-2.5 shrink-0 text-subtle"
              />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="rounded text-muted underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="truncate font-semibold text-content">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
