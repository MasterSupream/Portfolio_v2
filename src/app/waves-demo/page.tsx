import { WavesDemo } from '@/components/ui/waves-demo';

export default function WavesDemoPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Interactive Waves Background Demo</h1>
        <p className="text-gray-300 mb-8">
          This demonstrates the interactive waves background component with mouse interaction and smooth animations.
        </p>
        <WavesDemo />
      </div>
    </div>
  );
} 