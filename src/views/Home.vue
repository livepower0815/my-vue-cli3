<template>
  <div class="">
    <!-- navbar元件 -->
    <navbar class="sticky-top" />
    <AlertMessage />
    <div class="bg-gray"></div>
    <main>

      <!-- 分頁router -->
      <router-view></router-view>


      <!-- FOOTER -->
    </main>
    <footer>
      <p class="my-0 ali_mid">Copyright 2019 ©猴寶電子商務練習用版型 無商業用途</p>
    </footer>
  </div>
</template>

<script>
  import $ from 'jquery';
  import navbar from '../components/homeNavBar.vue';
  import AlertMessage from '../components/Alert';

  export default {
    name: 'home',
    components: {
      navbar,
      AlertMessage,
    },
    data() {
      return {
        meg: '',
      }
    },

  }
</script>
<style lang="scss" scoped>
  @import "../assets/home.scss";

  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
  }


  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  .circle-radius {
    border-radius: 50%;
    background: rgb(33, 117, 173);
    margin: auto;
    height: 80px;
    width: 80px;
    line-height: 80px;
    transition: all 0.6s;
  }

  .rotate:hover .circle-radius {
    transform: rotate(360deg);
    color: rgb(33, 117, 173);
    background: rgb(255, 255, 255);
  }

  footer {
    color: white;
    background: rgb(22, 84, 126);
    height: 150px;
    position: relative;
  }

  div.row {
    margin: 0px;
  }

  .bg-gray {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #343a40;
    z-index: -1100;

  }

  .ali_mid {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>