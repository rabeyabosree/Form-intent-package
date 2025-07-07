import { useEffect } from "react";
import HesitationDetector from './../lib/hesitationDetector';
import RageClickDetector from '../lib/RageClickDetector';
import SkippedFieldDetector from './../lib/skippedFieldDetector';
import TrustScoreCalculation from './../lib/TrustScoreCalculation';
import TypingDetector from './../lib/typyingDetector';

const useFormBehaviorTracking = () => {
  useEffect(() => {
    // Call each detector when component mounts
    const hesitationInstance = HesitationDetector();
    const rageClickInstance = RageClickDetector();
    const skippedFieldInstance = SkippedFieldDetector();
    const trustScoreInstance = TrustScoreCalculation();
    const typingInstance = TypingDetector();

    // Optionally: cleanup if they support it
    return () => {
      hesitationInstance?.destroy?.();
      rageClickInstance?.destroy?.();
      skippedFieldInstance?.destroy?.();
      trustScoreInstance?.destroy?.();
      typingInstance?.destroy?.();
    };
  }, []);
};

export default useFormBehaviorTracking;

