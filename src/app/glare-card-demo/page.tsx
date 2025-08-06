import { GlareCardDemo } from '@/components/ui/glare-card-demo';

export default function GlareCardDemoPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Glare Card Demo</h1>
        <p className="text-gray-300 mb-8">
          This demonstrates the interactive glare card component with mouse interaction and smooth animations.
        </p>
        <GlareCardDemo />
      </div>
    </div>
  );
} 