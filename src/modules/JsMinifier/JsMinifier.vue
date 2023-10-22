<template>
  <div class="container">
    <h1>JavaScript Minifier</h1>
    <Input input-type="textarea" placeholder="Enter content to minify..." class="inputText" label="Input"
                :value="inputCode" @update:value="handleUpdate"></Input>
    
    <h2>Minified Code:</h2>
    <Output class="minifiedOutput" :label="minifiedCode" />
    
  </div>
</template>

<script lang="ts">
import {minify} from "terser";
import Input from "../../components/InputComponent.vue";
import Output from "../../components/OutputOptionsComponent.vue";

export default {
  data: () => {
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
    },
    handleUpdate(newVal: any) {
      this.inputCode = newVal;
      minify(this.inputCode).then((result: any)=>{
        this.minifiedCode = result.code
      }).catch(()=>{
        this.minifiedCode = "Check your code for errors."
      })      
    }
  },
  components: {
    Input,
    Output
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
  resize: vertical; 
  min-height: 100px; 
}

.minifiedOutput {
  width: 100%; 
  white-space: pre-wrap; 
}


</style>
