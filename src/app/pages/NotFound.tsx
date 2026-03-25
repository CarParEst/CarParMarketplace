import { Link } from 'react-router';
import { Button } from '../components/ui/button';

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="font-bold text-6xl mb-4 text-[#0ABAB5]">404</h1>
        <h2 className="font-bold text-2xl mb-2">Lehte ei leitud</h2>
        <p className="text-gray-600 mb-6">
          Otsitud lehte ei eksisteeri või on see teisaldatud.
        </p>
        <Button asChild>
          <Link to="/">Tagasi avalehele</Link>
        </Button>
      </div>
    </div>
  );
}