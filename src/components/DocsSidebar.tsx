
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DocsSidebarProps {
  activeDoc: string;
  setActiveDoc: (doc: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ 
  activeDoc, 
  setActiveDoc,
  searchQuery,
  setSearchQuery
}) => {
  const docs = [
    { id: 'nutzerhandbuch', title: 'Nutzerhandbuch', icon: '📘' },
    { id: 'technische-dokumentation', title: 'Technische Dokumentation', icon: '⚙️' },
    { id: 'app-struktur', title: 'App-Struktur & Framework', icon: '🏗️' },
    { id: 'changelog', title: 'Changelog & Features', icon: '📋' },
    { id: 'datenbank-struktur', title: 'Datenbankstruktur', icon: '🗄️' },
  ];

  return (
    <div className="w-64 border-r h-full overflow-y-auto bg-white/80 backdrop-blur-md">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Dokumentation</h2>
        
        <div className="relative mb-6">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Dokumentation durchsuchen..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="space-y-1">
          {docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDoc(doc.id)}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                activeDoc === doc.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{doc.icon}</span>
              <span>{doc.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DocsSidebar;
