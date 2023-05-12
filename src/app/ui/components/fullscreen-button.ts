import { Button } from '@ui-components/button';

export class FullscreenButton extends Button {

  constructor(size: number) {

    super({
      text: "⛶",
      width: size,
      height: size,
      backgroundColor: "rgba(0,0,0,0)",
    });

    this.tap(() => {
      this.toggleFullScreen();
    });

    this.visible = !(window.navigator as any).standalone;
  }

  private toggleFullScreen = (): void => {
    if (!document.fullscreenElement &&
      !(document as any).webkitFullscreenElement && // Chrome, Safari et Opera
      !(document as any).mozFullScreenElement && // Firefox
      !(document as any).msFullscreenElement) { // IE et Edge
      this.requestFullscreen(document.documentElement);
    }
    else {
      this.exitFullscreen();
    }
  }

  private requestFullscreen = (element: HTMLElement): void => {
    const methodName = (
      element.requestFullscreen ||
      (element as any).webkitRequestFullscreen || // Chrome, Safari et Opera
      (element as any).mozRequestFullScreen || // Firefox
      (element as any).msRequestFullscreen // IE et Edge
    );

    if (methodName) {
      methodName.call(element);
    }
    else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        alert("Pour utiliser ce site en mode plein écran, veuillez l'ajouter à votre écran d'accueil. Pour ce faire, depuis l'écran d'accueil du jeu, cliquer sur l'icône de partage et en sélectionner \"Ajouter à l'écran d'accueil\".");
      }
      else {
        alert("Le mode plein écran n'est pas pris en charge par ce navigateur.");
      }
    }
  }

  private exitFullscreen = (): void => {
    const methodName = (
      document.exitFullscreen ||
      (document as any).webkitExitFullscreen || // Chrome, Safari et Opera
      (document as any).mozCancelFullScreen || // Firefox
      (document as any).msExitFullscreen // IE et Edge
    );

    if (methodName) {
      methodName.call(document);
    }
    else {
      alert("Le mode plein écran n'est pas pris en charge par ce navigateur.");
    }
  }

}
