import Keybed from "./components/keybed.js";
import AudioService from "./services/audio_service.js";

const app = document.getElementById("app");
const keyboard = document.createElement("div");
keyboard.id = "keyboard";

keyboard.addEventListener("mousedown", new AudioService().initialize, { once: true });

app.appendChild(keyboard);

const keybed = new Keybed({ octaves: 2 });
