<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
      </v-toolbar>
      <!-- <v-list
        three-line
        subheader
      >
        <v-subheader>User Controls</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Minimum</v-list-item-title>
            <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-text-field></v-text-field>
          </v-list-item-action>

        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Password</v-list-item-title>
            <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider> -->

      <v-list
        three-line
        subheader
      >
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="value.enable_audio"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Enable Audio</v-list-item-title>
            <v-list-item-subtitle>Enable the audio synthesizer.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        three-line
        subheader
      >
        <v-subheader>Gameplay Mode</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="perfect_pitch_mode"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Enable Perfect Pitch Training Mode</v-list-item-title>
            <v-list-item-subtitle>Turn on perfect pitch training mode.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        three-line
        subheader
      >
        <v-subheader>Clefs</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="value.enable_treble"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Enable Treble Clef</v-list-item-title>
            <v-list-item-subtitle>Enable the treble clef for the sheet music renderer.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="value.enable_bass"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Enable Bass Clef</v-list-item-title>
            <v-list-item-subtitle>Enable the bass clef for the sheet music renderer.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Note, note_letters } from '~/modules/note'
import { PlaySettingsProps } from '~/modules/play/settings';

export default Vue.extend({
  props: {
    value: PlaySettingsProps
  },
  data () {
    return {
      show: false,

      note_letters,
    }
  },
  methods: {
  },
  watch: {
    "value.enable_audio": function(e: boolean) {
      if (!e) {
        this.value.enable_render = true;
      }
    }
  },
  computed: {
    perfect_pitch_mode: {
      get(): boolean {
        return this.value.enable_audio && !this.value.enable_render
      },
      set(e: boolean) {
        if (e) {
          this.value.enable_audio = true;
          this.value.enable_render = false;
        }
        else {
          this.value.enable_render = true;
        }
      }
    }
  }
})
</script>
