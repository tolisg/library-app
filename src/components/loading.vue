<template>
  <div
    class="row text-center justify-content-center"
    style="height:calc(100vh - 60px)"
  >
    <div class="col-sm-12 align-self-center">
      <img
        src="@/assets/spinner-icon.gif"
        height="90"
        width="90"
      >
      <h2>{{ msg }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    msg: {
      type: String,
      default: 'Getting data please be patient'
    }
  }
};
</script>
