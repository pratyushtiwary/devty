<template>
  <div class="container">
    <h1>JavaScript Minifier</h1>
    <textarea
      v-model="inputCode"
      placeholder="Enter your JavaScript code"
      class="inputText"
      @input="adjustTextarea"
    ></textarea>
    <button @click="minifyCode">Minify</button>
    <h2>Minified Code:</h2>
    <p class="minifiedOutput">{{ minifiedCode }}</p>
  </div>
</template>

<script lang="ts">
import {minify} from "terser";
export default {
  data() {
    return {
      inputCode: '',
      minifiedCode: ''
    }
  },
  methods: {
    minifyCode() {
      minify(this.inputCode).then((result: any)=>{
        this.minifiedCode = result.code
      }).catch(()=>{
        this.minifiedCode = "Check your code for errors."
      })
    },
    adjustTextarea(event: Event) {
      const textarea = event.target as HTMLInputElement
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.inputText {
  width: 100%;
  flex-grow: 1;
  resize: vertical; /* Allow vertical resizing */
  min-height: 100px; /* Set a minimum height */
}

.minifiedOutput {
  width: 100%; /* Set the width to 100% of the container */
  white-space: pre-wrap; /* Wrap long lines */
}

/* Add your other CSS styles here if needed */
</style>
