<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item bg-cover active" style="background-image: url('https://images.unsplash.com/photo-1516719907742-5a390230ce74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')">
          <div class="carousel-caption d-none d-md-block bg-gray">
            <h4>感動的瞬間讓愛散發出去</h4>
            <p>讓我們一起為寶貝留下最深刻美好的回憶</p>
          </div>
        </div>
        <div class="carousel-item bg-cover" style="background-image: url('https://images.unsplash.com/photo-1504151932400-72d4384f04b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80')">
          <div class="carousel-caption d-none d-md-block bg-gray">
            <h4>現在就購買體驗方案</h4>
            <p>一段溫馨的故事即將展開，歡迎大家一起來</p>
          </div>
        </div>
        <div class="carousel-item bg-cover" style="background-image: url('https://images.unsplash.com/photo-1527599296290-e847cebb1d00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80')">
          <div class="carousel-caption d-none d-md-block bg-gray">
            <h4>豪華組合年終超佛心下殺</h4>
            <p>不要陽春一次滿足您的全部需求，最優惠方案全部到齊</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";

  export default {
    mounted() {
      $('#carouselExampleIndicators').carousel({
        interval: 5000
      });
    },
  };
</script>

<style lang="scss" scoped>
  .bg-cover {
    background-position: center center;
    background-size: cover;
    height: 500px;
  }

  .bg-gray {
    background: rgba(53, 111, 177, 0.363);
    border-radius: 15px;
    margin: 0px 120px;
  }

  div.carousel-item .carousel-caption {
    opacity: 0;
    transition: all 0.8s;
  }

  div.carousel-item.active .carousel-caption {
    opacity: 1;
    transform: translate(0px, -100px);
  }
</style>