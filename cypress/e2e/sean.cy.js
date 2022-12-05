import app from './app.js';
import rotationColorMap from '../../support/rotationColorMap.js';

const sean = it;

describe('Sean', () => {
  const baseHeartColor = 'green';

  beforeEach(() => {
    app.launch();
  });

  sean('has a green heart', () => {
    app
      .getHeart()
      .assertDegrees((degrees) => degrees === rotationColorMap[baseHeartColor]);
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
      .assertDegrees((degrees) => degrees !== rotationColorMap[baseHeartColor]);
  });

  sean('changes light when heart is touched', () => {
    app
      .getHeart()
      .assertHueApiColor((color) => color === baseHeartColor)
      .touch()
      .assertHueApiColor((color) => color !== baseHeartColor);
  });
});
