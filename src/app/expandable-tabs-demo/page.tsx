import { DefaultDemo, CustomColorDemo } from '@/components/ui/expandable-tabs-demo';

export default function ExpandableTabsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Expandable Tabs Component
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Interactive navigation tabs with smooth animations and expandable labels
          </p>
        </div>

        <div className="space-y-12">
          {/* Default Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Default Style
            </h2>
            <div className="flex justify-center">
              <DefaultDemo />
            </div>
          </div>

          {/* Custom Color Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Custom Colors
            </h2>
            <div className="flex justify-center">
              <CustomColorDemo />
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              How to Use
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <h3>Basic Usage</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
{`import { ExpandableTabs } from '@/components/ui/expandable-tabs';
import { Home, User, Settings } from 'lucide-react';

const tabs = [
  { title: "Home", icon: Home },
  { title: "Profile", icon: User },
  { title: "Settings", icon: Settings },
];

<ExpandableTabs tabs={tabs} onChange={handleChange} />`}
              </pre>

              <h3>With Separators</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
{`const tabs = [
  { title: "Home", icon: Home },
  { title: "Profile", icon: User },
  { type: "separator" },
  { title: "Settings", icon: Settings },
];`}
              </pre>

              <h3>Custom Styling</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
{`<ExpandableTabs 
  tabs={tabs}
  activeColor="text-blue-500"
  className="border-blue-200 dark:border-blue-800"
  onChange={handleChange}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 