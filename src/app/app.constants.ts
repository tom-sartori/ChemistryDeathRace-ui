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

  static FONT = class {
    public static readonly NAME = 'Ink Free';
    public static readonly PATH = 'assets/fonts/Ink_Free/Inkfree.ttf';
    // public static readonly PATH = 'assets/fonts/Freckle_Face/FreckleFace-Regular.ttf';
  }

  static COLORS = class {
    public static readonly BACKGROUND = '#eff9ff';
    public static readonly BLUE = '#0066a9';
    public static readonly TURQUOISE = '#8acbc1';
    public static readonly RED = '#d64e50';

    public static readonly PLAYER1 = '#9D0000';
    public static readonly PLAYER2 = '#76009D';
    public static readonly PLAYER3 = '#229D00';
    public static readonly PLAYER4 = '#00259D';

    public static readonly CATEGORY1 = '#00B050';
    public static readonly CATEGORY2 = '#ed7d31';
    public static readonly CATEGORY3 = '#5b9bd5';
    public static readonly CATEGORY4 = '#ffff00';
    public static readonly CATEGORY5 = '#96450E';
    public static readonly CATEGORY6 = '#cd68cb';

    public static readonly PODIUM1 = '#FFD700';
    public static readonly PODIUM1_LABEL = '#be9e00';
    public static readonly PODIUM2 = '#C0C0C0';
    public static readonly PODIUM2_LABEL = '#868686';
    public static readonly PODIUM3 = '#b27031';
    public static readonly PODIUM3_LABEL = '#774d20';
  }
}
