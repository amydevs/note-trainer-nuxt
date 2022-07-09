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
        enable_treble: true,
        enable_bass: true,

        selected_note: null as Note | null,

        min_max_treble: new MinMaxNote(
          new Note("A", 4),
          new Note("C", 5)
        ),
        min_max_bass: new MinMaxNote(
          new Note("A", 2),
          new Note("C", 4)
        ),
      }
    },

    mounted() {
      this.refresh()
      this.refresh()
    },
    methods: {
      refresh() {
        let note_render_el = (this.$refs.noterender as Vue).$el;
        if (note_render_el.firstChild) {
          note_render_el.removeChild(note_render_el.firstChild);
        }

        const vf = new this.$vex.Factory({
          renderer: { elementId: 'noterender', width: 500, height: 200 },
        });
        const score = vf.EasyScore();
        const system = vf.System();

        let { note, clef, accidental } = this.randomizer();

        this.selected_note = note;

        console.log(note.to_easyscore(accidental))

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
