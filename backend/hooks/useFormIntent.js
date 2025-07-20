import { useEffect, useRef, useState } from "react";
import HesitationDetector from './../lib/hesitationDetector';
import RageClickDetector from '../lib/RageClickDetector';
import SkippedFieldDetector from './../lib/skippedFieldDetector';
import TrustScoreCalculation from './../lib/TrustScoreCalculation';
import TypingDetector from './../lib/typyingDetector';

const useFormBehaviorTracking = ({allFields = [], enableloging = false} = {}) => {

  const typing = useRef(new TypingDetector());
  const clicker = useRef(new RageClickDetector());
  const hesitation = useRef(new HesitationDetector());
  const skipDetector = useRef(new SkippedFieldDetector({ allFeilds: allFields })); 
  const scorer = useRef(new TrustScoreCalculation());

  const [intentResult, setIntentResult] = useState(null);

  const handleKeyDown = ()=>{
    typing.current.registerStroke()
  }

  const handleClick = () => {
    clicker.current.registerClick()
  }

const handleFocus = (fieldName) => {
    hesitation.current.onFocus();
    skipDetector.current.registerField(fieldName); // ✅ Pass actual field name
};

  const handleeFirstInput = () =>{
    hesitation.current.firstInputTime()

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

    if(enableloging){
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

  return{
    handleKeyDown,
    handleClick,
    handleFocus,
    handleeFirstInput,
    calculate,
    reset,
    intentResult
  }
};

export default useFormBehaviorTracking

