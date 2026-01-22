import { redirect } from 'next/navigation';

const DEFAULT_LOCALE = 'en';

export default function Page() {
  redirect(`/${DEFAULT_LOCALE}`);
}
