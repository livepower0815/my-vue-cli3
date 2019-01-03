<template>
  <div>
    <shoppingCart/>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container text-white mb-5">
      <div class="row">
        <div class="col-md-8">
          <ol class="breadcrumb" style="background:none;">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-white">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/shopping" class="text-white">購物專區</router-link>
            </li>
            <li class="breadcrumb-item">
              {{ product.title }}
            </li>
          </ol>
        </div>
        <div class="col-md-4 text-center">
        </div>
      </div>

      <div class="row">
        <div class="col-md-7">
          <img :src="product.imageUrl" class="img-fluid rounded" alt="img">
        </div>
        <div class="col-md-5 bg-blue">
          <h3>{{product.title}} <div class="pro-title text-center ml-3"> {{product.category}}</div>
          </h3>
          <h5 class="my-4 mylh">{{product.content}}</h5>
          <p class="text-right text-white-50">--{{product.description}}</p>
          <div class="d-flex justify-content-between align-items-baseline mb-3">
            <!-- <div class="h5">2,800 元</div> -->
            <del class="h6">原價 {{product.origin_price}} 元</del>
            <div class="h4">現正特惠價 {{product.price}} 元</div>
          </div>
          <select class="form-control" v-model="optionNum">
            <option v-for="(i, index) in 8" :key="index" :value="i">選購{{ i }}件</option>
          </select>
          <div class="my-5 d-flex justify-content-between align-items-baseline">
              <span class="pr-3 text-white ml-4">合計 {{ optionNum * product.price }} 元</span>
              <button type="button" class="btn btn-info" @click="addtoCart(product,optionNum)">加到購物車</button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import shoppingCart from '../../components/shoppingCart.vue';
  
  export default {
    components:{
      shoppingCart,
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        product: {},
        optionNum: '1',
      }
    },
    methods: {
      addtoCart(item, qty = 1) {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/cart`;
        const vm = this;
        vm.isLoading = true;
        const cart = {
          data: {
            product_id: item.id,
            qty,
          },
        };
        this.$http.post(api, cart).then((res) => {
          let masg = item.title + res.data.message;
          vm.$bus.$emit('messsagePush', masg, 'success');
          vm.$bus.$emit('updateCart');
          vm.isLoading = false;
        });
      },
    },
    created() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/product/${vm.$route.params.productId}`;
      this.$http.get(api).then((res) => {
        vm.product = res.data.product;
        vm.isLoading = false;
      });
    }
  }
</script>

<style lang="scss" scoped>
  .pro-title {
    background: rgb(250, 196, 134);
    display: inline-block;
    font-size: 20px;
    width: 70px;
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    color: rgb(66, 80, 71);
  }
  .bg-blue{
    background: #36679b;
    border-radius: 5px;
    padding-top: 30px;
  }
  .mylh{
    line-height: 40px;
  }
</style>