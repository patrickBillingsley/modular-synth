import Manual from "./components/manual.js";
import Keyboard from "./components/keyboard.js";
import Knob, { KnobType } from "./components/knob.js";
import AudioService from "./services/audio_service.js";

window.addEventListener("mousedown", new AudioService().initialize, { once: true });

new Keyboard({
  controls: [
    new Knob({
      label: 'Volume',
      type: KnobType.GAIN,
      onChange: new AudioService().setVolume,
    }),
  ],
  manuals: [
    new Manual({}),
  ],
});
