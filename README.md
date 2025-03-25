# SG FRESH 💚

A personal website built with Fresh, featuring an interactive heart
visualization and dynamic UI elements.

## 🛠️ Tech Stack

- 🦕 **[Deno](https://deno.com/)**: Modern runtime for JavaScript and TypeScript

- 🍋 **[Fresh](https://fresh.deno.dev/)**: Next-gen web framework for Deno

- ⚛️ **[Preact](https://preactjs.com/)**: Fast 3kB alternative to React

- 💡 **[Hue API](https://developers.meethue.com)**: Real world impact

## Features

- Interactive color-changing heart visualization
- Dynamic galaxy background with SVG animations
- Integration with Philips Hue lights via API
- Mobile-responsive design
- PWA support with web manifest

## Development

### Prerequisites

1. Install Deno

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

### Running Locally

1. Start the development server:

```sh
deno task start
```

The application will be available at `http://localhost:8000`

### Available Commands

- `deno task start` - Start the development server
- `deno task check` - Run format, link and type check
- `deno task build` - Builds assets in `./_fresh`
- `deno task preview` - Serve built assets in `./_fresh` to mimic production
- `deno task test` - Run Playwright tests (expects the project to be running)

- `deno lint` - Run linter
- `deno fmt` - Run formatter

## Project Structure

```
sg-fresh/
├── components/     # Reusable UI components
├── islands/        # Interactive components
├── routes/         # Page components and API routes
├── static/         # Static assets
├── fresh.gen.ts   # Auto-generated routes
├── dev.ts         # Development entry point
├── main.ts        # Production entry point
└── deno.json      # Project configuration
```

## Deployment

This project is automatically deployed to Deno Deploy when changes are pushed to
the main branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
