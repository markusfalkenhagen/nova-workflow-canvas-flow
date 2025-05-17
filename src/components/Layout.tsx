
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Info, FileText, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="nova-container py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-nova-900">N.O.V.A.</h1>
              </Link>
              <p className="text-gray-500 ml-4 hidden md:block">n8n Workflow Orchestration & Visualization Assistant</p>
            </div>
            
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/documentation" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Dokumentation</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/about" className="flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  <span>Über</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="nova-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} N.O.V.A. - n8n Workflow Orchestration & Visualization Assistant
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-500 hover:text-nova-600 text-sm">Home</Link>
              <Link to="/documentation" className="text-gray-500 hover:text-nova-600 text-sm">Dokumentation</Link>
              <Link to="/about" className="text-gray-500 hover:text-nova-600 text-sm">Über</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
