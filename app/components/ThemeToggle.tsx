'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
const useMounted = () =>
  useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

interface Props {
  switchToLight: string;
  switchToDark: string;
}

export default function ThemeToggle({ switchToLight, switchToDark }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === 'dark';
  const label = isDark ? switchToLight : switchToDark;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="flex min-h-12 min-w-11 shrink-0 items-center justify-center rounded-xl text-muted transition-colors duration-200 hover:bg-chip hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:min-h-11 md:rounded-full">
      {isDark ? (
        <FaSun aria-hidden="true" className="size-[18px] shrink-0" />
      ) : (
        <FaMoon aria-hidden="true" className="size-[18px] shrink-0" />
      )}
    </button>
  );
}
