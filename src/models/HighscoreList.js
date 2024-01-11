/* eslint-disable */
import { ScoreItem } from './Score.js';
class HighscoreList {
    constructor() {
        Object.defineProperty(this, "_list", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    static get instance() {
        if (!HighscoreList._instance) {
            HighscoreList._instance = new HighscoreList();
        }
        return HighscoreList._instance;
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
            const newHighScore = new ScoreItem(itemObj._name, itemObj._totalPoints, itemObj._totalTime);
            HighscoreList.instance.addScore(newHighScore);
        });
    }
    save() {
        localStorage.setItem('highScores', JSON.stringify(this._list));
    }
    addScore(itemObj) {
        const existingIndex = this._list.findIndex((score) => score.id === itemObj.id);
        if (existingIndex !== -1) {
            this._list[existingIndex] = itemObj;
        }
        else {
            this._list.push(itemObj);
        }
        this.sort();
        this.save();
    }
    removeScore(id) {
        this._list = this._list.filter((score) => score.id !== id);
        this.save();
    }
    sort() {
        this._list.sort((a, b) => b.totalPoints - a.totalPoints);
    }
}
Object.defineProperty(HighscoreList, "_instance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: null
});
export { HighscoreList };
