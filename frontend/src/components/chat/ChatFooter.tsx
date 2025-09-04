import { MESSAGES } from '@/constants/config';

export function ChatFooter() {
  return (
    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>{MESSAGES.DISCLAIMER}</p>
    </div>
  );
}
