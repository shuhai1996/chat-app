<script>

export default {
  name: 'HomeView',
  mounted () {
    console.log(import.meta.env.VITE_BASE_URL)
    console.log(this.$store.getters)
    if (location.href.indexOf('#reloaded') === -1) {
      location.href = location.href + '#reloaded'
      location.reload()
    }
  }
}
</script>

<style scoped></style>
