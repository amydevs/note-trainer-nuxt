<template>
    <div id="inspire">
        <note-renderer id="noterender" ref="noterender" />
        <div class="button-grid">
          <!-- <button class="reroll" v-for="note in notes" :key="note">{{note}}</button> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Factory } from 'vexflow';
import Vue from 'vue'

import NoteRenderer from "~/components/NoteRender.vue";

import { Note, Clef, Accidental } from '~/modules/note'
import { Randomizer, MinMaxNote } from '~/modules/note/randomizer'

export default Vue.extend({
    components: {
      NoteRenderer
    },
    data() {
      return {

        indexOfArray: 0,
        randomchars: [],

        enable_treble: true,
        enable_bass: true,
        showNotation: true,
        playSynth: true,
        showSettings: false,
        showHelp: false,

        renderer: undefined,
        min_max_treble: new MinMaxNote(
          new Note("A", 4),
          new Note("C", 6)
        ),
        min_max_bass: new MinMaxNote(
          new Note("A", 2),
          new Note("C", 4)
        ),
      }
    },

    mounted() {
      const VF = this.$vex;
      const vf = new VF.Factory({
        renderer: { elementId: 'noterender', width: 500, height: 200 },
      });
      this.refresh(vf);
    },
    methods: {
      refresh(vf: Factory) {

        const score = vf.EasyScore();
        const system = vf.System();

        let { note, clef, accidental } = this.randomizer();

        system
          .addStave({
            voices: [
              score.voice(score.notes(`${note.to_easyscore(accidental)}/w`, { clef, stem: 'up' })),
            ],
          })
          .addClef(clef)
          .addTimeSignature('4/4');

        vf.draw();
      },
      randomizer() {
        let random_clefs = [
          ...this.enable_treble ? [Clef.Treble] : [],
          ...this.enable_bass ? [Clef.Bass] : [],
        ];
        let randomizer = new Randomizer(this.min_max_treble, this.min_max_bass, random_clefs);
        return randomizer.get_random();
      },
      random_num_from_interval(min: number, max: number) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    }
})
</script>

<style lang="scss" scoped>

</style>
