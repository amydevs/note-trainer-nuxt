import Vue from 'vue'
import * as Tone from 'tone';

declare module 'vue/types/vue' {
  interface Vue {
    $tone: typeof Tone
  }
}

Vue.prototype.$tone = Tone
