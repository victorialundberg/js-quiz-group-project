/* eslint-disable */
import { ScoreItem } from './Score';
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
    // load(): void {
    //   const storedList: string | null = localStorage.getItem('highscores'); // Ensure key is consistent here
    //   if (!storedList) {
    //     return;
    //   }
    // const parsedList: ScoreItem[] = JSON.parse(storedList);
    // this._list = parsedList; //
    // const parsedList: ScoreItem[] = JSON.parse(storedList);
    // parsedList.forEach((itemObj) => {
    //   const newHighScore = new ScoreItem(
    //     itemObj.id,
    //     itemObj.name,
    //     itemObj.totalPoints,
    //     itemObj.totalTime
    //   );
    //   HighscoreList.instance.addScore(newHighScore);
    // });
    // }
    // save(): void {
    //   localStorage.setItem('highscores', JSON.stringify(this._list)); // Ensure key is consistent here
    // }
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
