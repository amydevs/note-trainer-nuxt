<template>
  <div :class="`render ${dark}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Framework } from 'vuetify';

export default Vue.extend({
  mounted() {
    // const VF = this.$vex.Flow;
    // // Create a VexFlow renderer attaced to the DIV element "boo"
    // var renderer = new VF.Renderer((this.$refs['noterender'] as HTMLDivElement), VF.Renderer.Backends.SVG)

    // // Configure the rendering context.
    // renderer.resize(500, 500);
    // this.$emit('context', renderer.getContext());
  },
  computed: {
    dark(): Boolean {
      return this.$vuetify.theme.dark;
    }
  }
})
</script>

<style lang="scss" scoped>
.true {
  --color-var: white;
}
.false {
  --color-var: black;
}
.render {
  ::v-deep svg {
    * {
      stroke: var(--color-var) !important;
      fill: var(--color-var) !important;
    }
  }
}
</style>
