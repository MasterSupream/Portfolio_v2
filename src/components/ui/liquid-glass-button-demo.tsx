import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button";

export function LiquidGlassButtonDemo() {
  return (
    <div className="space-y-8">
      {/* Liquid Button Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Liquid Glass Button</h3>
        <div className="flex flex-wrap gap-4">
          <LiquidButton size="sm">Small</LiquidButton>
          <LiquidButton size="default">Default</LiquidButton>
          <LiquidButton size="lg">Large</LiquidButton>
          <LiquidButton size="xl">Extra Large</LiquidButton>
          <LiquidButton size="xxl">XXL</LiquidButton>
        </div>
      </div>

      {/* Metal Button Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Metal Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <MetalButton variant="default">Default</MetalButton>
          <MetalButton variant="primary">Primary</MetalButton>
          <MetalButton variant="success">Success</MetalButton>
          <MetalButton variant="error">Error</MetalButton>
          <MetalButton variant="gold">Gold</MetalButton>
          <MetalButton variant="bronze">Bronze</MetalButton>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="relative h-[200px] w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-lg flex items-center justify-center">
          <LiquidButton 
            size="xxl"
            onClick={() => console.log('Liquid button clicked!')}
          >
            Liquid Glass
          </LiquidButton>
        </div>
      </div>
    </div>
  );
} 