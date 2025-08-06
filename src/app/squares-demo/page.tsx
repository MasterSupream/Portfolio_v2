import { SquaresDemo } from '@/components/ui/squares-demo';

export default function SquaresDemoPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Squares Background Demo</h1>
        <p className="text-gray-300 mb-8">
          This demonstrates the animated squares background component with interactive hover effects.
        </p>
        <SquaresDemo />
      </div>
    </div>
  );
} 