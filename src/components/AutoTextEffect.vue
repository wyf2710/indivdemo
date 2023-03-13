<template>
  <h1 id="text" ref="myRef">{{text}}
    网站维护中 .......
  </h1>
</template>

<script>
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue'
export default {
  setup() {
    const myRef = ref(null)
    let idx = 1

    // function writeText() {
    //   myRef.value.innerText = text.slice(0, idx)
    //   idx++
    //   if (idx > text.length) {
    //     idx = 1
    //   } else {
    //     console.log(1)
    //     setTimeout(writeText())
    //   }
    // }

    onBeforeMount(() => {
      // console.log(myRef, text, idx)
      // writeText()
    })
    return {
      myRef,
      // text,
      idx
    }
  },
  data() {
    return {
      text: 'dgaskdshkashdkhsakj',
      speed: 300,
      idx: 1
    }
  },
  methods: {}
}
</script>

<style>
</style>