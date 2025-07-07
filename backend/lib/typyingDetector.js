class TypingDetector {
    constructor(
        {
            threshold = 80,
            sampleRate = 10,
            minStrokes = 3
        } = {}
    ) {
        this.threshold = threshold,
            this.sampleRate = sampleRate,
            this.minStrokes = minStrokes,
            this.timestamps = []
    }

    registerStroke(timestamps = Date.now()) {
        if (this.timestamps.length >= this.sampleRate) {
            this.timestamps.shift();
        }
        this.timestamps.push(timestamps)
        this.timestamps = this.timestamps.slice(-this.sampleRate)
    }

    getAverageSpeed() {
        if (this.timestamps.length < this.minStrokes)
            return 0
        const timeDiffs = []
        for (let i = 1; i < this.timestamps.length; i++) {
            const diff = this.timestamps[i] - this.timestamps[i - 1];
            if (diff > 0) {
                timeDiffs.push(diff)
            }
        }

        const avg = timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length;
        return Math.round(1000 / avg);
    }

    isFastTyping() {
        if (this.timestamps.length < this.minStrokes) {
            return false;
        }

        const avaregeSpeed = this.getAverageSpeed();
        return avaregeSpeed >= this.threshold;
    }

    getMetrics() {
        const avg = this.getAverageSpeed();
        return {
            avaregeSpeed: avg,
            isFastTyping: avg >= this.threshold,
            totalStrokes: this.timestamps.length,
            duration: this.timestamps.length >= 2 ? this.timestamps[this.timestamps.length - 1] - this.timestamps[0] : 0
        }
    }

    reset() {
        this.timestamps = []
    }
}


export default TypingDetector;