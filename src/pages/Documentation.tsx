
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Book, Code, Database, History } from 'lucide-react';
import Layout from '@/components/Layout';
import DocsModal from '@/components/DocsModal';

const Documentation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDocType, setActiveDocType] = useState('nutzerhandbuch');

  const openDocModal = (docType: string) => {
    setActiveDocType(docType);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="nova-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-center mb-8">N.O.V.A. Dokumentation</h2>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="getting-started">
              <div className="border-b mb-6">
                <TabsList className="justify-start">
                  <TabsTrigger value="getting-started">Erste Schritte</TabsTrigger>
                  <TabsTrigger value="workflows">Workflows</TabsTrigger>
                  <TabsTrigger value="chatbot">Chatbot-Assistent</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="getting-started" className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Erste Schritte mit N.O.V.A.</h3>
                  <p className="mb-4 text-gray-700">
                    Das N.O.V.A. System (n8n Workflow Orchestration & Visualization Assistant) wurde entwickelt, um die Erstellung 
                    von n8n-Workflows zu vereinfachen. Folgen Sie diesen Schritten, um schnell zu starten:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-4 text-gray-700 pl-4">
                    <li className="mb-2">
                      <span className="font-medium">Vorlage auswählen:</span> Durchsuchen Sie die verfügbaren Workflow-Vorlagen 
                      und wählen Sie eine aus, die Ihren Anforderungen entspricht.
                    </li>
                    <li className="mb-2">
                      <span className="font-medium">Chatbot-Assistent starten:</span> Klicken Sie auf den Button "Mit N.O.V.A. Assistent konfigurieren", 
                      um den interaktiven Konfigurations-Chat zu starten.
                    </li>
                    <li className="mb-2">
                      <span className="font-medium">Konfiguration durchführen:</span> Beantworten Sie die Fragen des Chatbots, 
                      um alle benötigten Parameter für Ihren Workflow einzurichten.
                    </li>
                    <li className="mb-2">
                      <span className="font-medium">JSON generieren:</span> Nach Abschluss der Konfiguration können Sie das 
                      n8n-kompatible JSON generieren und in die Zwischenablage kopieren.
                    </li>
                    <li className="mb-2">
                      <span className="font-medium">In n8n importieren:</span> Gehen Sie zu Ihrer n8n-Instanz und importieren Sie 
                      das generierte JSON als neuen Workflow.
                    </li>
                  </ol>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center"
                      onClick={() => openDocModal('nutzerhandbuch')}
                    >
                      <Book className="h-4 w-4" />
                      Ausführliches Nutzerhandbuch
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="workflows" className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Workflow-Vorlagen</h3>
                  <p className="mb-4 text-gray-700">
                    N.O.V.A. bietet eine wachsende Bibliothek von Workflow-Vorlagen für verschiedene Anwendungsfälle:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-semibold text-lg text-nova-700">Marketing-Workflows</h4>
                      <p className="text-gray-700">Automatisierungen für E-Mail-Kampagnen, Social Media, Lead-Tracking und mehr.</p>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-semibold text-lg text-nova-700">Entwicklungs-Workflows</h4>
                      <p className="text-gray-700">Integration von Entwicklungstools, Benachrichtigungen und Automatisierungen für GitHub, GitLab und mehr.</p>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-semibold text-lg text-nova-700">Sales-Workflows</h4>
                      <p className="text-gray-700">CRM-Integrationen, Lead-Management, Vertriebsautomatisierung.</p>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-semibold text-lg text-nova-700">Produktivitäts-Workflows</h4>
                      <p className="text-gray-700">Automatisierungen für Kalender, Aufgabenverwaltung, Dokumenten-Workflows und mehr.</p>
                    </div>
                  </div>
                  
                  <p className="mt-6 text-gray-700">
                    Jede Vorlage wurde sorgfältig entwickelt und getestet, um zuverlässige Ergebnisse zu liefern. 
                    Die Vorlagen lassen sich über den Chatbot-Assistenten an Ihre spezifischen Anforderungen anpassen.
                  </p>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center"
                      onClick={() => openDocModal('app-struktur')}
                    >
                      <Code className="h-4 w-4" />
                      App-Struktur und Workflows
                    </Button>
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center"
                      onClick={() => openDocModal('changelog')}
                    >
                      <History className="h-4 w-4" />
                      Changelog und Features
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="chatbot" className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">N.O.V.A. Chatbot-Assistent</h3>
                  <p className="mb-4 text-gray-700">
                    Der N.O.V.A. Chatbot-Assistent ist das Herzstück unserer Plattform. Er führt Sie Schritt für Schritt durch den Konfigurationsprozess:
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border mb-6">
                    <h4 className="font-semibold mb-2">Funktionen des Assistenten:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Klare, schrittweise Anleitung durch den Konfigurationsprozess</li>
                      <li>Einfache Eingabevalidierung in Echtzeit</li>
                      <li>Kontextbezogene Hilfe bei komplexen Parametern</li>
                      <li>Fortschrittsanzeige während der Konfiguration</li>
                      <li>Anpassbare Texte für E-Mail-Vorlagen und andere Inhalte</li>
                      <li>Zusammenfassung der Konfiguration vor der JSON-Generierung</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Der Assistent ist darauf ausgelegt, auch technisch weniger versierten Nutzern zu helfen. 
                    Er erklärt jeden Parameter in einfacher Sprache und stellt sicher, dass alle erforderlichen 
                    Informationen korrekt erfasst werden.
                  </p>
                  
                  <p className="text-gray-700">
                    Falls Sie bei einem Schritt Hilfe benötigen, können Sie jederzeit Fragen stellen. Der Assistent 
                    wird versuchen, Ihnen weiterzuhelfen oder alternative Erklärungen anzubieten.
                  </p>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center"
                      onClick={() => openDocModal('technische-dokumentation')}
                    >
                      <Code className="h-4 w-4" />
                      Technische Dokumentation
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Häufig gestellte Fragen (FAQ)</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-nova-700 mb-2">Was ist n8n?</h4>
                      <p className="text-gray-700">
                        n8n ist eine quelloffene Workflow-Automatisierungsplattform. Mit n8n können Sie APIs, 
                        Services und Anwendungen miteinander verbinden, um Daten zwischen ihnen auszutauschen 
                        und Prozesse zu automatisieren.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-nova-700 mb-2">Brauche ich eine eigene n8n-Installation?</h4>
                      <p className="text-gray-700">
                        Ja, um die generierten Workflows zu verwenden, benötigen Sie Zugriff auf eine n8n-Installation. 
                        Sie können n8n entweder selbst hosten oder den n8n.cloud-Dienst nutzen.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-nova-700 mb-2">Sind meine Daten sicher?</h4>
                      <p className="text-gray-700">
                        N.O.V.A. verarbeitet Ihre Eingaben nur lokal in Ihrem Browser. Sensible Daten wie API-Schlüssel 
                        werden nicht auf unseren Servern gespeichert. Das generierte JSON können Sie direkt in Ihre 
                        n8n-Instanz importieren.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-nova-700 mb-2">Kann ich eigene Workflow-Vorlagen erstellen?</h4>
                      <p className="text-gray-700">
                        In der aktuellen Version können Sie die vorhandenen Vorlagen nutzen. Die Möglichkeit, eigene 
                        Vorlagen zu erstellen und zu teilen, ist für zukünftige Versionen geplant.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-nova-700 mb-2">Was mache ich, wenn mein Workflow nicht funktioniert?</h4>
                      <p className="text-gray-700">
                        Nach dem Import in n8n müssen Sie möglicherweise noch einige Anmeldedaten (Credentials) 
                        einrichten oder bestehende auswählen. Prüfen Sie die Konfiguration jedes Nodes in n8n 
                        und stellen Sie sicher, dass alle erforderlichen Anmeldedaten korrekt eingerichtet sind.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-nova-700 mb-2">Welche Dienste werden unterstützt?</h4>
                      <p className="text-gray-700">
                        Unsere Workflow-Vorlagen unterstützen eine Vielzahl von Diensten, darunter E-Mail-Anbieter, 
                        CRM-Systeme, Social-Media-Plattformen, Entwicklungstools und mehr. Die Liste wird ständig erweitert.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      className="flex gap-2 items-center"
                      onClick={() => openDocModal('datenbank-struktur')}
                    >
                      <Database className="h-4 w-4" />
                      Datenbankstruktur und APIs
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Main documentation buttons */}
          <div className="mt-12 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Vollständige Dokumentation</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="flex gap-2 items-center"
                onClick={() => openDocModal('nutzerhandbuch')}
              >
                <Book className="h-5 w-5" />
                Nutzerhandbuch öffnen
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex gap-2 items-center"
                onClick={() => openDocModal('technische-dokumentation')}
              >
                <Code className="h-5 w-5" />
                Technische Dokumentation
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <DocsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </Layout>
  );
};

export default Documentation;
