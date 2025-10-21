import { useTheme } from '@shadcn/ui';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4 p-2 rounded bg-gray-100 dark:bg-gray-900"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
