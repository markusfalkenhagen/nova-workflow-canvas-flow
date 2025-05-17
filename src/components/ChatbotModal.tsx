
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkflowTemplate, UserInput, CustomizedPrompt, ChatbotMessage } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { N8nJsonSynthesizer } from '@/lib/n8nJsonSynthesizer';
import ChatResponseModule from '@/components/ChatResponseModule';

interface Message {
  id: string;
  content: string;
  sender: 'system' | 'user';
  timestamp: Date;
  responseType?: string;
  responseOptions?: any[];
  responseData?: any;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: WorkflowTemplate | null;
  onComplete: (userInputs: UserInput[], customizedPrompts: CustomizedPrompt[]) => void;
}

interface WebhookResponse {
  message: string;
  responseType?: string;
  responseOptions?: any[];
  responseData?: any;
  isComplete?: boolean;
  userInputs?: UserInput[];
  customizedPrompts?: CustomizedPrompt[];
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ 
  isOpen, 
  onClose, 
  template,
  onComplete 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const [customizedPrompts, setCustomizedPrompts] = useState<CustomizedPrompt[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [configurationComplete, setConfigurationComplete] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const WEBHOOK_URL = 'https://example.com/api/n8n-assistant'; // Replace with your actual webhook URL

  // Reset state when template changes or modal opens
  useEffect(() => {
    if (isOpen && template) {
      setMessages([]);
      setUserInputs([]);
      setCustomizedPrompts([]);
      setConfigurationComplete(false);
      setIsInitializing(true);
      
      // Send initial webhook when the chatbot opens
      sendInitialWebhook();
    }
  }, [isOpen, template]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendInitialWebhook = async () => {
    if (!template) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'initialize',
          templateId: template.id,
          templateInputs: template.inputs,
          customizablePrompts: template.customizablePrompts || [],
          sessionId: Date.now().toString(), // Generate a simple session ID
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }

      const webhookResponse: WebhookResponse = await response.json();
      
      // Add the initial message from the webhook
      addMessage({
        id: `system-${Date.now()}`,
        content: webhookResponse.message,
        sender: 'system',
        timestamp: new Date(),
        responseType: webhookResponse.responseType,
        responseOptions: webhookResponse.responseOptions,
        responseData: webhookResponse.responseData
      });
      
      // Check if the webhook already provided user inputs (should be rare but possible)
      if (webhookResponse.userInputs) {
        setUserInputs(webhookResponse.userInputs);
      }
      
      if (webhookResponse.customizedPrompts) {
        setCustomizedPrompts(webhookResponse.customizedPrompts);
      }
      
      setIsInitializing(false);
    } catch (error) {
      console.error("Error sending initial webhook:", error);
      addMessage({
        id: `error-${Date.now()}`,
        content: "Es gab ein Problem bei der Verbindung zum Assistenten. Bitte versuchen Sie es später erneut.",
        sender: 'system',
        timestamp: new Date()
      });
      toast({
        title: "Fehler",
        description: "Konnte keine Verbindung zum Assistenten herstellen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendUserResponseToWebhook = async (userResponse: string | any, moduleResponseType?: string) => {
    if (!template) return;
    
    try {
      setIsSubmitting(true);
      
      // Add user message to chat
      let displayContent = userResponse;
      
      // If the response is not a string (e.g., from a button or checkbox), 
      // convert it to a displayable string
      if (typeof userResponse !== 'string') {
        if (Array.isArray(userResponse)) {
          displayContent = userResponse.join(', ');
        } else if (typeof userResponse === 'object') {
          displayContent = JSON.stringify(userResponse);
        }
      }
      
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: displayContent.toString(),
        sender: 'user',
        timestamp: new Date()
      };
      addMessage(userMessage);
      
      // Send the response to the webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'processUserInput',
          templateId: template.id,
          userResponse: userResponse,
          responseType: moduleResponseType, // Tell the server what type of response this was
          userInputs: userInputs,
          customizedPrompts: customizedPrompts,
          sessionId: Date.now().toString(), // This should be consistent across interactions in a real implementation
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }

      const webhookResponse: WebhookResponse = await response.json();
      
      // Add the system response from the webhook
      addMessage({
        id: `system-${Date.now()}`,
        content: webhookResponse.message,
        sender: 'system',
        timestamp: new Date(),
        responseType: webhookResponse.responseType,
        responseOptions: webhookResponse.responseOptions,
        responseData: webhookResponse.responseData
      });
      
      // Update user inputs and customized prompts if provided by the webhook
      if (webhookResponse.userInputs) {
        setUserInputs(webhookResponse.userInputs);
      }
      
      if (webhookResponse.customizedPrompts) {
        setCustomizedPrompts(webhookResponse.customizedPrompts);
      }
      
      // Check if the configuration is complete
      if (webhookResponse.isComplete) {
        setConfigurationComplete(true);
        onComplete(
          webhookResponse.userInputs || userInputs,
          webhookResponse.customizedPrompts || customizedPrompts
        );
      }
      
    } catch (error) {
      console.error("Error sending user response to webhook:", error);
      addMessage({
        id: `error-${Date.now()}`,
        content: "Es gab ein Problem bei der Verarbeitung Ihrer Antwort. Bitte versuchen Sie es erneut.",
        sender: 'system',
        timestamp: new Date()
      });
      toast({
        title: "Fehler",
        description: "Konnte Ihre Antwort nicht verarbeiten.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
    
    // Send the text input to the webhook
    sendUserResponseToWebhook(inputValue.trim(), 'text');
    setInputValue('');
  };

  const handleModuleResponse = (response: any, responseType: string) => {
    if (!template || isSubmitting) return;
    
    // Send the module response to the webhook
    sendUserResponseToWebhook(response, responseType);
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
                  <div className="whitespace-pre-wrap mb-2">{message.content}</div>
                  
                  {/* Render interactive module if this is a system message with responseType */}
                  {message.sender === 'system' && message.responseType && (
                    <ChatResponseModule
                      responseType={message.responseType}
                      responseOptions={message.responseOptions}
                      responseData={message.responseData}
                      onResponse={handleModuleResponse}
                      disabled={isSubmitting}
                    />
                  )}
                  
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
