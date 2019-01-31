<template>
  <div id="bg-gray">
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4 text-center ">
          <span class="h4 no_title">1.填寫訂單資料</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 my_title" v-if="!order.is_paid">2.金流付款</span>
          <span class="h4 no_title" v-else>2.金流付款</span>
        </div>
        <div class="col-md-4 text-center ">
          <span class="h4 no_title" v-if="!order.is_paid">3.訂單已成立！</span>
          <span class="h4 ok_title" v-else>3.訂單已成立！</span>
        </div>
      </div>
      <div class="my-5 row justify-content-center">
        <div class="col-md-6">
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
          <form id="SpgatewaySubmit" class="d-none" name="Spgateway" method="post" action="https://ccore.spgateway.com/MPG/mpg_gateway">
            MerchantID,商店代號：<input type='text' name='MerchantID' value='MS15725412'><br>
            RespondType,回傳格式：<input type='text' name='RespondType' value='JSON'><br>
            CheckValue,檢查碼：<input type='text' name='CheckValue' :value='checkV'><br>
            TimeStamp,時間戳記：<input type='text' name='TimeStamp' :value='order.create_at'><br>
            Version,串接程式版本：<input type='text' name='Version' value='1.2'><br>
            MerchantOrderNo,商店訂單編號：<input type='text' name='MerchantOrderNo' :value='order.create_at'><br>
            Amt,訂單金額：<input type='text' name='Amt' :value='Amt'><br>
            ItemDesc,商品資訊：<input type='text' name='ItemDesc' value='猴寶商品'><br>
            Email,付款人電子信箱：<input type='text' name='Email' :value='order.user.email'><br>
            LoginType,智付通會員：<input type='text' name='LoginType' value='0'><br>
            <input type='submit' value='Submit'>
          </form>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-info" @click="checkout">確認付款去</button>
          </div>
          <div class="text-center" v-else>
            <button class="btn btn-primary" @click="goHome">回到首頁</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import sha256 from "sha256";

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
          const submitform = document.querySelector('#SpgatewaySubmit');
          submitform.submit();
        });
      },
      goHome() {
        this.$router.push('/');
      }
    },
    computed: {
      checkV() {
        const vm = this;
        const HashKey = 'HashKey=sTXAYhycqzjvzl16obqbbbJvFbwStvJx';
        const HashIV = "HashIV=RsmWDpQwqKy32AQq";
        const Amt = Math.floor(vm.order.total);
        const CheckValue =
          `${HashKey}&Amt=${Amt}&MerchantID=MS15725412&MerchantOrderNo=${vm.order.create_at}&TimeStamp=${vm.order.create_at}&Version=1.2&${HashIV}`;
        return sha256(CheckValue).toUpperCase();
      },
      Amt() {
        const vm = this;
        return Math.floor(vm.order.total);
      },


    },
    created() {
      this.orderId = this.$route.params.orderId;
      this.getOrder();

    },
  }
</script>

<style lang="scss" scoped>
  #bg-gray {
    background: rgb(243, 243, 243);
  }

  .my_title {
    color: white;
    background: #36679b;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 10px 30px;
  }

  .ok_title {
    color: white;
    background: #1fa34b;
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