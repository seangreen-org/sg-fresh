const getHeartSizeFromFontSize = (fontSize) =>
  parseInt(fontSize.replace(/vw$/));

const getDegreesFromFilter = (style) =>
  parseInt(style.match(/hue-rotate\((\d+)deg\)/)[1]);

export default {
  launch: (path = '/') => {
    cy.intercept('/api/hue').as('hue');
    cy.visit(path);

    const heart = cy.get('button').contains('💚');

    const api = {
      touchHeart: () => {
        heart.click();
        return api;
      },
      getCurrentPathAsync: () => new Promise(resolve => {
        cy.url().then(url => resolve(new URL(url).pathname));
      }),
      assertHeartDegrees: (assertion) => {
heart.should(($heart) => {
          if (!assertion(getDegreesFromFilter($heart[0].style.filter))) {
            throw new Error(
              `degrees doesn\'t pass assertion: ${assertion.toString()}`
            );
          }
        });
        return api;
      },
      assertHeartSize: (assertion) => {
        heart.should(($heart) => {
          if (!assertion(getHeartSizeFromFontSize($heart[0].style.fontSize))) {
            throw new Error(
              `size doesn\'t pass assertion: ${assertion.toString()}`
            );
          }
        });
        return api;
      },
      assertHueApiColor: (assertion) => {
        cy.wait('@hue').should(interceptedRequest => {
          if (!assertion(interceptedRequest.request.body.color)) {
            throw new Error(
              `api colour doesn\'t pass assertion: ${assertion.toString()}`
            );
          }
        });
        return api;
      },
    };

    return api;
  },
};
