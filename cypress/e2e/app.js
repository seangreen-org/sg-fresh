const location = 'http://localhost:8000/'; // !! move to env

let heart;

export default {
  launch: () => {
    cy.visit(location);
    cy.intercept(`${location}/api/hue`).as('hue');
  },
  getHeart: () => {
    heart = cy.get('button').contains('💚');

    const api = {
      touch: () => {
        heart.click();
        return api;
      },
      assertDegrees: (assertion) => {
        heart.should(($heart) => {
          if (!assertion(getDegreesFromFilter($heart[0].style.filter))) {
            throw new Error(
              `degrees doesn\'t pass assertion: ${assertion.toString()}`
            );
          }
        });
        return api;
      },
      assertSize: (assertion) => {
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

const getHeartSizeFromFontSize = (fontSize) =>
  parseInt(fontSize.replace(/vw$/));

const getDegreesFromFilter = (style) =>
  parseInt(style.match(/hue-rotate\((\d+)deg\)/)[1]);
