import NewsDashboard from '../components/NewsDashboard';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <ThemeToggle />
      <h1 className="text-3xl font-bold text-center pt-8">NewsHub</h1>
      <p className="text-center text-gray-500 mb-8">Your free dashboard for Security, DevOps, GenAI, and Darkweb news</p>
      <NewsDashboard />
    </div>
  );
}