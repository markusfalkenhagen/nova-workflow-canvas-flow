
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ChatResponseModuleProps {
  responseType: string;
  responseOptions?: any[];
  responseData?: any;
  onResponse: (response: any, responseType: string) => void;
  disabled: boolean;
}

const ChatResponseModule: React.FC<ChatResponseModuleProps> = ({
  responseType,
  responseOptions = [],
  responseData,
  onResponse,
  disabled
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [textValue, setTextValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  // Handler for button clicks
  const handleButtonClick = (value: string) => {
    onResponse(value, responseType);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (checked: boolean, value: string) => {
    setSelectedOptions(prev => {
      const newSelection = checked 
        ? [...prev, value]
        : prev.filter(item => item !== value);
      
      return newSelection;
    });
  };

  // Handler for submitting checkbox selections
  const handleCheckboxSubmit = () => {
    onResponse(selectedOptions, responseType);
    setSelectedOptions([]);
  };

  // Handler for radio selection
  const handleRadioChange = (value: string) => {
    onResponse(value, responseType);
  };

  // Handler for text input
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResponse(textValue, responseType);
    setTextValue('');
  };

  // Handler for select change
  const handleSelectChange = (value: string) => {
    setSelectValue(value);
    onResponse(value, responseType);
  };

  switch (responseType) {
    case 'buttons':
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          {responseOptions.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleButtonClick(option.value)}
              disabled={disabled}
            >
              {option.label || option.value}
            </Button>
          ))}
        </div>
      );
    
    case 'checkboxes':
      return (
        <div className="space-y-2 mt-2">
          {responseOptions.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`checkbox-${index}`}
                checked={selectedOptions.includes(option.value)}
                onCheckedChange={(checked) => 
                  handleCheckboxChange(checked as boolean, option.value)
                }
                disabled={disabled}
              />
              <Label htmlFor={`checkbox-${index}`}>{option.label || option.value}</Label>
            </div>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCheckboxSubmit} 
            disabled={disabled || selectedOptions.length === 0}
            className="mt-2"
          >
            Auswahl bestätigen
          </Button>
        </div>
      );
    
    case 'radio':
      return (
        <RadioGroup
          className="mt-2 space-y-2"
          onValueChange={handleRadioChange}
          disabled={disabled}
        >
          {responseOptions.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`radio-${index}`} />
              <Label htmlFor={`radio-${index}`}>{option.label || option.value}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    
    case 'textInput':
      return (
        <form onSubmit={handleTextSubmit} className="mt-2">
          <Input
            type={responseData?.inputType || 'text'}
            placeholder={responseData?.placeholder || 'Geben Sie Text ein...'}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            disabled={disabled}
            className="mb-2"
          />
          <Button 
            type="submit" 
            variant="outline"
            size="sm"
            disabled={disabled || !textValue.trim()}
          >
            Bestätigen
          </Button>
        </form>
      );
    
    case 'select':
      return (
        <div className="mt-2">
          <Select
            onValueChange={handleSelectChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={responseData?.placeholder || 'Wählen Sie eine Option...'} />
            </SelectTrigger>
            <SelectContent>
              {responseOptions.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label || option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    
    case 'textarea':
      return (
        <form onSubmit={handleTextSubmit} className="mt-2">
          <Textarea
            placeholder={responseData?.placeholder || 'Geben Sie Text ein...'}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            disabled={disabled}
            className="mb-2"
            rows={responseData?.rows || 4}
          />
          <Button 
            type="submit" 
            variant="outline"
            size="sm"
            disabled={disabled || !textValue.trim()}
          >
            Bestätigen
          </Button>
        </form>
      );
    
    default:
      // For unknown or unsupported response types, return nothing
      return null;
  }
};

export default ChatResponseModule;
