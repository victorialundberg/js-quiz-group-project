/* eslint-disable */
import { ScoreItem } from './Score.js';
class HighscoreList {
    constructor(_list = []) {
        Object.defineProperty(this, "_list", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _list
        });
    }
    get list() {
        return this._list;
    }
    load() {
        const storedList = localStorage.getItem('highScores');
        if (typeof storedList !== 'string') {
            return;
        }
        const parsedList = JSON.parse(storedList);
        parsedList.forEach((itemObj) => {
            const newHighScore = new ScoreItem(itemObj._id, itemObj._name, 
            // itemObj._countDownToPoints,
            itemObj._totalPoints, itemObj._totalTime);
            HighscoreList.instance.addScore(newHighScore);
        });
    }
    save() {
        localStorage.setItem('highScores', JSON.stringify(this._list));
    }
    addScore(itemObj) {
        this._list.push(itemObj);
        this.save();
    }
    removeScore(id) {
        this._list = this._list.filter((score) => score.id !== id);
        this.save();
    }
    sort() {
        this._list.sort((a, b) => a.totalPoints - b.totalPoints);
    }
}
Object.defineProperty(HighscoreList, "instance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new HighscoreList()
});
export { HighscoreList };
