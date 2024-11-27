import React from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useLayoutStore } from '../store/layoutStore';
import { createReactElement } from '../utils/componentBuilder';
import { PromptDialog } from '../components/PromptDialog';
import { useComponentGenerator } from '../hooks/useComponentGenerator';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Editor() {
  const { 
    components, 
    setComponents, 
    addComponent, 
    selectedComponentId,
    setSelectedComponentId,
    updateComponentContent
  } = useLayoutStore();

  const { generateComponent } = useComponentGenerator();

  const handleLayoutChange = (layout: Layout[]) => {
    const updatedComponents = components.map((component) => {
      const layoutItem = layout.find((l) => l.i === component.i);
      if (layoutItem) {
        return {
          ...component,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      }
      return component;
    });
    setComponents(updatedComponents);
  };

  const handleGenerate = async (prompt: string) => {
    if (!selectedComponentId) return;
    
    const result = await generateComponent({ text: prompt });
    if (result) {
      updateComponentContent(selectedComponentId, result.reactElement);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={addComponent}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Component
        </button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: components }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={true}
        isResizable={true}
      >
        {components.map((item) => item.component && (createReactElement(item.component)))}
        {selectedComponentId && (
          <div key={selectedComponentId} className="bg-white border border-gray-300 p-4">
            <h2 className="text-lg font-semibold mb-2">Edit Component</h2>
          </div>
        )}
      </ResponsiveGridLayout>

      {selectedComponentId && (
        <PromptDialog
          onClose={() => setSelectedComponentId(null)}
          onGenerate={handleGenerate}
        />
      )}
    </div>
  );
}