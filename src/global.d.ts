export interface GoogleTranslateOptions {
    pageLanguage?: string;
    includedLanguages?: string;
    layout?: string;
    autoDisplay?: boolean;
  }
  
  declare global {
    interface Window {
      googleTranslateElementInit?: () => void;
      google?: {
        translate: {
          TranslateElement: {
            new (options: GoogleTranslateOptions, elementId: string): unknown;
            InlineLayout: {
              VERTICAL: string;
              HORIZONTAL: string;
              SIMPLE: string;
            };
          };
        };
      };
    }
  }
  
  export {};
  