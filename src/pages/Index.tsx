
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Search, MessageCircle } from 'lucide-react';
import { workflowTemplates } from '@/data/templates';
import { UserInput, WorkflowTemplate, CustomizedPrompt } from '@/types';
import WorkflowCard from '@/components/WorkflowCard';
import WorkflowVisualizer from '@/components/WorkflowVisualizer';
import { N8nJsonSynthesizer } from '@/lib/n8nJsonSynthesizer';
import ChatbotModal from '@/components/ChatbotModal';
import Layout from '@/components/Layout';

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const [customizedPrompts, setCustomizedPrompts] = useState<CustomizedPrompt[]>([]);
  const [isConfigured, setIsConfigured] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Gefilterte Vorlagen basierend auf Suchbegriff
  const filteredTemplates = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return workflowTemplates;
    
    return workflowTemplates.filter(template => 
      template.title.toLowerCase().includes(query) || 
      template.description.toLowerCase().includes(query) ||
      template.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Die aktuell ausgewählte Vorlage
  const selectedTemplate = useMemo(() => 
    workflowTemplates.find(t => t.id === selectedTemplateId),
    [selectedTemplateId]
  );

  // Behandelt die Auswahl einer Workflow-Vorlage
  const handleTemplateSelect = useCallback((templateId: string) => {
    setSelectedTemplateId(templateId);
    setUserInputs([]);
    setCustomizedPrompts([]);
    setIsConfigured(false);
    setGeneratedJson(null);
  }, []);

  // Öffnet den Chatbot für die Konfiguration
  const handleStartChatbot = useCallback(() => {
    if (selectedTemplate) {
      setIsChatbotOpen(true);
    }
  }, [selectedTemplate]);

  // Wird aufgerufen, wenn die Konfiguration abgeschlossen ist
  const handleConfigurationComplete = useCallback((inputs: UserInput[], prompts: CustomizedPrompt[]) => {
    setUserInputs(inputs);
    setCustomizedPrompts(prompts);
    setIsConfigured(true);
    setIsChatbotOpen(false);
  }, []);

  // Generiert und kopiert das n8n JSON
  const handleGenerateJson = useCallback(() => {
    if (!selectedTemplate) return;
    
    try {
      const json = N8nJsonSynthesizer.synthesize(selectedTemplate, userInputs, customizedPrompts);
      setGeneratedJson(json);
      
      // In die Zwischenablage kopieren
      navigator.clipboard.writeText(json)
        .then(() => {
          toast({
            title: "Erfolg!",
            description: "n8n Workflow JSON wurde in die Zwischenablage kopiert.",
          });
        })
        .catch(() => {
          toast({
            title: "Hinweis",
            description: "Kopieren in die Zwischenablage fehlgeschlagen. Sie können das JSON manuell kopieren.",
            variant: "destructive",
          });
        });
    } catch (error) {
      toast({
        title: "Fehler",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }, [selectedTemplate, userInputs, customizedPrompts, toast]);

  return (
    <Layout>
      <div className="nova-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Linke Spalte: Workflow-Vorlagen */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
              <h2 className="text-xl font-semibold">Workflow-Vorlagen</h2>
              
              {/* Suchleiste */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="search"
                  placeholder="Vorlagen durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Vorlagenauswahl */}
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <WorkflowCard
                      key={template.id}
                      template={template}
                      isSelected={template.id === selectedTemplateId}
                      onClick={() => handleTemplateSelect(template.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Keine Vorlagen gefunden. Bitte ändern Sie Ihren Suchbegriff.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Rechte Spalte: Details & Konfiguration */}
          <div className="lg:col-span-2 space-y-6">
            {selectedTemplate ? (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-2xl font-semibold mb-2">{selectedTemplate.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedTemplate.description}</p>
                  
                  {/* Chatbot Button - Prominent über Tabs */}
                  <div className="mb-6">
                    <Button 
                      onClick={handleStartChatbot}
                      className="w-full bg-nova-600 hover:bg-nova-700 text-white py-2 flex items-center justify-center gap-2"
                      size="lg"
                    >
                      <MessageCircle className="mr-2" />
                      Mit N.O.V.A. Assistent konfigurieren
                    </Button>
                  </div>
                  
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="visualization">Visualisierung</TabsTrigger>
                      {generatedJson && <TabsTrigger value="json">JSON</TabsTrigger>}
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Benötigte Eingaben</h3>
                        <div className="space-y-2">
                          {selectedTemplate.inputs.map((input) => (
                            <div key={input.id} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{input.label}</h4>
                                  <p className="text-sm text-gray-500">{input.description}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded ${input.required ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                  {input.required ? 'Erforderlich' : 'Optional'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {isConfigured && (
                        <div className="mt-8 flex justify-center">
                          <Button 
                            size="lg" 
                            onClick={handleGenerateJson}
                            className="bg-nova-600 hover:bg-nova-700"
                          >
                            JSON generieren & kopieren
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="visualization">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-[500px]">
                        <WorkflowVisualizer 
                          visualization={selectedTemplate.n8nVisualization} 
                          userInputs={userInputs}
                          className="h-full"
                        />
                      </div>
                    </TabsContent>
                    
                    {generatedJson && (
                      <TabsContent value="json">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <pre className="text-sm text-gray-800 overflow-x-auto max-h-[500px]">
                            {generatedJson}
                          </pre>
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="mx-auto max-w-md">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Wählen Sie eine Vorlage</h3>
                  <p className="text-gray-500">
                    Bitte wählen Sie eine Workflow-Vorlage aus der linken Spalte, um mit der Konfiguration zu beginnen.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
        template={selectedTemplate}
        onComplete={handleConfigurationComplete}
      />
    </Layout>
  );
};

export default Index;
