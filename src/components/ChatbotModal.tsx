
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkflowTemplate, UserInput, CustomizedPrompt } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { N8nJsonSynthesizer } from '@/lib/n8nJsonSynthesizer';

interface Message {
  id: string;
  content: string;
  sender: 'system' | 'user';
  timestamp: Date;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: WorkflowTemplate | null;
  onComplete: (userInputs: UserInput[], customizedPrompts: CustomizedPrompt[]) => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ 
  isOpen, 
  onClose, 
  template,
  onComplete 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const [customizedPrompts, setCustomizedPrompts] = useState<CustomizedPrompt[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [configurationComplete, setConfigurationComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Reset state when template changes
  useEffect(() => {
    if (template) {
      setMessages([
        {
          id: 'welcome',
          content: `Willkommen! Ich helfe Ihnen bei der Konfiguration des Workflows "${template.title}". Bitte beantworten Sie ein paar Fragen.`,
          sender: 'system',
          timestamp: new Date()
        }
      ]);
      setUserInputs([]);
      setCustomizedPrompts([]);
      setCurrentInputIndex(0);
      setConfigurationComplete(false);
      
      // Add the first question
      askNextQuestion();
    }
  }, [template]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const askNextQuestion = () => {
    if (!template) return;
    
    // Check if we're done with inputs
    if (currentInputIndex >= template.inputs.length) {
      // Check if we have customizable prompts to process
      if (template.customizablePrompts && currentInputIndex < template.inputs.length + template.customizablePrompts.length) {
        const promptIndex = currentInputIndex - template.inputs.length;
        const prompt = template.customizablePrompts[promptIndex];
        
        addMessage({
          id: `prompt-${prompt.id}`,
          content: `${prompt.label}: ${prompt.description}\n\nAktueller Text: \n\n${prompt.defaultText}\n\nMöchten Sie diesen Text anpassen?`,
          sender: 'system',
          timestamp: new Date()
        });
      } else {
        // All inputs and prompts are complete
        addMessage({
          id: 'complete',
          content: 'Großartig! Ich habe alle benötigten Informationen gesammelt. Möchten Sie das n8n JSON generieren?',
          sender: 'system',
          timestamp: new Date()
        });
        setConfigurationComplete(true);
      }
    } else {
      // Ask for the next input
      const input = template.inputs[currentInputIndex];
      let message = `Bitte geben Sie Ihren ${input.label} ein: ${input.description}`;
      if (input.required) {
        message += " (Erforderlich)";
      }
      if (input.type === 'select' && input.options) {
        message += "\n\nOptionen:\n" + input.options.map(opt => `- ${opt.label}`).join("\n");
      }
      
      addMessage({
        id: `input-${input.id}`,
        content: message,
        sender: 'system',
        timestamp: new Date()
      });
    }
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !template || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    addMessage(userMessage);
    setInputValue('');
    
    // Process the user input
    processUserInput(inputValue);
  };

  const processUserInput = async (input: string) => {
    if (!template) return;
    
    try {
      if (configurationComplete) {
        // User has confirmed they want to generate JSON
        if (input.toLowerCase().includes('ja') || input.toLowerCase().includes('generieren')) {
          try {
            const json = N8nJsonSynthesizer.synthesize(template, userInputs, customizedPrompts);
            addMessage({
              id: 'json-success',
              content: 'Das JSON wurde erfolgreich generiert und in die Zwischenablage kopiert!',
              sender: 'system',
              timestamp: new Date()
            });
            
            // Copy to clipboard
            navigator.clipboard.writeText(json)
              .catch(() => {
                toast({
                  title: "Hinweis",
                  description: "Das Kopieren in die Zwischenablage ist fehlgeschlagen. Bitte kopieren Sie das JSON manuell.",
                  variant: "destructive",
                });
              });
            
            // Notify parent component that the configuration is complete
            onComplete(userInputs, customizedPrompts);
          } catch (error) {
            addMessage({
              id: 'json-error',
              content: `Fehler beim Generieren des JSON: ${(error as Error).message}. Bitte überprüfen Sie Ihre Eingaben.`,
              sender: 'system',
              timestamp: new Date()
            });
          }
        } else {
          addMessage({
            id: 'confirm-again',
            content: 'Möchten Sie das JSON generieren? Bitte antworten Sie mit "Ja" oder "Nein".',
            sender: 'system',
            timestamp: new Date()
          });
        }
      } 
      // Handling customizable prompts
      else if (template.customizablePrompts && currentInputIndex >= template.inputs.length && 
               currentInputIndex < template.inputs.length + template.customizablePrompts.length) {
        
        const promptIndex = currentInputIndex - template.inputs.length;
        const prompt = template.customizablePrompts[promptIndex];
        
        if (input.toLowerCase().includes('ja') && !input.toLowerCase().includes('nein')) {
          // User wants to customize the prompt
          addMessage({
            id: `customize-${prompt.id}`,
            content: `Bitte geben Sie Ihren angepassten Text für "${prompt.label}" ein:`,
            sender: 'system',
            timestamp: new Date()
          });
        } else if (input.toLowerCase().includes('nein')) {
          // User wants to use default
          setCustomizedPrompts(prev => [
            ...prev.filter(p => p.promptId !== prompt.id),
            { promptId: prompt.id, text: prompt.defaultText }
          ]);
          
          addMessage({
            id: `default-${prompt.id}`,
            content: `Der Standardtext wird verwendet.`,
            sender: 'system',
            timestamp: new Date()
          });
          
          // Move to next
          setCurrentInputIndex(currentInputIndex + 1);
          setTimeout(askNextQuestion, 500);
        } else if (promptIndex > 0 || messages.some(m => m.id === `customize-${prompt.id}`)) {
          // This is a custom text input from the user
          setCustomizedPrompts(prev => [
            ...prev.filter(p => p.promptId !== prompt.id),
            { promptId: prompt.id, text: input }
          ]);
          
          addMessage({
            id: `saved-${prompt.id}`,
            content: `Ihr angepasster Text wurde gespeichert.`,
            sender: 'system',
            timestamp: new Date()
          });
          
          // Move to next
          setCurrentInputIndex(currentInputIndex + 1);
          setTimeout(askNextQuestion, 500);
        } else {
          // Unclear response
          addMessage({
            id: `unclear-${Date.now()}`,
            content: `Entschuldigung, ich habe das nicht verstanden. Möchten Sie den Standardtext anpassen? Bitte antworten Sie mit "Ja" oder "Nein".`,
            sender: 'system',
            timestamp: new Date()
          });
        }
      } 
      // Regular input processing
      else if (currentInputIndex < template.inputs.length) {
        const currentInput = template.inputs[currentInputIndex];
        
        // Basic validation
        let isValid = true;
        let errorMessage = "";
        
        // Required field check
        if (currentInput.required && !input.trim()) {
          isValid = false;
          errorMessage = "Dieses Feld ist erforderlich.";
        }
        
        // Regex validation if present
        if (currentInput.validationRegex && input.trim()) {
          const regex = new RegExp(currentInput.validationRegex);
          if (!regex.test(input)) {
            isValid = false;
            errorMessage = "Die Eingabe entspricht nicht dem erforderlichen Format.";
          }
        }
        
        // Select type validation
        if (currentInput.type === 'select' && currentInput.options) {
          const matchingOption = currentInput.options.find(
            opt => opt.label.toLowerCase() === input.toLowerCase() || opt.value.toLowerCase() === input.toLowerCase()
          );
          
          if (!matchingOption) {
            isValid = false;
            errorMessage = "Bitte wählen Sie eine der angegebenen Optionen.";
          }
        }
        
        if (isValid) {
          // Save the input
          const value = currentInput.type === 'select' && currentInput.options 
            ? currentInput.options.find(
                opt => opt.label.toLowerCase() === input.toLowerCase() || opt.value.toLowerCase() === input.toLowerCase()
              )?.value || input
            : input;
            
          setUserInputs(prev => [
            ...prev.filter(ui => ui.inputId !== currentInput.id),
            { inputId: currentInput.id, value }
          ]);
          
          addMessage({
            id: `valid-${currentInput.id}`,
            content: `Danke! Ihr ${currentInput.label} wurde gespeichert.`,
            sender: 'system',
            timestamp: new Date()
          });
          
          // Move to next
          setCurrentInputIndex(currentInputIndex + 1);
          setTimeout(askNextQuestion, 500);
        } else {
          addMessage({
            id: `error-${Date.now()}`,
            content: errorMessage,
            sender: 'system',
            timestamp: new Date()
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">N.O.V.A. Assistent</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-nova-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div 
                    className={`text-xs ${
                      message.sender === 'user' ? 'text-nova-100' : 'text-gray-500'
                    } mt-1`}
                  >
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Geben Sie Ihre Antwort ein..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nova-500"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || !inputValue.trim()}
              className="bg-nova-600 hover:bg-nova-700"
            >
              Senden
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatbotModal;
