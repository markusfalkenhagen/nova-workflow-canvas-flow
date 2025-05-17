
# Changelog und Features

## Version 1.5.0 (Geplant - Q1 2025)

### Neue Funktionen
- **n8n Direktintegration**: Direkte Verbindung zu n8n-Instanzen ohne manuellen JSON-Import
- **KI-gestützte Workflow-Erstellung**: Erzeuge neue Workflows durch Beschreibung in natürlicher Sprache
- **Erweiterte Visualisierung**: Interaktive Workflow-Bearbeitung direkt in der Visualisierungsansicht
- **Benutzerdefinierte Vorlagen**: Erstellen und Teilen eigener Workflow-Vorlagen

### Verbesserungen
- Performance-Optimierungen für größere Workflows
- Erweitertes API für Unternehmensintegrationen
- Verbesserte Suchfunktionalität für Workflow-Vorlagen

### Bugfixes
- Diverse kleinere UI-Korrekturen
- Behebung von Timing-Problemen bei der Webhook-Verarbeitung

## Version 1.4.0 (Aktuell - 15.05.2025)

### Neue Funktionen
- **Audio-Input für Chatbot**: Sprachsteuerung für den Konfigurationsassistenten
- **Erweiterte Dokumentation**: Umfassendes Dokumentationssystem mit Suchfunktion
- **Workflow-Kategorisierung**: Verbesserte Organisation und Filterung von Vorlagen
- **Export/Import von Konfigurationen**: Speichern und Wiederverwenden von Workflow-Einstellungen

### Verbesserungen
- Reaktiveres UI mit optimierten Ladezeiten
- Erweiterte Hilfetexte für komplexe Konfigurationsparameter
- Verbesserte Barrierefreiheit gemäß WCAG 2.1 AA

### Bugfixes
- Korrektur von JSON-Generierungsfehlern bei bestimmten Eingabekombinationen
- Behebung von Darstellungsproblemen auf kleineren Bildschirmen
- Korrektur inkorrekter Validierungsmuster bei einigen Eingabefeldern

## Version 1.3.0 (01.03.2025)

### Neue Funktionen
- **Supabase-Integration**: Vollständige Backend-Integration mit Benutzerkonten
- **Workflow-Verlauf**: Speicherung und Wiederherstellung früherer Konfigurationen
- **Erweiterte Eingabetypen**: Neue Konfigurationsoptionen wie Dateiuploads und OAuth-Verbindungen
- **Teamfunktionen**: Teilen von Workflows innerhalb von Teams (Beta)

### Verbesserungen
- Schnellere JSON-Generierung
- Verbesserte Fehlerbehandlung und Validierungsfeedback
- Optimierte mobile Darstellung

### Bugfixes
- Behebung eines Problems mit der Zwischenablage-API in Safari
- Korrektur falsch interpretierter Regex-Muster bei der Validierung
- Behebung von State-Management-Problemen bei komplexen Workflows

## Version 1.2.0 (15.01.2025)

### Neue Funktionen
- **Verbesserte Workflow-Visualisierung**: Interaktive Anzeige von Node-Beziehungen
- **Anpassbare Texte**: Editing-Funktionalität für E-Mail-Texte und andere Inhalte
- **Erweitertes Chat-Interface**: Mehr Interaktionsmöglichkeiten im Assistenten
- **Fortschrittsanzeige**: Visualisierung des Konfigurationsfortschritts

### Verbesserungen
- Optimiertes Responsive Design für Tablets
- Verbesserte TypeScript-Typen und Code-Struktur
- Erweitertes Error-Handling

### Bugfixes
- Behebung von Layout-Problemen in Firefox
- Korrektur fehlerhafter Placeholder-Ersetzungen im JSON
- Behebung von Timing-Problemen bei der Chat-Animation

## Version 1.1.0 (01.12.2024)

### Neue Funktionen
- **Kategorisierte Vorlagen**: Organisation der Workflows nach Anwendungsbereichen
- **Suchfunktion**: Durchsuchen von Workflow-Vorlagen nach Schlüsselbegriffen
- **Erweiterte Chatbot-Validierung**: Verbesserte Eingabeprüfung in Echtzeit
- **Dark Mode**: Unterstützung für helles und dunkles Farbschema

### Verbesserungen
- Verbesserte UX für die Workflow-Auswahl
- Schnellere Ladezeiten durch optimierte Assets
- Erweiterung der Template-Bibliothek um 15 neue Workflows

### Bugfixes
- Korrektur von Accessibilität-Problemen bei Tastaturnavigation
- Behebung von Z-Index-Konflikten im Modal-Dialog
- Korrektur von Textüberlauf bei langen Workflow-Titeln

## Version 1.0.0 (15.10.2024)

### Kernfunktionen der ersten Release
- **Workflow-Vorlagen-Bibliothek**: Grundlegende Sammlung von n8n-Workflow-Vorlagen
- **Interaktiver Konfigurations-Assistent**: Chatbot-Interface zur einfachen Workflow-Konfiguration
- **n8n JSON-Export**: Generierung von importierbarem n8n-Workflow-JSON
- **Einfache Workflow-Visualisierung**: Grundlegende visuelle Darstellung der Workflow-Struktur
- **Responsive Design**: Unterstützung für Desktop und mobile Geräte

### Technische Grundlage
- React + TypeScript Frontend
- Shadcn UI Komponenten
- Tailwind CSS für Styling
- React Flow für Workflow-Visualisierung
- Webhook-basiertes Chat-Interface

---

## Aktuelle Features

### Workflow-Management
- **Vorlagen-Bibliothek**: Umfangreiche Sammlung vorkonfigurierter n8n-Workflows
- **Kategorisierung**: Organisation nach Anwendungsbereichen (Marketing, Sales, Development, etc.)
- **Suche und Filter**: Schnelles Finden passender Vorlagen
- **Workflow-Verlauf**: Speichern und Wiederherstellen früherer Konfigurationen
- **Teamfunktionen**: Teilen von Workflows mit Teammitgliedern (Beta)

### Konfigurations-Assistent
- **Interaktives Chat-Interface**: Konversationsbasierte Konfiguration von Workflows
- **Schrittweise Anleitung**: Geführter Prozess ohne technische Vorkenntnisse
- **Kontextuelle Hilfe**: Erklärungen und Beispiele für komplexe Parameter
- **Eingabevalidierung**: Echtzeit-Prüfung der Benutzereingaben
- **Multi-Input-Typen**: Unterstützung für Text, Passwörter, URLs, E-Mails und Auswahlfelder
- **Audio-Input**: Sprachbasierte Eingabe für erhöhten Komfort
- **Anpassbare Texte**: Bearbeitung von E-Mail-Vorlagen und anderen Inhalten

### Visualisierung
- **Interaktive Workflow-Darstellung**: Visuelle Repräsentation der n8n-Workflow-Struktur
- **Node-Details**: Anzeige von Informationen zu einzelnen Workflow-Schritten
- **Status-Indikator**: Visualisierung des Konfigurationsfortschritts
- **Responsive Ansicht**: Optimiert für verschiedene Bildschirmgrößen

### Export und Integration
- **n8n JSON-Export**: Generierung von n8n-kompatiblem Workflow-JSON
- **Clipboard-Integration**: Direktes Kopieren in die Zwischenablage
- **Download-Option**: Speichern als JSON-Datei
- **Direkte n8n-Verbindung**: Import in n8n-Instanz (in Planung)

### Benutzererfahrung
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **Dark/Light Mode**: Anpassbare Farbschemata
- **Barrierefreiheit**: WCAG-konformes Interface
- **Mehrsprachigkeit**: Unterstützung für Deutsch und Englisch (weitere in Planung)
- **Umfassende Dokumentation**: Detaillierte Anleitungen und Referenz

### Backend und Datenspeicherung
- **Supabase-Integration**: Benutzerkonten und Datenpersistenz
- **Sicherer Umgang mit API-Schlüsseln**: Keine Speicherung sensibler Daten
- **Edge Functions**: Serverless Backend-Funktionen für Validierung und JSON-Generierung
- **Realtime-Updates**: Echtzeit-Kollaboration für Teammitglieder (Beta)

### KI-Funktionen (teilweise in Entwicklung)
- **Textverbesserungen**: KI-basierte Vorschläge für anpassbare Texte
- **Kontextuelle Hilfe**: Intelligente Unterstützung bei komplexen Parametern
- **Workflow-Empfehlungen**: Vorschläge basierend auf Benutzerintention
- **Natürlichsprachliche Workflow-Erstellung**: Generierung von Workflows aus Textbeschreibungen (geplant)

---

[Zurück zur Dokumentationsstartseite](/documentation)
