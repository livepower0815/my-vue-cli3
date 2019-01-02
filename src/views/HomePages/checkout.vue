<template>
  <div class="bg-white">
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12 text-center">
          購物車結帳頁面
        </div>
        <div class="col-md-4 text-center">
          1.填寫訂單資料
        </div>
        <div class="col-md-4 text-center">
          2.金流付款
        </div>
        <div class="col-md-4 text-center">
          3.訂單已成立！
        </div>


      </div>
      <!-- 購物車列表 -->
      <div class="row d-flex justify-content-center my-5">
        <div class="col-md-6">
          <table class="table">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart.carts" :key="index">
                <td class="align-middle">
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCart(item.id)">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{item.product.title}}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td class="align-middle"> {{item.qty}} / {{item.product.unit}} </td>
                <td class="align-middle text-right"> {{item.final_total | NumCeiling}} </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right"> {{cart.total}} </td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success"> {{cart.final_total}} </td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 建立訂單 -->
      <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="createOrder">
          <div class="form-group">
            <label for="useremail">Email</label>
            <input type="email" class="form-control" name="email" id="useremail" :class="{'is-invalid':errors.has('email')}"
              v-validate="'required|email'" v-model="form.user.email" placeholder="請輸入 Email">
            <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username" :class="{'is-invalid':errors.has('name')}"
              v-validate="'required'" v-model="form.user.name" placeholder="輸入姓名">
            <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" name="tel" :class="{'is-invalid':errors.has('tel')}"
              v-validate="'required'" v-model="form.user.tel" placeholder="請輸入電話">
            <span class="text-danger" v-if="errors.has('tel')">請輸入聯絡電話</span>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input type="address" class="form-control" name="address" id="useraddress" :class="{'is-invalid':errors.has('address')}"
              v-validate="'required'" v-model="form.user.address" placeholder="請輸入地址">
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
          </div>

          <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-info">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        isLoading: false,
        fullPage: true,
        coupon_code: '',
      };
    },
    methods: {
      removeCart(id) {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/cart/${id}`;
        const vm = this;
        vm.isLoading = true;
        this.$http.delete(api).then((res) => {
          this.getCart();
          vm.$bus.$emit('messsagePush', res.data.message, 'success');
          vm.isLoading = false;
        });
      },
      getCart() {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/cart`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then((res) => {
          vm.cart = res.data.data;
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
          vm.$bus.$emit('messsagePush', res.data.message, 'success');
          vm.isLoading = false;
          this.getCart();
        });
      },
      createOrder() {
        const vm = this;
        const url = `${process.env.VUE_APP_APIPATH}/api/livepower0815/order`;
        const order = vm.form;
        vm.isLoading = true;
        this.$validator.validate().then((res) => {
          if (res) {
            this.$http.post(url, {
              data: order
            }).then((res) => {
              vm.isLoading = false;
              this.$router.push(`/pay/${res.data.orderId}`);
            });
          } else {
            vm.isLoading = false;
          }
        });

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

</style>