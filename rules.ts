import fs from "fs";
import { KarabinerRules, Parameters } from './types';
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    // spacebar: open(
    //   "raycast://extensions/raycast/raycast-ai/search-ai-chat-presets"
    // ),

    // o = "Open" applications
    o: {
      a: app("Arc"),
      c: app("Notion Calendar"),
      d: app("Discord"),
      e: app("Proton Mail"),
      f: app("Finder"),
      g: app("WhatsApp"),
      m: app("Microsoft Teams"),
      n: app("Notion"),
      s: app("Spotify"),
      t: app("iTerm"),
      p: app("Proton Pass"),
      v: app("Visual Studio Code"),
    },

    // r = "Raycast"
    r: {
      1: open("raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"),
      2: open("raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      c: open("raycast://extensions/fuksman/calendar/index"),
      d: open("raycast://extensions/raycast/dictionary/define-word"),
      f: open("raycast://extensions/raycast/file-search/search-files"),
      l: open("raycast://extensions/linear/linear/assigned-issues"),
      m: open("raycast://extensions/raycast/typing-practice/start-typing-practice"),
      s: open("raycast://extensions/raycast/calendar/my-schedule"),
      t: open("raycast://extensions/raycast/translator/translate"),
      v: open("raycast://extensions/thomas/visual-studio-code/index"),
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },
  }),
  {
    description: "Change Backspace to Spacebar when Minecraft is focused",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
        },
        to: [
          {
            key_code: "spacebar",
          },
        ],
        conditions: [
          {
            type: "frontmost_application_if",
            file_paths: [
              "^/Users/mxstbr/Library/Application Support/minecraft/runtime/java-runtime-gamma/mac-os-arm64/java-runtime-gamma/jre.bundle/Contents/Home/bin/java$",
            ],
          },
        ],
      },
    ],
  },
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
