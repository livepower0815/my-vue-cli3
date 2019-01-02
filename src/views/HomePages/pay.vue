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
      <div class="my-5 row justify-content-center">
        <form class="col-md-6">
          <table class="table">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total | currency }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-info" @click="checkout">確認付款去</button>
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
        isLoading: false,
        fullPage: true,
        orderId: '',
        order: {
          user: {},
        },
      }
    },
    methods: {
      getOrder() {
        const vm = this;
        vm.isLoading = true;
        const url = `${process.env.VUE_APP_APIPATH}/api/livepower0815/order/${vm.orderId}`;
        this.$http.get(url).then(res => {
          vm.order = res.data.order;
          vm.isLoading = false;
        });
      },
      checkout() {
        const vm = this;
        const url = `${process.env.VUE_APP_APIPATH}/api/livepower0815/pay/${vm.orderId}`;
        this.$http.post(url).then(res => {
          this.getOrder();
        });
      },
    },
    created() {
      this.orderId = this.$route.params.orderId;
      this.getOrder();
    },
  }
</script>

<style lang="scss" scoped>

</style>