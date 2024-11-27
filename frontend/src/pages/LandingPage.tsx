import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Layout, Palette, Brain } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Wand2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Website Builder</span>
            </div>
            <button
              onClick={() => navigate('/editor')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="pt-20 pb-16 px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Your Dream Website with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Create stunning, customizable websites using our AI-powered drag-and-drop editor. 
            No coding required.
          </p>
          <button
            onClick={() => navigate('/editor')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all"
          >
            Start Building Now
          </button>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-xl">
                <Layout className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flexible Grid Layout</h3>
                <p className="text-gray-600">
                  Create any layout you can imagine with our intuitive grid system
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <Palette className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Design Assistant</h3>
                <p className="text-gray-600">
                  Get intelligent design suggestions and instant modifications
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Components</h3>
                <p className="text-gray-600">
                  Customize components with natural language commands
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Website?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of creators building amazing websites with AI
            </p>
            <button
              onClick={() => navigate('/editor')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all"
            >
              Get Started Free
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;