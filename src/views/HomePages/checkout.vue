<template>
  <div id="bg-gray">
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4 text-center ">
          <span class="h4 my_title">1.填寫訂單資料</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 no_title">2.金流付款</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 no_title">3.訂單已成立！</span>
        </div>
      </div>


      <div class="row mt-5">

        <!-- 購物車列表 -->
        <div class="col-md-6">
          <table class="table my_list">
            <thead class="bg-secondary text-white">
              <th>品名</th>
              <th>數量</th>
              <th class="text-right">單價</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart.carts" :key="index">
                <td class="align-middle">
                  {{item.product.title}}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td class="align-middle"> {{item.qty}} / {{item.product.unit}} </td>
                <td class="align-middle text-right"> {{item.final_total | NumCeiling |currency}} </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right"> {{cart.total | NumCeiling |currency}} </td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="2" class="text-right text-success">折扣價</td>
                <td class="text-right text-success"> {{cart.final_total | NumCeiling |currency}} </td>
              </tr>
            </tfoot>
          </table>

        </div>

        <!-- 建立訂單 -->
        <form class="col-md-6 my_box" @submit.prevent="createOrder">
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
          // vm.$bus.$emit('messsagePush', res.data.message, 'success');
          vm.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success'
          });
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
  #bg-gray {
    background: rgb(243, 243, 243);
  }

  .my_box {
    background: #36679b;
    padding: 20px 20px;
    border-radius: 3px;
    color: white;
  }

  .my_list {
    background: rgb(230, 230, 230);
  }

  .my_title {
    color: white;
    background: #1aac98;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 10px 30px;
  }

  .no_title {
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 10px 30px;
  }
</style>