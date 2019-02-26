<template>
  <div id="bg-gray">
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-8 text-primary">
          <h3 class="text-center black-50 bg-primary text-light">購物車內容</h3>
          <div class="list-item row" v-for="(item, index) in cart.carts" :key="index">
            <div class="col-md-6 d-flex align-items-center">
              <div class="img-item" :style="`background-image: url(${item.product.imageUrl});`"></div>
              <div class="d-inline-block">
                <p class="h5">{{item.product.title}}</p>
                {{item.qty}}個 ${{item.product.price | NumCeiling}}
              </div>
            </div>

            <div class="col-md-6 d-flex align-items-center">
              <div class="ml-auto">
                <div class="d-inline-block h4">
                  NT {{item.final_total | NumCeiling |currency}}
                </div>
                <button type="button" class="btn btn-outline-danger btn-sm ml-5" @click="removeCart(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
        <div class="col-md-4">
          <div class="bg-primary text-white px-4 bdr">
            <h3 class="myTitle">價格摘要</h3>
            <div class="d-flex justify-content-between my-3">
              <span>小計</span>
              <span>NT {{cart.total | currency}}</span>
            </div>
            <div class="d-flex justify-content-between my-4">
              <span>折扣</span>
              <span v-if="cart.total == cart.final_total">請在下面輸入優惠碼</span>
              <span v-else>NT {{cart.total - cart.final_total | NumCeiling |currency}}</span>
            </div>
            <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
              <div class="input-group-append">
                <button class="btn btn-outline-light" type="button" @click="addCouponCode">
                  套用優惠碼
                </button>
              </div>
            </div>
            <div class="d-flex justify-content-between my-4">
              <span class="h4">總計</span>
              <span class="h4">NT {{cart.final_total | NumCeiling |currency}}</span>
            </div>
            <div class="text-right pb-4">
              <button type="button" class="btn btn-info" @click="goCheckout">結帳去</button>
            </div>
          </div>
          <div class="alert alert-info" role="alert">
            可輸入優惠碼<br>
            1.super<br>
            2.okokcode<br>
            3.okCode
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cart: {},
        isLoading: false,
        fullPage: true,
        coupon_code: '',
      };
    },
    methods: {
      getCart() {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/cart`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then((res) => {
          vm.cart = res.data.data;
          vm.isLoading = false;
        });
      },
      removeCart(id) {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/cart/${id}`;
        const vm = this;
        vm.isLoading = true;
        this.$http.delete(api).then((res) => {
          this.getCart();
          // vm.$bus.$emit('messsagePush', res.data.message, 'success');
          vm.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success'
          });
          vm.isLoading = false;
        });
      },
      addCouponCode() {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/coupon`;
        const vm = this;
        vm.isLoading = true;
        let couponCode = {
          data: {
            code: vm.coupon_code
          }
        };
        this.$http.post(api, couponCode).then((res) => {
          // vm.$bus.$emit('messsagePush', res.data.message, 'success');
          console.log(res.data.success);
          if (res.data.success == true) {
            vm.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            });
          } else if (res.data.success == false) {
            vm.$notify({
              title: '失敗',
              message: res.data.message,
              type: 'error'
            });
          }

          vm.isLoading = false;
          this.getCart();
        });
      },
      goCheckout() {
        this.$router.push('/checkout')
      },
    },
    filters: {
      NumCeiling(num) {
        return Math.ceil(num);
      },
    },
    created() {
      this.getCart();
    },
  }
</script>

<style lang="scss" scoped>
  #bg-gray {
    background: rgb(234, 234, 234);
  }

  .black-50 {
    height: 60px;
    border-radius: 3px;
    line-height: 60px;
  }

  .list-item {
    border-bottom: 2px solid rgb(218, 212, 212);
    padding: 15px 10px;
  }

  .img-item {
    height: 110px;
    width: 110px;
    display: inline-block;
    background-position: center center;
    background-size: cover;
    margin-right: 40px;
  }

  .myTitle {
    text-align: center;
    padding: 13px 0;
    border-bottom: 2px solid rgb(255, 255, 255);
  }

  .bdr {
    border-radius: 3px;
  }
</style>