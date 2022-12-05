import app from './app.js';

const sean = it;

describe('Sean', () => {
  beforeEach(() => {
    app.launch();
  });

  sean('has a green heart', () => {
    app.getHeart().assertDegrees((degrees) => degrees === 0);
  });

  sean('has a green heart that beats when touched', () => {
    const baseHeartSize = 15;

    app
      .getHeart()
      .assertSize((size) => size === baseHeartSize)
      .touch()
      .assertSize((size) => size > baseHeartSize)
      .touch()
      .assertSize((size) => size === baseHeartSize);
  });

  sean('changes colour when heart is touched', () => {
    app
      .getHeart()
      .touch()
      .assertDegrees((degrees) => degrees !== 0);
  });

  sean('changes light when heart is touched', () => {
    const baseColor = 'green';

    app
      .getHeart()
      .assertHueApiColor((color) => color === baseColor)
      .touch()
      .assertHueApiColor((color) => color !== baseColor);
  });
});
