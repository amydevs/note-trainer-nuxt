<template>
    <div id="inspire">
        <note-renderer id="noterender" ref="noterender" />
        <div class="button-grid">
          <button class="reroll" v-for="note in notes" :key="note">{{note}}</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import NoteRenderer from "~/components/play/NoteRender.vue";

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
        notes: ["C", "CD", "D", "DE", "E", "F", "FG", "G", "GA", "A", "AB", "B"],
        octaves: Array.from({length: 10}, (_, i) => i + 1),
        possible_notes: [] as PossibleNote[],
      }
    },

    mounted() {
      for (let octave of this.octaves) {
        this.possible_notes.push(...this.notes.map(note => ({note, octave})))
      }
      console.log(this.possible_notes)

      console.log((this.$refs['noterender'] as any).$el)
      const VF = this.$vex;

      const vf = new VF.Factory({
        renderer: { elementId: 'noterender', width: 500, height: 200 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      let { note, clef } = this.randomizer();
      if (note.note.length !== 1) {
        note.note = note.note.slice(0, -1)
      }
      system
        .addStave({
          voices: [
            score.voice(score.notes(`${note.note}${note.octave}/w`, { stem: 'up' })),
          ],
        })
        .addClef(clef)
        .addTimeSignature('4/4');

      vf.draw();
    },
    methods: {
      refresh() {

      },
      randomizer() {
        let random_clefs = [
          ...this.enable_treble ? [Clef.Treble] : [],
          ...this.enable_bass ? [Clef.Bass] : [],
        ];
        if (random_clefs.length === 0) {
          random_clefs = [Clef.Treble, Clef.Bass]
        }

        let clef = random_clefs[Math.floor(Math.random()*random_clefs.length)];

        let minfloor = 0;
        let maxceiling = 0;

        switch(clef) {
          case Clef.Bass:
            console.log("bass");
            minfloor = 18;
            maxceiling = 42;
            break;
          case Clef.Treble:
            console.log("treble");
            minfloor = 38;
            maxceiling = 70;
            break;
        }
        let note = this.possible_notes[this.random_num_from_interval(minfloor, maxceiling)];

        return {note, clef};
      },
      random_num_from_interval(min: number, max: number) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    }
})

enum Accidental {
  Sharp = "#",
  Flat = "b",
}

enum Clef {
  Treble = "treble",
  Bass = "bass"
}

interface PossibleNote {
  note: string,
  octave: number
}
</script>

<style lang="scss" scoped>

</style>
