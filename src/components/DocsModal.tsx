
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";
import DocsSidebar from './DocsSidebar';
import MarkdownViewer from './MarkdownViewer';
import DocsMicrophone from './DocsMicrophone';
import { X } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [activeDoc, setActiveDoc] = useState('nutzerhandbuch');
  const [searchQuery, setSearchQuery] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [isListening, setIsListening] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (isOpen && activeDoc) {
      fetch(`/src/docs/${activeDoc}.md`)
        .then(response => response.text())
        .then(text => setMarkdownContent(text))
        .catch(error => {
          console.error('Error loading markdown:', error);
          setMarkdownContent('# Fehler beim Laden der Dokumentation');
        });
    }
  }, [isOpen, activeDoc]);

  const handleMicrophoneToggle = (active: boolean) => {
    setIsListening(active);
    
    if (active) {
      // Mockup for audio processing webhook
      console.log("🎙️ Audio processing started - would trigger webhook here");
      
      // For demonstration purposes, simulate a response after 3 seconds
      setTimeout(() => {
        console.log("🔍 Mock voice command processed: 'Zeige mir die technische Dokumentation'");
        setActiveDoc('technische-dokumentation');
        setIsListening(false);
      }, 3000);
    } else {
      console.log("🎙️ Audio processing stopped");
    }
  };

  const ModalContent = (
    <div className="flex h-[85vh] bg-white/60 backdrop-blur-md rounded-xl overflow-hidden border">
      <DocsSidebar
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-white/90">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold">
              {activeDoc === 'nutzerhandbuch' && 'Nutzerhandbuch'}
              {activeDoc === 'technische-dokumentation' && 'Technische Dokumentation'}
              {activeDoc === 'app-struktur' && 'App-Struktur & Framework'}
              {activeDoc === 'changelog' && 'Changelog & Features'}
              {activeDoc === 'datenbank-struktur' && 'Datenbankstruktur'}
            </h2>
            <DocsMicrophone onListening={handleMicrophoneToggle} />
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <MarkdownViewer 
            markdownContent={markdownContent} 
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          {ModalContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-11/12 p-0 overflow-hidden">
        {ModalContent}
      </DialogContent>
    </Dialog>
  );
};

export default DocsModal;
