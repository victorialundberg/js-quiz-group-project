class ScoreItem {
    constructor(_name, _totalPoints, _totalTime, id) {
        Object.defineProperty(this, "_name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _name
        });
        Object.defineProperty(this, "_totalPoints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _totalPoints
        });
        Object.defineProperty(this, "_totalTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _totalTime
        });
        Object.defineProperty(this, "_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._id = id || Date.now();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get totalPoints() {
        return this._totalPoints;
    }
    set totalPoints(totalPoints) {
        this._totalPoints = totalPoints;
    }
    get totalTime() {
        return this._totalTime;
    }
    set totalTime(totalTime) {
        this._totalTime = totalTime;
    }
}
export { ScoreItem };
