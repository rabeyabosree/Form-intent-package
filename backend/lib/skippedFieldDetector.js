class SkippedFieldDetector {
    constructor({ allFeilds = [] } = {}) {
        this.allFeilds = allFeilds;
        this.touchedFeilds = new Set(); // ✅ Declare it
    }

    registerField(fieldName) {
        this.touchedFeilds.add(fieldName);
    }

    getSkippedFields() {
        return this.allFeilds.filter(field => !this.touchedFeilds.has(field));
    }

    reset() {
        this.touchedFeilds.clear();
    }

    getMetrics() {
        const skippedFields = this.getSkippedFields(); // ✅ Declare it here
        return {
            totalFields: this.allFeilds.length, // ✅ Fix typo
            touchedFeilds: this.touchedFeilds.size,
            skippedFields
        };
    }
}
