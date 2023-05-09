export class AppConstants {
  static ROUTES = class {
    public static readonly HOME = 'home';
    public static readonly ABOUT = 'about';
    public static readonly NOT_FOUND = 'not-found';
    public static readonly GAME = 'game';
    public static readonly PARAMS = 'params';
    public static readonly PLAYERS = 'players';
    public static readonly PLAY = 'play';
    public static readonly TEST = 'test';


    public static readonly GAME_PARAMS = this.GAME + '/' + this.PARAMS;
    public static readonly GAME_PLAYERS = this.GAME + '/' + this.PLAYERS;
    public static readonly GAME_PLAY = this.GAME + '/' + this.PLAY;
    public static readonly GAME_TEST = this.GAME + '/' + this.TEST;
  }

  static LOCAL_STORAGE = class {
    public static readonly GAME_PARAMS = 'game-params';
  }
}
