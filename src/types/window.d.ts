declare global {
  interface Window {
    TYPO3?: {
      settings?: {
        ajaxUrls?: Record<string, string>;
        feEditorPageId?: number;
        feEditorRecords?: any[];
        feEditorIcons?: {
          edit: string;
          ai: string;
          add: string;
        };
        feEditorAiConfigured?: boolean;
        feEditorAiProvider?: string;
      };
      security?: {
        feEditorToken?: string;
      };
    };
  }
}

export {};
