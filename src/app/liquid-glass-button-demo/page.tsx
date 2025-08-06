import { LiquidGlassButtonDemo } from '@/components/ui/liquid-glass-button-demo';

export default function LiquidGlassButtonDemoPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Liquid Glass Button Demo</h1>
        <p className="text-gray-300 mb-8">
          This demonstrates the liquid glass button component with glassmorphism effects, metal button variants, and smooth animations.
        </p>
        <LiquidGlassButtonDemo />
      </div>
    </div>
  );
} 