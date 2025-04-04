// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_color_ from "./routes/[color].tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $api_comment from "./routes/api/comment.ts";
import * as $api_hue from "./routes/api/hue.ts";
import * as $index from "./routes/index.tsx";
import * as $Heart from "./islands/Heart.tsx";
import * as $LetterBox_LetterBox from "./islands/LetterBox/LetterBox.tsx";
import * as $LetterBox_PopoverContent from "./islands/LetterBox/PopoverContent.tsx";
import * as $LetterBox_icons from "./islands/LetterBox/icons.tsx";
import * as $LetterBox_styles from "./islands/LetterBox/styles.ts";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[color].tsx": $_color_,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/api/comment.ts": $api_comment,
    "./routes/api/hue.ts": $api_hue,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Heart.tsx": $Heart,
    "./islands/LetterBox/LetterBox.tsx": $LetterBox_LetterBox,
    "./islands/LetterBox/PopoverContent.tsx": $LetterBox_PopoverContent,
    "./islands/LetterBox/icons.tsx": $LetterBox_icons,
    "./islands/LetterBox/styles.ts": $LetterBox_styles,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
