
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ResearcherAgent from './components/ResearcherAgent';
import CodeAssistant from './components/CodeAssistant';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  // Default to '#/' if hash is empty
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [isLaunching, setIsLaunching] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    // Set initial route in case the page is loaded with a hash
    handleHashChange();
    
    const timer = setTimeout(() => {
      setIsLaunching(false);
    }, 2000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  const renderComponent = () => {
    switch (route) {
      case '#/researcher':
        return <ResearcherAgent />;
      case '#/assistant':
        return <CodeAssistant />;
      case '#/':
      default:
        return <HomePage />;
    }
  };

  if (isLaunching) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col">
      <Header route={route} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderComponent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
