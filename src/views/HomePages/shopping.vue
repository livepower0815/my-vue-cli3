<template>
  <div class="text-white">
    <carousel />
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <shoppingCart />
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-3">
          <ol class="breadcrumb" style="background:none;">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-white">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/shopping" class="text-white">購物專區</router-link>
            </li>
          </ol>
        </div>
        <div class="col-md-6 text-center">
          <div class="pro-title">購物專區</div>
        </div>
        <div class="col-md-3">
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="filterData" placeholder="請輸入商品名稱" aria-label="Recipient's username"
              aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-light" type="button" id="button-addon2" @click="filterTitle"><i class="fas fa-search"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-sm-5">
      <div class="col-md-2">
        <div class="text-center side-list" @click="filterPro('')">全部商品</div>
        <div class="text-center side-list" @click="filterPro('溫馨')">溫馨</div>
        <div class="text-center side-list" @click="filterPro('可愛')">可愛</div>
        <div class="text-center side-list" @click="filterPro('親子')">親子</div>
        <div class="text-center side-list" @click="filterPro('俏皮')">俏皮</div>
      </div>
      <div class="col-md-10 text-dark">
        <div class="row my-4">
          <div class="col-md-4 mb-4" v-for="(item, index) in filterProducts" :key="index">
            <div class="card border-0 shadow-sm mycard">
              <div class="imgContainer">
                <div class="point my-img" @click="goDetail(item.id)" :style="{backgroundImage:`url(${item.imageUrl})`}">
                </div>
              </div>
              <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                <h5 class="card-title">
                  <h5 class="text-dark">{{ item.title }}</h5>
                </h5>
                <p class="card-text">{{ item.content }}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                  <!-- <div class="h5">2,800 元</div> -->
                  <del class="h6">原價 {{ item.origin_price }} 元</del>
                  <div class="h5">特惠 <span class="text-danger">{{ item.price }}</span> 元</div>
                </div>
              </div>
              <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="goDetail(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-info btn-sm ml-auto" @click="addtoCart(item)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import carousel from '../../components/carousel.vue';
  import shoppingCart from '../../components/shoppingCart.vue';
  export default {
    components: {
      carousel,
      shoppingCart,
    },
    data() {
      return {
        products: [],
        filterData: '',
        filterProducts: [],
        pagination: {},
        tempProduct: {},
        cart: {},
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
          },
          message: '',
        },
        isNew: false,
        isLoading: false,
        fullPage: true,
        status: {
          loadingItem: '',
        },
        optionNum: '',
        coupon_code: '',
      };
    },
    methods: {
      getProducts() {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/products/all`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(res => {
          vm.products = res.data.products;
          vm.filterProducts = res.data.products;
          vm.isLoading = false;
        });
      },
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
          // vm.$bus.$emit('messsagePush', masg, 'success');
          vm.$notify({
            title: '成功',
            message: masg,
            type: 'success'
          });
          vm.$bus.$emit('updateCart');
          vm.isLoading = false;
        });
      },
      filterPro(name) {
        const vm = this;
        let newArray = [];
        if (name == '') {
          vm.filterProducts = vm.products;
        } else {
          newArray = vm.products.filter(function (product) {
            return product.category == name;
          });
          vm.filterProducts = newArray;
        }
      },
      filterTitle() {
        const vm = this;
        vm.filterProducts = vm.products.filter(function (product) {

          return product.title.indexOf(vm.filterData) > -1;
        });
        vm.filterData = '';
      },
      goDetail(id) {
        this.$router.push(`/detail/${id}`);
      }
    },
    filters: {
      NumCeiling(num) {
        return Math.ceil(num);
      },
    },
    created() {
      this.getProducts();
    },
  }
</script>

<style lang="scss" scoped>
  .pro-title {

    display: inline-block;
    font-size: 30px;
  }

  .side-list {
    background: #4380c0;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    /* width: 100px; */
    transition: all 0.4s;
    margin: 20px 0;
    border-radius: 20px;
  }

  .side-list:hover {
    cursor: pointer;
    background: #2ba595;
  }

  .point {
    cursor: pointer;
  }

  .my-img {
    background-size: cover;
    background-position: center center;
    height: 200px;
    transition: all 0.8s;
  }

  .my-img:hover {
    height: 200px;
    transform: scale(1.2)
  }
  .imgContainer{
    height: 200px;
    overflow: hidden;
  }

</style>