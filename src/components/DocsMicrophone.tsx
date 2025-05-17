
import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocsMicrophoneProps {
  onListening: (isActive: boolean) => void;
}

const DocsMicrophone: React.FC<DocsMicrophoneProps> = ({ onListening }) => {
  const [isListening, setIsListening] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);

  const toggleListening = () => {
    const newStatus = !isListening;
    setIsListening(newStatus);
    onListening(newStatus);
    
    // Mockup for ripple effect
    if (newStatus) {
      const interval = setInterval(() => {
        setRipples(prev => {
          // Generate a new ripple with random strength (1-5)
          const newRipple = Math.floor(Math.random() * 5) + 1;
          return [...prev, newRipple].slice(-5); // Keep only the last 5 ripples
        });
      }, 800);
      
      // Store interval ID for cleanup
      return () => clearInterval(interval);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleListening}
        variant="outline"
        size="icon"
        className={`relative z-10 rounded-full p-2 ${
          isListening 
            ? 'bg-primary/10 text-primary border-primary' 
            : 'bg-background text-gray-600'
        }`}
      >
        {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </Button>
      
      {isListening && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          {ripples.map((strength, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-primary/5 animate-ping"
              style={{
                width: `${(strength + 2) * 1.2}rem`,
                height: `${(strength + 2) * 1.2}rem`,
                animationDuration: `${1 + strength * 0.5}s`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0.7 - index * 0.1
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DocsMicrophone;
