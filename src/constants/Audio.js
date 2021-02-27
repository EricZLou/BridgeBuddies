export const CARD_PLAY_AUDIO = new Audio("media/card_play.mp3");
export const NEW_GAME_AUDIO = new Audio("media/card_shuffle.mp3");

export function muteAllAudio() {
  CARD_PLAY_AUDIO.muted = true;
  NEW_GAME_AUDIO.muted = true;
};
export function unmuteAllAudio() {
  CARD_PLAY_AUDIO.muted = false;
  NEW_GAME_AUDIO.muted = false;
}
