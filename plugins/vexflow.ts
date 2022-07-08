import Vue from 'vue'
import { Flow } from 'vexflow'

console.log(Flow);

declare module 'vue/types/vue' {
  interface Vue {
    $vex: typeof Flow
  }
}

Vue.prototype.$vex = Flow

