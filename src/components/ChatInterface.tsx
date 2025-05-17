
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WorkflowTemplate, WorkflowInput, UserInput, CustomizedPrompt, CustomizablePrompt } from '@/types';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  template: WorkflowTemplate;
  onComplete: (userInputs: UserInput[], customizedPrompts: CustomizedPrompt[]) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ template, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const [customizedPrompts, setCustomizedPrompts] = useState<CustomizedPrompt[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [isValidInput, setIsValidInput] = useState(false);
  const [isPromptSection, setIsPromptSection] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  // Bestimme, ob wir uns im Eingabeteil oder Prompt-Teil befinden und setze das aktuelle Element
  useEffect(() => {
    if (currentStep < template.inputs.length) {
      // Wir sind noch bei den regulären Eingaben
      setIsPromptSection(false);
      const existingInput = userInputs.find(ui => ui.inputId === template.inputs[currentStep].id);
      setCurrentInput(existingInput?.value || '');
      setIsValidInput(validateInput(template.inputs[currentStep], existingInput?.value || ''));
    } else if (template.customizablePrompts && currentStep < template.inputs.length + template.customizablePrompts.length) {
      // Wir sind bei den anpassbaren Prompts
      setIsPromptSection(true);
      const promptIndex = currentStep - template.inputs.length;
      const promptId = template.customizablePrompts[promptIndex].id;
      const existingPrompt = customizedPrompts.find(cp => cp.promptId === promptId);
      setCurrentInput(existingPrompt?.text || template.customizablePrompts[promptIndex].defaultText);
      setIsValidInput(true); // Prompts sind immer gültig, da sie defaultText haben
    }
  }, [currentStep, template.inputs, template.customizablePrompts, userInputs, customizedPrompts]);

  // Fokus auf das Input-Feld setzen, wenn sich der Schritt ändert
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  // Validierung einer Eingabe basierend auf den Regeln des Inputs
  const validateInput = (input: WorkflowInput, value: string): boolean => {
    if (input.required && !value.trim()) return false;
    if (input.validationRegex && value) {
      const regex = new RegExp(input.validationRegex);
      return regex.test(value);
    }
    return true;
  };

  // Handle Eingabeänderungen
  const handleInputChange = (value: string) => {
    setCurrentInput(value);
    
    if (isPromptSection && template.customizablePrompts) {
      const promptIndex = currentStep - template.inputs.length;
      setIsValidInput(true); // Prompts sind immer gültig
    } else {
      setIsValidInput(validateInput(template.inputs[currentStep], value));
    }
  };

  // Speichern der aktuellen Eingabe
  const saveCurrentInput = () => {
    if (isPromptSection && template.customizablePrompts) {
      const promptIndex = currentStep - template.inputs.length;
      const promptId = template.customizablePrompts[promptIndex].id;
      
      setCustomizedPrompts(prevPrompts => {
        // Entferne bestehenden Eintrag mit dieser ID, wenn vorhanden
        const filteredPrompts = prevPrompts.filter(p => p.promptId !== promptId);
        // Füge neuen Eintrag hinzu
        return [...filteredPrompts, { promptId, text: currentInput }];
      });
    } else {
      const inputId = template.inputs[currentStep].id;
      
      setUserInputs(prevInputs => {
        // Entferne bestehenden Eintrag mit dieser ID, wenn vorhanden
        const filteredInputs = prevInputs.filter(i => i.inputId !== inputId);
        // Füge neuen Eintrag hinzu
        return [...filteredInputs, { inputId, value: currentInput }];
      });
    }
  };

  // Zum nächsten Schritt gehen
  const handleNext = () => {
    saveCurrentInput();
    
    const totalSteps = template.inputs.length + (template.customizablePrompts?.length || 0);
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Konfiguration abschließen
      toast({
        title: "Konfiguration abgeschlossen!",
        description: "Alle benötigten Eingaben wurden gesammelt.",
      });
      onComplete(userInputs, customizedPrompts);
    }
  };

  // Zum vorherigen Schritt gehen
  const handlePrevious = () => {
    saveCurrentInput();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Rendere die aktuelle Frage/Input
  const renderCurrentQuestion = () => {
    if (isPromptSection && template.customizablePrompts) {
      const promptIndex = currentStep - template.inputs.length;
      const prompt = template.customizablePrompts[promptIndex];
      return renderPromptQuestion(prompt);
    } else {
      return renderInputQuestion(template.inputs[currentStep]);
    }
  };

  // Rendere eine reguläre Eingabefrage
  const renderInputQuestion = (input: WorkflowInput) => {
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{input.label}</h3>
          <p className="text-sm text-gray-500">{input.description}</p>
        </div>
        
        {input.type === 'textarea' ? (
          <Textarea
            value={currentInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={input.placeholder}
            className="min-h-[100px]"
          />
        ) : input.type === 'select' && input.options ? (
          <Select
            value={currentInput}
            onValueChange={handleInputChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Bitte auswählen" />
            </SelectTrigger>
            <SelectContent>
              {input.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={input.type}
            value={currentInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={input.placeholder}
            className="w-full"
          />
        )}
        
        {input.required && !isValidInput && (
          <p className="text-sm text-red-500">
            {input.validationRegex 
              ? "Bitte geben Sie einen gültigen Wert ein." 
              : "Dieses Feld ist erforderlich."}
          </p>
        )}
      </div>
    );
  };

  // Rendere eine Prompt-Anpassungsfrage
  const renderPromptQuestion = (prompt: CustomizablePrompt) => {
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{prompt.label}</h3>
          <p className="text-sm text-gray-500">{prompt.description}</p>
        </div>
        
        <Textarea
          value={currentInput}
          onChange={(e) => handleInputChange(e.target.value)}
          className="min-h-[150px]"
        />
      </div>
    );
  };

  // Berechne den Fortschritt
  const totalSteps = template.inputs.length + (template.customizablePrompts?.length || 0);
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      {/* Fortschrittsanzeige */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-nova-600 h-2.5 rounded-full transition-all" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Aktuelle Frage/Input */}
      {renderCurrentQuestion()}
      
      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Zurück
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!isValidInput}
        >
          {isLastStep ? (
            <>
              Abschließen <Check className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Weiter <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
