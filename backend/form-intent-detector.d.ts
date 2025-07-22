declare module 'form-intent-detector' {
  interface IntentResult {
    isFast: boolean;
    isRange: boolean;
    isHesitant: boolean;
    skippedFields: string[];
    trustScore: number;
  }

  interface FormIntentOptions {
    allFields?: string[];
    enableloging?: boolean;
  }

  interface FormIntentDetector {
    handleKeyDown: () => void;
    handleClick: () => void;
    handleFocus: (fieldName: string) => void;
    handleeFirstInput: () => void;
    calculate: () => IntentResult;
    reset: () => void;
    intentResult: IntentResult | null;
  }

  export function form_intent_detector(options?: FormIntentOptions): FormIntentDetector;
}
