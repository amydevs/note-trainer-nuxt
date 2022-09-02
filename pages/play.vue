<template>
    <v-container fill-height>
      <v-dialog
        v-model="how_to_play"
        width="500"
      >
        <v-card>
          <v-card-title>
            How to Play
          </v-card-title>
          <v-card-text>
            Select the corresponding note displayed on the upper segment of the display using the Piano buttons on the bottom segment of the display. The game ends when you have made 3 mistakes, at which point the score is saved to your account if you are logged in.
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="() => { how_to_play = false; $tone.start() }"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex fill-height class="d-flex flex-column">
        <v-card>
          <v-toolbar dense>
            <v-toolbar-title>Score: {{ score }}</v-toolbar-title>
            <v-spacer />
            <play-settings v-model="play_settings" />
            <v-btn icon to="profile" title="Saved Scores">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
            <v-spacer />
            <v-toolbar-title>Mistakes: {{ fails }}</v-toolbar-title>
          </v-toolbar>
          <note-renderer v-show="play_settings.enable_render" id="noterender" ref="noterender">
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
          <v-card-title>
            Score: {{ score }}
          </v-card-title>
          <v-btn @click="play_again()">
            OK
          </v-btn>
        </v-card>
      </v-overlay>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import NoteRenderer from "~/components/play/NoteRender.vue";

import { Note, Clef, Accidental, NoteLetter, note_letters } from '~/modules/note'
import { Randomizer, MinMaxNote } from '~/modules/note/randomizer'
import { PlaySettingsProps } from '~/modules/play/settings'

import { insert_score, Score } from '~/modules/user/score'
import PlaySettings from '~/components/play/PlaySettings.vue';

export default Vue.extend({
  components: {
    NoteRenderer,
    PlaySettings
  },
  data() {
    return {
      selected_note: null as Note | null,
      score: 0,
      fails: 0,

      how_to_play: true,

      synth: new this.$tone.Synth().toDestination(),

      play_settings: new PlaySettingsProps()
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

      if (this.play_settings.enable_audio) {
        try {
          this.synth.triggerAttackRelease(note.to_easyscore(accidental), "8n");
        }
        catch {
          this.$tone.start()
        }
      }
    },
    randomizer() {
      let random_clefs = [
        ...this.play_settings.enable_treble ? [Clef.Treble] : [],
        ...this.play_settings.enable_bass ? [Clef.Bass] : [],
      ];
      let randomizer = new Randomizer(this.play_settings.min_max_treble, this.play_settings.min_max_bass, random_clefs);
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
    play_again() {
      this.score = 0;
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
      if (failed && this.$accessor.saved.user) {
        this.$accessor.SET_LOADING(true);
        insert_score(this, {
          score: this.score,
          user_id: this.$accessor.saved.user.id
        }).then(() => {
          this.$accessor.SET_LOADING(false);
        })
      }
      return failed;
    }
  },
  watch: {
    play_settings: {
      handler() {
        this.play_again()
      },
      deep: true
    }
  }
})
</script>

<style lang="scss" scoped>
  #noterender {
    height: 45vh;
    width: 100%;
    :deep(svg) {
      height: 100% !important;
      width: 100% !important;
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
