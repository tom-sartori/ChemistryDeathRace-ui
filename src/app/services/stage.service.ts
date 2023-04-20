export class StageService {
  private static instance: StageService;
  private _stage!: createjs.Stage;

  private constructor() {}

  public static getInstance(): StageService {
    if (!StageService.instance) {
      StageService.instance = new StageService();
    }
    return StageService.instance;
  }

  public set stage(value: createjs.Stage) {
    this._stage = value;
  }

  public get stage(): createjs.Stage {
    return this._stage;
  }
}
