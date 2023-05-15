export class AppConstants {
  static ROUTES = class {
    public static readonly HOME: string = 'home';
    public static readonly ABOUT: string = 'about';
    public static readonly NOT_FOUND: string = 'not-found';
    public static readonly GAME: string = 'game';
    public static readonly PARAMS: string = 'params';
    public static readonly PLAYERS: string = 'players';
    public static readonly PLAY: string = 'play';
    public static readonly TEST: string = 'test';


    public static readonly GAME_PARAMS: string = this.GAME + '/' + this.PARAMS;
    public static readonly GAME_PLAYERS: string = this.GAME + '/' + this.PLAYERS;
    public static readonly GAME_PLAY: string = this.GAME + '/' + this.PLAY;
    public static readonly GAME_TEST: string = this.GAME + '/' + this.TEST;
  }

  static LOCAL_STORAGE = class {
    public static readonly GAME_PARAMS: string = 'game-params';
    public static readonly GAME: string = 'game';
  }

  static FONT = class {
    public static readonly NAME: string = 'Ink Free';
    public static readonly PATH: string = 'assets/fonts/Ink_Free/Inkfree.ttf';
    // public static readonly PATH: string = 'assets/fonts/Freckle_Face/FreckleFace-Regular.ttf';
  }

  static COLORS = class {
    public static readonly BACKGROUND: GradientColor = '#eff9ff';
    public static readonly BLUE: GradientColor = '#0066a9';
    public static readonly TURQUOISE: GradientColor = '#8acbc1';
    public static readonly RED: GradientColor = '#d64e50';

    public static readonly PLAYER1: GradientColor = '#9D0000';
    public static readonly PLAYER2: GradientColor = '#76009D';
    public static readonly PLAYER3: GradientColor = '#229D00';
    public static readonly PLAYER4: GradientColor = '#00259D';

    public static readonly CATEGORY1: GradientColor = '#00B050';
    public static readonly CATEGORY2: GradientColor = '#ed7d31';
    public static readonly CATEGORY3: GradientColor = '#5b9bd5';
    public static readonly CATEGORY4: GradientColor = '#ffff00';
    public static readonly CATEGORY5: GradientColor = '#96450E';
    public static readonly CATEGORY6: GradientColor = '#cd68cb';

    public static readonly PODIUM1: GradientColor = '#FFD700';
    public static readonly PODIUM1_LABEL: GradientColor = '#be9e00';
    public static readonly PODIUM2: GradientColor = '#C0C0C0';
    public static readonly PODIUM2_LABEL: GradientColor = '#868686';
    public static readonly PODIUM3: GradientColor = '#b27031';
    public static readonly PODIUM3_LABEL: GradientColor = '#774d20';
  }
}
