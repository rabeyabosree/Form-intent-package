import { useRef, useState } from "react";
import HesitationDetector from "./../lib/hesitationDetector";
import RageClickDetector from './../lib/RageClickDetector';
import TrustScoreCalculation from './../TrustScoreCalculation';
import TypingDetector from './../lib/typingDetector';
import SkippedFieldDetector from './../lib/skippedFieldDetector';


const form_intent_detector = ({ allFields = [], enableloging = false } = {}) => {

  const typing = useRef(new TypingDetector());
  const clicker = useRef(new RageClickDetector());
  const hesitation = useRef(new HesitationDetector());
  const skipDetector = useRef(new SkippedFieldDetector({ allFields }));
  const scorer = useRef(new TrustScoreCalculation());

  const [intentResult, setIntentResult] = useState(null);

  const handleKeyDown = () => {
    typing.current.registerStroke()
  }

  const handleClick = () => {
    clicker.current.registerClick()
  }

  const handleFocus = (fieldName) => {
    hesitation.current.onFocus();
    skipDetector.current.registerField(fieldName); // ✅ Pass actual field name
  };

  const handleeFirstInput = () => {
    hesitation.current.registerFirstInput()

  }


  const calculate = () => {
    const result = scorer.current.calculate({
      isFast:
        typing.current.isFastTyping(),
      isRange:
        clicker.current.isRageClick(),
      isHesitant:
        hesitation.current.isHesitating(),
      skippedFields:
        skipDetector.current.getSkippedFields()

    })

    if (enableloging) {
      console.log("Intent Result", result)
    }

    setIntentResult(result)
    return result
  }

  const reset = () => {
    typing.current.reset();
    clicker.current.reset();
    hesitation.current.reset();
    skipDetector.current.reset();
    setIntentResult(null)
  }

  return {
    handleKeyDown,
    handleClick,
    handleFocus,
    handleeFirstInput,
    calculate,
    reset,
    intentResult
  }
};



