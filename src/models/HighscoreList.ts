/* eslint-disable */
import { ScoreItem } from './Score.js';

interface IScore {
  list: ScoreItem[];
  load(): void;
  save(): void;
  addScore(itemObj: ScoreItem): void;
  removeScore(id: number): void;
  sort(): void;
}

class HighscoreList implements IScore {
  private static _instance: HighscoreList | null = null;
  private _list: ScoreItem[] = [];

  private constructor() {}

  public static get instance(): HighscoreList {
    if (!HighscoreList._instance) {
      HighscoreList._instance = new HighscoreList();
    }
    return HighscoreList._instance;
  }

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
      _totalPoints: number;
      _totalTime: number;
    }[] = JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newHighScore = new ScoreItem(
        itemObj._name,
        itemObj._totalPoints,
        itemObj._totalTime
      );
      HighscoreList.instance.addScore(newHighScore);
    });
  }

  save(): void {
    localStorage.setItem('highScores', JSON.stringify(this._list));
  }

  addScore(itemObj: ScoreItem): void {
    const existingIndex = this._list.findIndex(
      (score) => score.id === itemObj.id
    );

    if (existingIndex !== -1) {
      this._list[existingIndex] = itemObj;
    } else {
      this._list.push(itemObj);
    }

    this.sort();
    this.save();
  }

  removeScore(id: number): void {
    this._list = this._list.filter((score) => score.id !== id);
    this.save();
  }

  sort() {
    this._list.sort((a, b) => b.totalPoints - a.totalPoints);
  }
}

export { HighscoreList };
