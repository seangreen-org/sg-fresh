const isInternal = () =>
  JSON.stringify(Deno.env.get('SG_NETWORK')) === JSON.stringify('internal');

const trackColorChangeEvent = async (request: Request, color: string) => {

  try {
    const response = await fetch('https://cloud.umami.is/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: {
          hostname: request.headers.get('host'),
          language: request.headers.get('accept-language'),
          referrer: request.headers.get('referer'),
          screen: `0x0`,
          title: 'Server',
          url: request.url,
          website: '192417e2-392b-4ac0-bbbe-f1d0c25fb369',
          name: 'color-change',
          data: {
            color,
          }
        },
        type: 'event',
      }),
    });

    console.log('!! sent', JSON.stringify({
      payload: {
        hostname: request.headers.get('host'),
        language: request.headers.get('accept-language'),
        referrer: request.headers.get('referer'),
        screen: `0x0`,
        title: 'Server',
        url: request.url,
        website: '192417e2-392b-4ac0-bbbe-f1d0c25fb369',
        name: 'color-change',
        data: {
          color,
        }
      },
      type: 'event',
    }))

    const responseText = await response.text();
    console.log('Umami API response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText
    });
  } catch {
    console.error('tracking color change event failed');
  }
};

export const handler = {
  async POST(request: Request) {
    const color = (await request.json()).color;

    try {
      await fetch(
        `http://${
          isInternal() ? 'localhost' : '86.13.194.207'
        }:3000/?color=${color}`
      );
    } catch {
      console.error('hue proxy call failed');
    }

    console.log('!! tracking color change event', color);
    queueMicrotask(async () => {
      console.log('!! queueMicrotask', color);
      await trackColorChangeEvent(request, color);
      console.log('!! queueMicrotask done', color);
    });

    return new Response();
  },
};
