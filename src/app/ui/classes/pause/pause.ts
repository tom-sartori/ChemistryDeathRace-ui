import { Legend } from '@classes/pause/legend';
import { Button } from '@ui-components/button';
import { framePadding } from '@constants/ui-constants';
import { Label } from '@ui-components/label';

export class Pause extends Pane {

  constructor(categories: string[]) {

    // Explanation label.
    const explanationLabel: Label = new Label({
      text: 'Les catégories jouées sont affichées ici !',
      color: 'black',
    });

    // Legend.
    const legend: Legend = new Legend(categories);

    // Buttons.
    const resumeButton: Button = new Button({
      text: 'Reprendre',
      backgroundColor: 'green',
    }).tap(() => {
      this.toggle();
    });

    const quitButton: Button = new Button({
      text: 'Quitter',
      backgroundColor: 'red',
    }).tap(() => {
      if (confirm('Êtes-vous sûr de vouloir quitter la partie en cours ?')) {
        window.location.href = '/';
      }
    });

    const buttonsTile: Tile = new Tile({
      obj: series([resumeButton, quitButton]),
      align: 'center',
      spacingH: 10,
      clone: false,
      cols: 2,
      rows: 1,
    });

    // Whole pause tile.
    const pauseTile: Tile = new Tile({
      obj: series([explanationLabel, legend, buttonsTile]),
      cols: 1,
      rows: 3,
      align: 'center',
      valign: 'center',
      spacingV: 50,
      clone: false,
    });

    // Pause pane.
    super({
      content: pauseTile,
      backgroundColor: 'white',
      close: true,
      width: W - framePadding,
      height: H - framePadding,
      displayClose: false
    });
  }
}
