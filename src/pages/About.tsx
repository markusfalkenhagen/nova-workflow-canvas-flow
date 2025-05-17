
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, User, BarChart, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="nova-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Über N.O.V.A.</h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-8">
              N.O.V.A. (n8n Workflow Orchestration & Visualization Assistant) ist ein intelligenter Assistent, 
              der die Erstellung und Konfiguration von n8n-Workflows vereinfacht. Mit N.O.V.A. können 
              auch Benutzer ohne tiefgreifende technische Kenntnisse leistungsstarke Automatisierungen erstellen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <User className="h-6 w-6 text-nova-600 mr-3" />
                  <h3 className="text-xl font-semibold">Benutzerfreundlich</h3>
                </div>
                <p className="text-gray-700">
                  N.O.V.A. führt Sie Schritt für Schritt durch den Konfigurationsprozess mit 
                  einem interaktiven Chatbot-Interface, das komplexe Technik verständlich macht.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <Code className="h-6 w-6 text-nova-600 mr-3" />
                  <h3 className="text-xl font-semibold">Sofort einsatzbereit</h3>
                </div>
                <p className="text-gray-700">
                  Generieren Sie sofort einsatzbereites n8n-JSON, das Sie direkt in Ihre 
                  n8n-Instanz importieren können - ohne eine Zeile Code schreiben zu müssen.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <BarChart className="h-6 w-6 text-nova-600 mr-3" />
                  <h3 className="text-xl font-semibold">Visualisierung</h3>
                </div>
                <p className="text-gray-700">
                  Sehen Sie Ihren Workflow in Echtzeit visualisiert, während Sie ihn 
                  konfigurieren - für ein besseres Verständnis des Datenflusses.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <RefreshCw className="h-6 w-6 text-nova-600 mr-3" />
                  <h3 className="text-xl font-semibold">Vorlagenbibliothek</h3>
                </div>
                <p className="text-gray-700">
                  Wählen Sie aus einer wachsenden Bibliothek vorgefertigter 
                  Workflow-Vorlagen für verschiedene Anwendungsfälle und Integrationen.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Bereit, Ihre Automatisierung zu erstellen?</h3>
              <Button asChild className="bg-nova-600 hover:bg-nova-700 text-lg px-8 py-6 h-auto">
                <Link to="/">
                  Workflow-Vorlagen entdecken
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
