<template>
  <div class="text-white">
    <img class="bg-img w-100 d-none d-md-block" src="https://images.unsplash.com/photo-1542834759-197152b49c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
      alt="">
    <carousel />
    <div class="gray-bg">
      <div class="container pt-5">
        <div class="text-center mb-5">
          <h3 class="my-4">婚紗,婚紗攝影,寶貝拍攝</h3>
          <p>猴寶自助婚紗提供「婚紗」、「婚紗攝影」、「拍婚紗」服務，是您想不到的全新婚紗攝影服務，</p>
          <p>拍婚紗不再擔心加價，全新婚紗禮服任您挑選，無隱形消費，站在您的角度，客製規劃您的方案，</p>
          <p>打造一個禮服數量超過婚紗店規模，但收費親民，高CP值的自助婚紗工作室。</p>
        </div>
        <hr class="featurette-divider">
      </div>
    </div>
    <div class="container">

      <div class="marketing">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-4 rotate">
                <h1><i class="fas fa-camera-retro circle-radius"></i></h1>
                <h3 class="my-4">寶貝baby專業攝影</h3>
                <p>婚紗照全數風格調色，婚紗照全贈
                  完全不必忍痛刪照片，不用擔心多挑照片多加價
                  拍攝風格特色由您決定，拍出獨一無二的個人化婚紗照</p>
                <div class="alert alert-info" role="alert">
                  <p>轉職大成功優惠 全館75折</p>
                  <p>優惠代碼: <span class="badge badge-danger big">okokcode</span></p>
                </div>
              </div><!-- /.col-lg-4 -->
              <div class="col-lg-4  rotate">
                <h1 class=""><i class="fas fa-dollar-sign circle-radius"></i></h1>
                <h3 class="my-4">豪華方案一次擁有</h3>
                <p>婚紗攝影包套方案包含手工白紗及晚禮服，
                  完全不用加價挑選，不必擔心隱形消費
                  近1000件婚紗晚禮服可隨意挑選，想到的我們都有！</p>
                <div class="alert alert-info" role="alert"> 
                  <p>超級下殺 全館9折</p>
                  <p>優惠代碼: <span class="badge badge-danger big">super</span></p>
                </div>
              </div><!-- /.col-lg-4 -->
              <div class="col-lg-4 rotate">
                <h1 class=""><i class="fas fa-heart circle-radius"></i></h1>
                <h3 class="my-4">造型師全程跟妝 不加價</h3>
                <p>我們團隊採造型師全程跟妝，
                  每套婚紗禮服都有不同的造型喔！
                  讓你不用擔心風吹日曬下拍照會脫妝，造型師幫你隨時注意造型</p>
                <div class="alert alert-info" role="alert">
                  <p>年終加碼不過期 全館75折</p>
                  <p>優惠代碼: <span class="badge badge-danger big">okCode</span></p>
                </div>
              </div><!-- /.col-lg-4 -->
            </div><!-- /.row -->
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row">
          <div class="col-md-6">
            <img class="img-fluid rounded" src="https://images.unsplash.com/photo-1524492188898-7e0f39d0ec03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt="img">
          </div>
          <div class="col-md-6 px-5">
            <div class="text-center ">
              <h3 class="my-4">不要再錯過親子的時光</h3>
              <p class="lineH">
                沒有二次消費，不強迫消費，客製化的婚紗攝影服務，讓你真正享受到即將成為新娘／新郎的喜悅。
                伊頓自助婚紗提供婚紗攝影、禮服出租、新娘秘書、婚禮攝影、婚禮錄影、孕婦寫真，個人寫真、全家福及寶寶寫真等服務。
              </p>
              <div class="prod-btn" @click="goShopping">
                搶購去
              </div>
            </div>
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row d-flex flex-md-row-reverse">
          <div class="col-md-6">
            <img class="img-fluid rounded" src="https://images.unsplash.com/photo-1475178278683-8c225ae5ec3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt="img">
          </div>
          <div class="col-md-6 px-5">
            <div class="text-center ">
              <h3 class="my-4">紀錄孩子俏皮可愛的瞬間</h3>
              <p class="lineH">
                因為婚紗工作室採[預約制]，很高興我們能夠為您服務，為了避免您來店等待過久，歡迎來店服務前預約，
                想要對於服務的方式有進一步了解，如果你覺得我們的服務方式及服務理念符合您的需求，
                為了更加瞭解您，同時請填寫以下資料， 以下資料僅會與您聯係一次，若您對於我們的說明不感興趣，
                我們將停止聯絡您，不會造成您任何的困擾。
              </p>
              <div class="prod-btn" @click="goShopping">
                搶購去
              </div>
            </div>
          </div>
        </div>

        <hr class="featurette-divider">

        <div class="row">
          <div class="col-md-6">
            <img class="img-fluid rounded" src="https://images.unsplash.com/photo-1538078390103-a28006279daf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              alt="img">
          </div>
          <div class="col-md-6 px-5">
            <div class="text-center ">
              <h3 class="my-4">新年新希望 新春紅包大放送</h3>
              <p class="lineH">
                猴寶自助婚紗提供「婚紗」、「婚紗攝影」、「拍婚紗」服務，是您想不到的全新婚紗攝影服務，
                拍婚紗不再擔心加價，全新婚紗禮服任您挑選，無隱形消費，站在您的角度，客製規劃您的方案，
                打造一個禮服數量超過婚紗店規模，但收費親民，高CP值的自助婚紗工作室。
              </p>
              <div class="prod-btn" @click="goShopping">
                搶購去
              </div>
            </div>
          </div>
        </div>

        <hr class="featurette-divider">
      </div><!-- /.container -->
    </div>

  </div>
</template>

<script>
  import carousel from '../../components/carousel.vue';

  export default {
    components: {
      carousel,
    },
    methods: {
      goShopping() {
        this.$router.push('/shopping');
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/home.scss";

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
    line-height: 150px;
  }

  div.row {
    margin: 0px;
  }

  .lineH {
    line-height: 40px;
  }

  .prod-btn {
    width: 150px;
    height: 70px;
    line-height: 66px;
    font-size: 20px;
    border: 2px solid white;
    display: inline-block;
    border-radius: 15px;
    transition: all 0.3s;
  }

  .prod-btn:hover {
    background: rgb(248, 248, 248);
    color: rgb(15, 172, 172);
    cursor: pointer;
    font-size: 30px;
  }

  .bg-img {
    z-index: -1000;
    position: fixed;
    left: 0;
    top: -20%;
    filter: blur(3px)grayscale(50%);
  }
  .gray-bg{
    background: #36679b;
  }
  .big{
    font-size: 16px;
  }
</style>