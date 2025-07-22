class TrustScoreCalculation {
    constructor() {
        this.baseScore = 100;
    }

    calculate({ isFast, isRange, isHesitant, skippedFields = [] }) {
        let score = this.baseScore;

        const reasons = {
            messages: [],
        };

        if (isFast) {
            score -= 20;
            reasons.messages.push("fast response detected");
            reasons.fastTyping = true;
        }

        if (isRange) {
            score -= 25;
            reasons.messages.push("rage click detected");
            reasons.rageClick = true;
        }

        if (isHesitant) {
            score -= 15;
            reasons.messages.push("hesitation detected");
            reasons.hesitation = true;
        }

        if (skippedFields.length > 0) {
            const penalty = skippedFields.length * 5;
            score -= penalty;
            reasons.messages.push(`skipped ${skippedFields.length} fields`);
            reasons.skippedFields = skippedFields;
        }

        score = Math.max(0, score); // ensure no negative score

        return {
            trustScore: score,
            isSuspicious: score < 60,
            reasons
        };
    }
}



export default TrustScoreCalculation;
