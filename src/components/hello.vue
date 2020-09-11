<template>
  <div>{{item}}</div>
</template>
<script>
export default {
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch("fetchItem", 22);
  },
  data() {
      return {

      }
  },
  computed: {
    item() {
      return this.$store.state.items
    },
  },
};
</script>
