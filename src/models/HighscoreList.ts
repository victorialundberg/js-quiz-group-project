/* eslint-disable */
import { ScoreItem } from './Score';

interface Score {
  list: ScoreItem[];
  load(): void;
  save(): void;
  addScore(itemObj: ScoreItem): void;
  removeScore(id: number): void;
  sort(): void;
}

class HighscoreList implements Score {
  static instance: HighscoreList = new HighscoreList();

  private constructor(private _list: ScoreItem[] = []) {}

  get list(): ScoreItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('highScores');
    if (typeof storedList !== 'string') {
      return;
    }

    const parsedList: {
      _id: number;
      _name: string;
      //   _countDownToPoints: number;
      _totalPoints: number;
      _totalTime: number;
    }[] = JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newHighScore = new ScoreItem(
        itemObj._id,
        itemObj._name,
        // itemObj._countDownToPoints,
        itemObj._totalPoints,
        itemObj._totalTime
      );
      HighscoreList.instance.addScore(newHighScore);
    });
  }

  save(): void {
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

  addScore(itemObj: ScoreItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeScore(id: number): void {
    this._list = this._list.filter((score) => score.id !== id);
    this.save();
  }

  sort() {
    this._list.sort((a, b) => a.totalPoints - b.totalPoints);
  }
}

export { HighscoreList };
