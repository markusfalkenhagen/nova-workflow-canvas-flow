
import { CustomizedPrompt, UserInput, WorkflowTemplate } from "../types";

export class N8nJsonSynthesizer {
  /**
   * Erstellt das finale n8n Workflow JSON durch Ersetzen der Platzhalter im Template.
   * 
   * @param template Die ausgewählte Workflow-Vorlage
   * @param userInputs Die vom Benutzer eingegebenen Werte
   * @param customizedPrompts Die vom Benutzer angepassten Prompts
   * @returns Das fertige n8n Workflow JSON als String
   */
  public static synthesize(
    template: WorkflowTemplate,
    userInputs: UserInput[],
    customizedPrompts: CustomizedPrompt[] = []
  ): string {
    try {
      let resultJson = template.n8nJsonBase;

      // Ersetze alle Input-Platzhalter
      userInputs.forEach((input) => {
        const workflowInput = template.inputs.find(i => i.id === input.inputId);
        if (workflowInput) {
          const placeholder = `__INPUT_${this.kebabToCamelCase(input.inputId).toUpperCase()}__`;
          resultJson = resultJson.replace(new RegExp(placeholder, 'g'), this.escapeForJson(input.value));
        }
      });

      // Ersetze alle Prompt-Platzhalter
      if (template.customizablePrompts) {
        customizedPrompts.forEach((prompt) => {
          const workflowPrompt = template.customizablePrompts?.find(p => p.id === prompt.promptId);
          if (workflowPrompt) {
            const placeholder = `__PROMPT_${this.kebabToCamelCase(prompt.promptId).toUpperCase()}__`;
            resultJson = resultJson.replace(new RegExp(placeholder, 'g'), this.escapeForJson(prompt.text));
          }
        });
      }

      // Prüfe, ob alle Pflichtplatzhalter ersetzt wurden
      const inputPlaceholderRegex = /__INPUT_[A-Z0-9_]+__/g;
      const promptPlaceholderRegex = /__PROMPT_[A-Z0-9_]+__/g;
      
      const remainingInputPlaceholders = resultJson.match(inputPlaceholderRegex) || [];
      const remainingPromptPlaceholders = resultJson.match(promptPlaceholderRegex) || [];
      
      if (remainingInputPlaceholders.length > 0 || remainingPromptPlaceholders.length > 0) {
        const missing = [...remainingInputPlaceholders, ...remainingPromptPlaceholders].join(', ');
        throw new Error(`Einige Pflichtfelder wurden nicht ausgefüllt: ${missing}`);
      }

      // Versuche das JSON zu parsen, um zu prüfen, ob es gültig ist
      JSON.parse(resultJson);
      
      return resultJson;
    } catch (error) {
      // Re-throw mit spezifischerer Nachricht
      throw new Error(`Fehler beim Erstellen des n8n Workflows: ${(error as Error).message}`);
    }
  }

  /**
   * Wandelt kebab-case in camelCase um (für Input-IDs)
   */
  private static kebabToCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  }

  /**
   * Escaped Sonderzeichen für JSON
   */
  private static escapeForJson(str: string): string {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }
}
