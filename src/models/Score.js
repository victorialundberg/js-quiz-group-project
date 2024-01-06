class ScoreItem {
    constructor(_id, _name, 
    // private _countDownToPoints: number,
    _totalPoints, _totalTime) {
        Object.defineProperty(this, "_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _id
        });
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
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    //   get countDownToPoints(): number {
    //     return this._countDownToPoints;
    //   }
    //   set countDownToPoints(countDownToPoints: number) {
    //     this._countDownToPoints = countDownToPoints;
    //   }
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
