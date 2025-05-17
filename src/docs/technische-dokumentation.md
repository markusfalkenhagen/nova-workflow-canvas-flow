
# Technische Dokumentation N.O.V.A.

## Systemarchitektur
Die N.O.V.A. Plattform ist als moderne Webanwendung konzipiert, die auf einer Kombination aus React-Frontend und Supabase-Backend basiert.

## Technologie-Stack

### Frontend
- **Framework**: React mit TypeScript
- **Routing**: React Router v6
- **State Management**: React Context API, React Query
- **UI-Bibliothek**: Shadcn/UI (basierend auf Radix UI)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Diagramme**: React Flow (für Workflow-Visualisierung)

### Backend (Supabase)
- **Datenbank**: PostgreSQL
- **Authentifizierung**: Supabase Auth
- **Speicher**: Supabase Storage
- **Serverless Functions**: Supabase Edge Functions (Deno)
- **Echtzeit-Funktionalität**: Supabase Realtime

### Externe Dienste
- **n8n API**: Für direkte Integration mit n8n-Instanzen (optional)
- **OpenAI API**: Für KI-gestützte Funktionen (optional)

## Architekturübersicht

```
+-------------------+        +-------------------+         +-------------------+
|                   |        |                   |         |                   |
|    React UI       |<------>|  Supabase Client  |<------->|  Supabase Backend |
|                   |        |                   |         |                   |
+-------------------+        +-------------------+         +-------------------+
        ^                                                          ^
        |                                                          |
        v                                                          v
+-------------------+                                     +-------------------+
|                   |                                     |                   |
| Browser APIs      |                                     | External APIs     |
| (Clipboard, etc.) |                                     | (n8n, OpenAI)     |
|                   |                                     |                   |
+-------------------+                                     +-------------------+
```

## Kernkomponenten

### Frontend-Komponenten

#### Layout-Komponenten
- `Layout.tsx`: Hauptlayout mit Navigation, Footer etc.
- `Sidebar.tsx`: Seitenleiste für Navigation und Kontext

#### Seiten-Komponenten
- `Index.tsx`: Startseite mit Workflow-Auswahl
- `Documentation.tsx`: Dokumentations-Interface
- `About.tsx`: Über-Seite mit Projektinformationen

#### Feature-Komponenten
- `WorkflowCard.tsx`: Darstellung einer Workflow-Vorlage
- `WorkflowVisualizer.tsx`: Visualisierung von n8n-Workflows mit React Flow
- `ChatInterface.tsx`: Chat-UI für den Konfigurations-Assistenten
- `ChatbotModal.tsx`: Modal-Container für den Chat-Assistenten
- `ChatResponseModule.tsx`: Modulare Komponenten für verschiedene Antworttypen

### Datenmodell

Die Anwendung verwendet folgende Hauptdatentypen:

#### `WorkflowTemplate`
Repräsentiert eine n8n-Workflow-Vorlage mit allen Metadaten:

```typescript
interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'Marketing' | 'Sales' | 'Productivity' | 'Development' | 'Finance' | 'HR' | 'Other';
  icon: string;
  inputs: WorkflowInput[];
  customizablePrompts?: CustomizablePrompt[];
  n8nJsonBase: string;
  n8nVisualization: N8nVisualization;
}
```

#### `WorkflowInput`
Definiert einen Konfigurationsparameter für einen Workflow:

```typescript
interface WorkflowInput {
  id: string;
  label: string;
  type: 'text' | 'password' | 'textarea' | 'email' | 'url' | 'select';
  description: string;
  placeholder?: string;
  required: boolean;
  validationRegex?: string;
  options?: { value: string; label: string }[];
  helpLink?: string;
}
```

#### `N8nVisualization`
Enthält Daten für die visuelle Darstellung eines Workflows:

```typescript
interface N8nVisualization {
  nodes: N8nNode[];
  edges: N8nEdge[];
}

interface N8nNode {
  id: string;
  label: string;
  type: string;
  position: { x: number; y: number };
  data?: Record<string, any>;
  relatedInputIds?: string[];
}

interface N8nEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}
```

## API-Referenz

### Supabase Tabellen

#### `workflow_templates`
Speichert alle verfügbaren Workflow-Vorlagen.

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| id | uuid | Primärschlüssel |
| created_at | timestamp | Erstellungszeitpunkt |
| title | text | Titel des Workflows |
| description | text | Ausführliche Beschreibung |
| short_description | text | Kurzbeschreibung für Cards |
| category | text | Kategorie des Workflows |
| icon | text | Lucide-Icon-Name |
| n8n_json_base | jsonb | JSON-Template mit Platzhaltern |
| n8n_visualization | jsonb | Visualisierungsdaten |
| inputs | jsonb | Array von WorkflowInput-Objekten |
| customizable_prompts | jsonb | Array von CustomizablePrompt-Objekten |

#### `user_configurations`
Speichert benutzerspezifische Workflow-Konfigurationen.

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| id | uuid | Primärschlüssel |
| created_at | timestamp | Erstellungszeitpunkt |
| updated_at | timestamp | Letzter Aktualisierungszeitpunkt |
| user_id | uuid | Fremdschlüssel zu auth.users |
| template_id | uuid | Fremdschlüssel zu workflow_templates |
| inputs | jsonb | Benutzereingaben |
| customized_prompts | jsonb | Angepasste Prompts |
| generated_json | text | Generiertes n8n JSON |
| name | text | Benutzerdefinierter Name |

### Edge Functions

#### `validate-input`
Validiert Benutzereingaben basierend auf Workflow-Input-Definitionen.

**Endpunkt**: `/functions/v1/validate-input`

**Methode**: POST

**Request-Body**:
```json
{
  "input_definition": { /* WorkflowInput Objekt */ },
  "user_value": "Zu validierender Wert"
}
```

**Response**:
```json
{
  "is_valid": true,
  "error_message": null,
  "sanitized_value": "Validierter Wert"
}
```

#### `generate-n8n-json`
Generiert das finale n8n JSON basierend auf der Vorlage und den Benutzereingaben.

**Endpunkt**: `/functions/v1/generate-n8n-json`

**Methode**: POST

**Request-Body**:
```json
{
  "template_id": "uuid",
  "configuration_data": {
    "inputs": { /* Schlüssel-Wert-Paare */ },
    "prompts": { /* Schlüssel-Wert-Paare */ }
  }
}
```

**Response**:
```json
{
  "status": "success",
  "n8n_json_string": "{ \"key\": \"value\", ... }"
}
```

## Entwicklungsrichtlinien

### Code-Struktur
- **Komponenten**: Alle React-Komponenten befinden sich im `src/components`-Verzeichnis
- **Seiten**: Seitenkomponenten befinden sich im `src/pages`-Verzeichnis
- **Hooks**: Benutzerdefinierte React-Hooks befinden sich im `src/hooks`-Verzeichnis
- **Utilities**: Hilfsfunktionen befinden sich im `src/lib`-Verzeichnis
- **Typen**: TypeScript-Typdefinitionen befinden sich in `src/types`

### Entwicklungs-Workflow
1. Lokale Entwicklung mit `npm run dev`
2. Tests mit `npm test`
3. Build mit `npm run build`
4. Deployment über CI/CD-Pipeline

### Best Practices
- Verwenden Sie TypeScript für alle neuen Komponenten und Funktionen
- Befolgen Sie das Komponenten-Kompositions-Muster
- Vermeiden Sie große, monolithische Komponenten
- Schreiben Sie Tests für kritische Funktionalitäten
- Dokumentieren Sie APIs und komplexe Logik
- Verwenden Sie ESLint und Prettier zur Codeformatierung

## Weitere Ressourcen
- [React Dokumentation](https://reactjs.org/docs/getting-started.html)
- [Supabase Dokumentation](https://supabase.io/docs)
- [n8n API Referenz](https://docs.n8n.io/api/)
- [Shadcn UI Komponenten](https://ui.shadcn.com)

[Zurück zur Dokumentationsstartseite](/documentation)
