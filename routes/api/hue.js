const isInternal = () =>
  JSON.stringify(Deno.env.get('SG_NETWORK')) === JSON.stringify('internal');

export const handler = {
  async POST(request) {
    const rotation = (await request.json()).hue;
    try {
      await fetch(
        `http://${
          isInternal() ? 'localhost' : '86.25.145.140'
        }:3000/?rotation=${rotation}`
      );
    } catch (error) {
      console.error('hue proxy call failed', error);
    }

    return new Response();
  },
};
