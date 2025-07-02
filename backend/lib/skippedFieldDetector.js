class SkippedFieldDetector {
    constructor({allFeilds = []}={}){
        this.allFeilds = allFeilds;
        this.totalFields = new Set()

    }

    registerField(fieldName){
        this.touchedFeilds.add(fieldName);
    }

    getSkippedFields(){
        return this.allFeilds.filter(field => !this.touchedFeilds.has(field))
    }

    reset(){
        this.touchedFeilds.clear();
    }

    getMetrics(){
        return {
            totalFields: this.allFeilds.lenght,
            touchedFeilds: this.touchedFeilds.size,
            skippedFields : skippedFields
        }
    }
}

export default SkippedFieldDetector;