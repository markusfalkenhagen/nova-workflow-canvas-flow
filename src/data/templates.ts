
import { WorkflowTemplate } from '../types';

// Mock-Daten für initiales Setup
export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'stripe-welcome-email',
    title: 'Neue Stripe-Kunden per E-Mail begrüßen',
    shortDescription: 'Automatische Willkommensnachricht an Neukunden in Stripe',
    description: 'Dieser Workflow sendet automatisch eine personalisierte Begrüßungs-E-Mail, wenn ein neuer Kunde in Stripe erstellt wird. Sie können den E-Mail-Text anpassen und zusätzliche Informationen aus Stripe einfügen.',
    category: 'Marketing',
    icon: 'mail',
    inputs: [
      {
        id: 'stripe-api-key',
        label: 'Stripe API Key',
        type: 'password',
        description: 'Ihr geheimer Stripe API-Schlüssel. Sie finden ihn in Ihrem Stripe Dashboard unter Entwickler > API-Schlüssel.',
        placeholder: 'sk_test_...',
        required: true,
        validationRegex: '^sk_(test|live)_[0-9a-zA-Z]{24,}$',
        helpLink: 'https://stripe.com/docs/keys'
      },
      {
        id: 'smtp-host',
        label: 'SMTP Server',
        type: 'text',
        description: 'Die Adresse Ihres E-Mail-Servers (z.B. smtp.gmail.com).',
        placeholder: 'smtp.beispiel.de',
        required: true
      },
      {
        id: 'smtp-user',
        label: 'SMTP Benutzername',
        type: 'text',
        description: 'Der Benutzername für Ihren E-Mail-Server.',
        placeholder: 'ihr.name@beispiel.de',
        required: true
      },
      {
        id: 'smtp-password',
        label: 'SMTP Passwort',
        type: 'password',
        description: 'Das Passwort für Ihren E-Mail-Server.',
        required: true
      },
      {
        id: 'sender-email',
        label: 'Absender-E-Mail',
        type: 'email',
        description: 'Die E-Mail-Adresse, von der die Nachrichten gesendet werden.',
        placeholder: 'support@ihrefirma.de',
        required: true,
        validationRegex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      },
      {
        id: 'sender-name',
        label: 'Absender-Name',
        type: 'text',
        description: 'Der Name, der als Absender der E-Mail erscheinen soll.',
        placeholder: 'Ihr Firmenname',
        required: true
      }
    ],
    customizablePrompts: [
      {
        id: 'email-subject',
        label: 'E-Mail-Betreff',
        description: 'Der Betreff der Willkommens-E-Mail. Sie können {{name}} als Platzhalter für den Namen des Kunden verwenden.',
        defaultText: 'Willkommen bei {{company}}, {{name}}!'
      },
      {
        id: 'email-body',
        label: 'E-Mail-Text',
        description: 'Der Inhalt der Willkommens-E-Mail. Sie können HTML verwenden und die Platzhalter {{name}}, {{company}}, {{date}} einsetzen.',
        defaultText: '<p>Hallo {{name}},</p><p>herzlich willkommen bei {{company}}! Wir freuen uns, Sie als neuen Kunden begrüßen zu dürfen.</p><p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p><p>Mit freundlichen Grüßen,<br>Ihr {{company}}-Team</p>'
      }
    ],
    n8nJsonBase: '{"nodes":[{"parameters":{"authentication":"predefinedCredentialType","credentialType":"stripeApi","api":"","resource":"event","operation":"get"},"name":"Stripe Trigger","type":"n8n-nodes-base.stripe","typeVersion":1,"position":[250,300],"credentials":{"stripeApi":{"id":"123","name":"Stripe account"}}},{"parameters":{"fromEmail":"{{$node[\'Set\'].json[\'sender_email\']}}","fromName":"{{$node[\'Set\'].json[\'sender_name\']}}","to":"{{$node[\'Stripe Trigger\'].json[\'data\'][\'object\'][\'email\']}}","subject":"{{$node[\'Set\'].json[\'email_subject\']}}","text":"","html":"{{$node[\'Set\'].json[\'email_body\']}}"},"name":"Send Email","type":"n8n-nodes-base.emailSend","typeVersion":1,"position":[750,300]},{"parameters":{"values":{"string":[{"name":"sender_email","value":"__INPUT_SENDER_EMAIL__"},{"name":"sender_name","value":"__INPUT_SENDER_NAME__"},{"name":"email_subject","value":"__PROMPT_EMAIL_SUBJECT__"},{"name":"email_body","value":"__PROMPT_EMAIL_BODY__"}]}},"name":"Set","type":"n8n-nodes-base.set","typeVersion":1,"position":[500,300]}]}',
    n8nVisualization: {
      nodes: [
        {
          id: 'stripe-trigger',
          label: 'Stripe Trigger',
          type: 'trigger',
          position: { x: 100, y: 100 },
          relatedInputIds: ['stripe-api-key']
        },
        {
          id: 'set-data',
          label: 'Set Data',
          type: 'function',
          position: { x: 300, y: 100 },
          data: {
            description: 'Bereitet E-Mail-Daten vor'
          }
        },
        {
          id: 'send-email',
          label: 'Send Email',
          type: 'action',
          position: { x: 500, y: 100 },
          relatedInputIds: ['smtp-host', 'smtp-user', 'smtp-password', 'sender-email', 'sender-name']
        }
      ],
      edges: [
        {
          id: 'e1-2',
          source: 'stripe-trigger',
          target: 'set-data',
          animated: true
        },
        {
          id: 'e2-3',
          source: 'set-data',
          target: 'send-email',
          animated: true
        }
      ]
    }
  },
  {
    id: 'slack-github-notifications',
    title: 'GitHub Events in Slack posten',
    shortDescription: 'GitHub Issues und PRs automatisch in Slack melden',
    description: 'Sendet automatisch eine Nachricht in einen Slack-Kanal, wenn in Ihrem GitHub-Repository neue Issues, Pull Requests oder Commits erstellt werden.',
    category: 'Development',
    icon: 'message-square',
    inputs: [
      {
        id: 'github-repo',
        label: 'GitHub Repository',
        type: 'text',
        description: 'Ihr GitHub Repository im Format "username/repository".',
        placeholder: 'ihrusername/meinprojekt',
        required: true,
        validationRegex: '^[\\w.-]+/[\\w.-]+$'
      },
      {
        id: 'github-token',
        label: 'GitHub Access Token',
        type: 'password',
        description: 'Ein Personal Access Token für GitHub mit Leserechten für das Repository.',
        required: true,
        helpLink: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
      },
      {
        id: 'slack-webhook',
        label: 'Slack Webhook URL',
        type: 'password',
        description: 'Die Webhook-URL für Ihren Slack-Kanal.',
        placeholder: 'https://hooks.slack.com/services/...',
        required: true,
        validationRegex: '^https://hooks.slack.com/services/.*$',
        helpLink: 'https://api.slack.com/messaging/webhooks'
      },
      {
        id: 'event-type',
        label: 'Event-Typen',
        type: 'select',
        description: 'Wählen Sie, welche GitHub-Events in Slack gesendet werden sollen.',
        required: true,
        options: [
          { value: 'all', label: 'Alle Events' },
          { value: 'issues', label: 'Nur Issues' },
          { value: 'pull_request', label: 'Nur Pull Requests' },
          { value: 'push', label: 'Nur Commits' }
        ]
      }
    ],
    customizablePrompts: [
      {
        id: 'slack-message-template',
        label: 'Slack-Nachrichtenvorlage',
        description: 'Das Template für die Slack-Nachrichten. Sie können die Platzhalter {{repo}}, {{event_type}}, {{title}}, {{url}}, {{user}} verwenden.',
        defaultText: '*Neues {{event_type}} in {{repo}}*\n>{{title}}\nErstellt von: {{user}}\nLink: {{url}}'
      }
    ],
    n8nJsonBase: '{"nodes":[{"parameters":{"authentication":"accessToken","repository":"__INPUT_GITHUB_REPO__","events":["__INPUT_EVENT_TYPE__"],"owner":"","repository":""},"name":"GitHub Trigger","type":"n8n-nodes-base.githubTrigger","typeVersion":1,"position":[250,300]},{"parameters":{"authentication":"predefinedCredentialType","resource":"message","operation":"post","channel":"","text":"__PROMPT_SLACK_MESSAGE_TEMPLATE__","attachments":"","otherOptions":{}},"name":"Slack","type":"n8n-nodes-base.slack","position":[500,300]}]}',
    n8nVisualization: {
      nodes: [
        {
          id: 'github-trigger',
          label: 'GitHub Trigger',
          type: 'trigger',
          position: { x: 100, y: 100 },
          relatedInputIds: ['github-repo', 'github-token', 'event-type']
        },
        {
          id: 'slack-send',
          label: 'Slack Send',
          type: 'action',
          position: { x: 300, y: 100 },
          relatedInputIds: ['slack-webhook']
        }
      ],
      edges: [
        {
          id: 'e1-2',
          source: 'github-trigger',
          target: 'slack-send',
          animated: true
        }
      ]
    }
  },
  {
    id: 'google-sheets-crm',
    title: 'Google Sheets CRM Integration',
    shortDescription: 'Neue CRM Kontakte in Google Tabelle speichern',
    description: 'Speichert automatisch neue Kontakte aus Ihrem CRM-System in einer Google Tabelle. Ideal für eine zentrale Datenverwaltung und Reporting.',
    category: 'Sales',
    icon: 'file-text',
    inputs: [
      {
        id: 'crm-type',
        label: 'CRM-System',
        type: 'select',
        description: 'Wählen Sie Ihr CRM-System aus.',
        required: true,
        options: [
          { value: 'hubspot', label: 'HubSpot' },
          { value: 'salesforce', label: 'Salesforce' },
          { value: 'pipedrive', label: 'Pipedrive' }
        ]
      },
      {
        id: 'crm-api-key',
        label: 'CRM API-Schlüssel',
        type: 'password',
        description: 'Der API-Schlüssel für den Zugriff auf Ihr CRM-System.',
        required: true
      },
      {
        id: 'google-sheet-id',
        label: 'Google Tabellen-ID',
        type: 'text',
        description: 'Die ID Ihrer Google-Tabelle (aus der URL).',
        placeholder: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        required: true
      },
      {
        id: 'google-sheet-range',
        label: 'Bereich in der Tabelle',
        type: 'text',
        description: 'Der zu verwendende Bereich in Ihrer Google-Tabelle (z.B. "Tabelle1!A:D").',
        placeholder: 'Tabelle1!A:D',
        required: true
      }
    ],
    n8nJsonBase: '{"nodes":[{"parameters":{"authentication":"apiKey","url":"https://api.__INPUT_CRM_TYPE__.com/v1/contacts","requestMethod":"GET","queryParameters":{"updated_since":"{{$now.minus(1, \\\"days\\\").format(\\\"YYYY-MM-DD\\\")}}"}},"name":"CRM API","type":"n8n-nodes-base.httpRequest","position":[250,300]},{"parameters":{"authentication":"serviceAccount","documentId":"__INPUT_GOOGLE_SHEET_ID__","sheetName":"__INPUT_GOOGLE_SHEET_RANGE__","operation":"append","options":{}},"name":"Google Sheets","type":"n8n-nodes-base.googleSheets","position":[500,300]}]}',
    n8nVisualization: {
      nodes: [
        {
          id: 'crm-api',
          label: 'CRM API',
          type: 'trigger',
          position: { x: 100, y: 100 },
          relatedInputIds: ['crm-type', 'crm-api-key']
        },
        {
          id: 'filter',
          label: 'Filter New Contacts',
          type: 'function',
          position: { x: 300, y: 100 }
        },
        {
          id: 'google-sheets',
          label: 'Google Sheets',
          type: 'action',
          position: { x: 500, y: 100 },
          relatedInputIds: ['google-sheet-id', 'google-sheet-range']
        }
      ],
      edges: [
        {
          id: 'e1-2',
          source: 'crm-api',
          target: 'filter',
          animated: true
        },
        {
          id: 'e2-3',
          source: 'filter',
          target: 'google-sheets',
          animated: true
        }
      ]
    }
  }
];
