/**
 * Events broadcast from LVA to peripheral clients.
 */
export enum LVAEventType {
  WAKE_WORD_DETECTED = "wake_word_detected",
  LISTENING = "listening",
  THINKING = "thinking",
  TTS_SPEAKING = "tts_speaking",
  TTS_FINISHED = "tts_finished",
  ERROR = "error",
  IDLE = "idle",
  MUTED = "muted",
  TIMER_TICKING = "timer_ticking",
  TIMER_UPDATED = "timer_updated",
  TIMER_RINGING = "timer_ringing",
  MEDIA_PLAYER_PLAYING = "media_player_playing",
  VOLUME_CHANGED = "volume_changed",
  VOLUME_MUTED = "volume_muted",
  ZEROCONF = "zeroconf",
  SNAPSHOT = "snapshot",
}

export class LVAEvent {
  type: LVAEventType;
  data: { [key: string]: any };

  constructor(raw: { [key: string]: any }) {
    this.type = raw["event"] as LVAEventType;
    const {event: _, ...rest} = raw;
    this.data = rest
  }
}

/**
 * Commands accepted from peripheral clients.
 */
export enum LVACommandType {
  START_LISTENING = "start_listening",
  STOP_LISTENING = "stop_listening",
  MUTE_MIC = "mute_mic",
  UNMUTE_MIC = "unmute_mic",
  VOLUME_UP = "volume_up",
  VOLUME_DOWN = "volume_down",
  STOP_TIMER_RINGING = "stop_timer_ringing",
  STOP_MEDIA_PLAYER = "stop_media_player",
  STOP_SPEAKING = "stop_speaking",
}