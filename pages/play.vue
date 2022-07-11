<template>
    <v-container fill-height>
      <v-flex fill-height class="d-flex flex-column">
        <v-card>
          <v-toolbar dense>
            <v-toolbar-title>Score: {{ score }}</v-toolbar-title>
            <v-spacer />
            <v-btn icon>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-spacer />
            <v-toolbar-title>Mistakes: {{ fails }}</v-toolbar-title>
          </v-toolbar>
          <note-renderer id="noterender" ref="noterender">
            <div class="d-flex overlay pa-3">
            </div>
          </note-renderer>
        </v-card>
        <v-card class="mt-3 pa-3 d-flex justify-center overflow-x-auto text-no-wrap piano_wrapper" style="height: 100%">
            <v-btn
              v-for="(note_letter, i) in get_note_letter_rot()"
              :color="note_letter.length === 1 ? '' : 'primary'"
              :class="`piano_${note_letter.length === 1 ? 'major' : 'minor'}_key`"
              :key="i"
              @click="play_note(note_letter)"
              >
              {{ note_letter }}
            </v-btn>
        </v-card>
      </v-flex>
      <v-overlay
        absolute
        :value="is_failed"
        >
        <v-card class="pa-3 text-center">
          <h1>
            Score: {{ score }}
          </h1>
          <v-btn @click="play_again(score)">
            OK
          </v-btn>
        </v-card>
      </v-overlay>
    </v-container>
</template>

<script lang="ts">
import { Factory } from 'vexflow';
import Vue from 'vue'

import NoteRenderer from "~/components/play/NoteRender.vue";

import { Note, Clef, Accidental, NoteLetter, note_letters } from '~/modules/note'
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
        score: 0,
        fails: 0,

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
      this.refresh();
    },
    methods: {
      refresh() {
        let note_render_el = (this.$refs.noterender as Vue).$el;
        if (note_render_el.firstChild) {
          note_render_el.removeChild(note_render_el.firstChild);
        }

        const vf = new this.$vex.Factory({
          renderer: { elementId: 'noterender', width: 300, height: 130 },
        });
        const score = vf.EasyScore();
        const system = vf.System();

        let { note, clef, accidental } = this.randomizer();

        this.selected_note = note;

        system
          .addStave({
            voices: [
              score.voice(score.notes(`${note.to_easyscore(accidental)}/w`, { clef, stem: 'up' })),
            ],
          })
          .addClef(clef)
          .addTimeSignature('4/4');

        vf.draw();

        if (note_render_el.firstChild) {
          try {
            let svg_el = (note_render_el.firstChild as SVGElement);
            let view_box = ((svg_el.attributes as any).viewBox.value as string).split(" ");
            view_box[0] = (Number(view_box[3]) / -1.5).toString();
            svg_el.setAttribute("viewBox", view_box.join(" "))
          }
          catch (_) {}
        }
      },
      randomizer() {
        let random_clefs = [
          ...this.enable_treble ? [Clef.Treble] : [],
          ...this.enable_bass ? [Clef.Bass] : [],
        ];
        let randomizer = new Randomizer(this.min_max_treble, this.min_max_bass, random_clefs);
        return randomizer.get_random();
      },
      play_note(e: NoteLetter) {
        if (e === this.selected_note?.note) {
          this.score++;
          this.refresh();
        }
        else {
          this.fails++;
        }
      },
      play_again(final_score: number) {
        this.score = final_score;
        this.fails = 0;
        this.refresh();
      },

      get_note_letter_rot() {
        return this.array_rotate([...note_letters], 3);
      },
      array_rotate<T,>(arr: Array<T>, n: number) {
        n = n % arr.length;
        return arr.slice(n, arr.length).concat(arr.slice(0, n));
      }
    },
    computed: {
      is_failed(): boolean {
        let failed = this.fails >= 3;
        if (failed) {

        }
        return failed;
      }
    }
})
</script>

<style lang="scss" scoped>
  #noterender {
    position: relative;
    height: 0;
    width: 100%;
    padding: 0;
    padding-bottom: 45vh;
    :deep(svg) {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
  .piano_wrapper {
    .piano_major_key {
      height: 100% !important;
      min-width: 10px !important;
      width: 4vw;
      max-width: 64px;
    }
    .piano_minor_key {
      height: 50% !important;
      min-width: 4px !important;
      width: 3vw;
      max-width: 64px;
    }
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
