import app from './app.js';
import rotationColorMap from '../../support/rotationColorMap.js';

const sean = it;

describe('Sean', () => {
  const baseHeartColor = 'green';

  sean('has a green heart', () => {
    app
      .launch()
      .assertHeartDegrees(
        (degrees) => degrees === rotationColorMap[baseHeartColor]
      );
  });

  sean('has a green heart that beats when touched', () => {
    const baseHeartSize = 15;

    app
      .launch()
      .assertHeartSize((size) => size === baseHeartSize)
      .touchHeart()
      .assertHeartSize((size) => size > baseHeartSize)
      .touchHeart()
      .assertHeartSize((size) => size === baseHeartSize);
  });

  sean('has a heart that changes colour when touched', () => {
    app
      .launch()
      .touchHeart()
      .assertHeartDegrees(
        (degrees) => degrees !== rotationColorMap[baseHeartColor]
      );
  });

  sean('has a heart that changes light when touched', () => {
    app
      .launch()
      .assertHueApiColor((color) => color === baseHeartColor)
      .touchHeart()
      .assertHueApiColor((color) => color !== baseHeartColor);
  });

  describe('routing', () => {
    sean('has a heart that changes colour when requested', () => {
      const theColor = 'purple';

      app
        .launch(theColor)
        .assertHeartDegrees(
          (degrees) => degrees === rotationColorMap[theColor]
        );
    });

    sean('has a heart that changes the url when touched', async () => {
      const url = await app.launch().touchHeart().getCurrentPathAsync();

      expect(
        url.replace(/^\//, '').split('/').pop() in rotationColorMap
      ).to.equal(true);
    });
  });

  describe('server side rendering', () => {
    sean('has a green heart that is rendered server side', () => {
      // !! continue
    });
  });
});
