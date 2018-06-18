<template>
  <p class='title'>
    {{title}}
  </p>
</template>
<script>
export default {
  name: 'TypeTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.title {
  font-weight: bold;
  padding: 16px 0 6px 10px;
}
</style>
