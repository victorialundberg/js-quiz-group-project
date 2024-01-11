/* eslint-disable comma-dangle */
interface IScore {
  id: number;
  name: string;
  //   countDownToPoints: number;
  totalPoints: number;
  totalTime: number;
}

class ScoreItem implements IScore {
  private _id: number;

  constructor(
    private _name: string,
    // private _countDownToPoints: number,
    private _totalPoints: number,
    private _totalTime: number,
    id?: number
  ) {
    this._id = id || Date.now();
  }

  get id(): number {
    return this._id;
  }

  // set id(id: number) {
  //   this._id = id;
  // }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  //   get countDownToPoints(): number {
  //     return this._countDownToPoints;
  //   }

  //   set countDownToPoints(countDownToPoints: number) {
  //     this._countDownToPoints = countDownToPoints;
  //   }

  get totalPoints(): number {
    return this._totalPoints;
  }

  set totalPoints(totalPoints: number) {
    this._totalPoints = totalPoints;
  }

  get totalTime(): number {
    return this._totalTime;
  }

  set totalTime(totalTime: number) {
    this._totalTime = totalTime;
  }
}

export { ScoreItem };
export type { IScore };
