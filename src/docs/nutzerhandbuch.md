
# N.O.V.A. Nutzerhandbuch

## Einführung
Willkommen zum Nutzerhandbuch für N.O.V.A. (n8n Workflow Orchestration & Visualization Assistant). Dieses Handbuch führt Sie durch die Funktionen und die Nutzung der N.O.V.A. Plattform.

## Inhaltsverzeichnis
- [Erste Schritte](#erste-schritte)
- [Workflow-Vorlagen](#workflow-vorlagen)
- [Chatbot-Assistent](#chatbot-assistent)
- [Workflow-Konfiguration](#workflow-konfiguration)
- [JSON-Export](#json-export)
- [Import in n8n](#import-in-n8n)

## Erste Schritte
<a id="erste-schritte"></a>

Um mit N.O.V.A. zu beginnen, folgen Sie diesen einfachen Schritten:

1. **Melden Sie sich an oder registrieren Sie sich**
   - Besuchen Sie die Startseite und klicken Sie auf "Anmelden"
   - Falls Sie noch kein Konto haben, wählen Sie "Registrieren"
   - Füllen Sie die erforderlichen Felder aus und bestätigen Sie Ihre E-Mail-Adresse

2. **Dashboard erkunden**
   - Nach der Anmeldung gelangen Sie zum Dashboard
   - Hier finden Sie Ihre kürzlich verwendeten Workflows und empfohlene Vorlagen
   - Die Navigationsleiste bietet Zugriff auf alle Hauptfunktionen

## Workflow-Vorlagen
<a id="workflow-vorlagen"></a>

N.O.V.A. bietet eine umfangreiche Bibliothek von Workflow-Vorlagen für verschiedene Anwendungsfälle:

### Kategorien

1. **Marketing-Workflows**
   - E-Mail-Kampagnen
   - Social-Media-Automation
   - Lead-Tracking
   - Content-Distribution

2. **Sales-Workflows**
   - CRM-Integration
   - Lead-Qualifizierung
   - Angebotserstellung
   - Vertriebsberichte

3. **Entwicklungs-Workflows**
   - Git-Integration
   - CI/CD-Prozesse
   - Code-Review-Benachrichtigungen
   - Issue-Tracking

4. **Produktivitäts-Workflows**
   - Kalender-Management
   - Aufgabenverwaltung
   - Dokument-Workflows
   - Meeting-Vorbereitung

### Workflow-Auswahl

1. Durchsuchen Sie die verfügbaren Vorlagen nach Kategorie oder mit der Suchfunktion
2. Klicken Sie auf eine Vorlage, um Details anzuzeigen
3. Lesen Sie die Beschreibung und prüfen Sie die benötigten Eingaben
4. Klicken Sie auf "Mit N.O.V.A. Assistent konfigurieren", um den interaktiven Prozess zu starten

## Chatbot-Assistent
<a id="chatbot-assistent"></a>

Der N.O.V.A. Chatbot-Assistent führt Sie durch den Konfigurationsprozess:

### Funktionen

- **Schrittweise Anleitung**: Der Assistent führt Sie durch jeden erforderlichen Konfigurationsschritt
- **Kontexthilfe**: Bei komplexen Parametern bietet der Assistent zusätzliche Erklärungen
- **Echtzeit-Validierung**: Eingaben werden sofort überprüft, um Fehler zu vermeiden
- **Anpassbare Texte**: Einige Workflows enthalten Texte (z.B. für E-Mails), die Sie anpassen können
- **Fortschrittsanzeige**: Sie sehen jederzeit, wo Sie im Konfigurationsprozess stehen

### Verwendung

1. Starten Sie den Assistenten durch Klick auf "Mit N.O.V.A. Assistent konfigurieren"
2. Beantworten Sie die Fragen des Assistenten zur Konfiguration
3. Bei Unsicherheiten können Sie jederzeit nach Hilfe fragen
4. Sie können zu früheren Schritten zurückgehen, um Eingaben zu ändern
5. Nach Abschluss fasst der Assistent Ihre Konfiguration zusammen

## Workflow-Konfiguration
<a id="workflow-konfiguration"></a>

Die Workflow-Konfiguration umfasst verschiedene Arten von Eingaben:

### Eingabetypen

- **Text**: Einfache Texteingaben, z.B. Namen oder Beschreibungen
- **Zugangsdaten**: API-Schlüssel und andere sensible Informationen (werden sicher behandelt)
- **E-Mail-Adressen**: Für Benachrichtigungen oder als Workflow-Parameter
- **URLs**: Webhook-Adressen oder andere Weblinks
- **Auswahlfelder**: Vorgegebene Optionen zur Auswahl
- **Zahlen**: Numerische Werte für Grenzwerte, Intervalle usw.

### Validierung

Jede Eingabe wird validiert, um sicherzustellen, dass:
- Erforderliche Felder ausgefüllt sind
- Formate korrekt sind (z.B. E-Mail-Adressen, URLs)
- Zahlen innerhalb gültiger Bereiche liegen
- API-Schlüssel dem erwarteten Format entsprechen

Bei ungültigen Eingaben erhalten Sie sofort Feedback und Korrekturvorschläge.

## JSON-Export
<a id="json-export"></a>

Nach Abschluss der Konfiguration wird ein n8n-kompatibles JSON erstellt:

1. Der Assistent zeigt eine Zusammenfassung Ihrer Konfiguration
2. Klicken Sie auf "JSON generieren", um das n8n Workflow JSON zu erstellen
3. Das generierte JSON wird angezeigt und automatisch in die Zwischenablage kopiert
4. Sie können das JSON auch herunterladen oder direkt mit n8n verbinden (Premium-Feature)

## Import in n8n
<a id="import-in-n8n"></a>

So importieren Sie den konfigurierten Workflow in Ihre n8n-Instanz:

1. Öffnen Sie Ihre n8n-Instanz
2. Klicken Sie auf "Workflows"
3. Wählen Sie "Import from JSON"
4. Fügen Sie das kopierte JSON ein oder laden Sie die Datei hoch
5. Überprüfen Sie den importierten Workflow in n8n
6. Stellen Sie sicher, dass alle Credentials korrekt eingerichtet sind
7. Speichern und aktivieren Sie den Workflow

### Troubleshooting

Falls beim Import Probleme auftreten:
- Prüfen Sie, ob Ihre n8n-Version mit dem exportierten Workflow kompatibel ist
- Stellen Sie sicher, dass alle benötigten n8n-Nodes installiert sind
- Überprüfen Sie die Zugangsdaten für die verschiedenen Dienste

## Support und Hilfe

Bei weiteren Fragen steht Ihnen zur Verfügung:
- Die [ausführliche Dokumentation](/documentation)
- Unser [Support-Team](mailto:support@nova-assistant.de)
- Die [Community-Foren](https://community.nova-assistant.de)

---

[Zurück zum Inhaltsverzeichnis](#inhaltsverzeichnis)
