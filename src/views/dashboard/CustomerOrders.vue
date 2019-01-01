<template>
  <div>
    <!-- loading effect -->
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>

    <!-- 商品列表 -->
    <div class="row my-4">
      <div class="col-md-4 mb-4" v-for="(item, index) in products" :key="index">
        <div class="card border-0 shadow-sm">
          <div style="height: 250px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 <span class="text-danger">{{ item.price }}</span> 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
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
    <pagen @changePage="getProducts" :propPage="pagination"></pagen>

    <!-- productModal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{tempProduct.title}}</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="img-fluid" :src='tempProduct.imageUrl' alt="">
            <div class="h5 my-4">
              {{tempProduct.content}}
            </div>
            <div class="d-flex justify-content-end align-items-baseline mb-4">
              {{tempProduct.description}}
            </div>
            <div class="d-flex justify-content-between align-items-baseline mb-3">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">原價 {{tempProduct.origin_price}} 元</del>
              <div class="h4">現在只要 {{tempProduct.price}} 元</div>
            </div>
            <select class="form-control" v-model="optionNum">
              <option v-for="(i, index) in 8" :key="index" :value="i">選購{{ i }}件</option>
            </select>
          </div>
          <div class="modal-footer">
            <span class="pr-3 text-secondary">合計 {{ optionNum * tempProduct.price }} 元</span>
            <button type="button" class="btn btn-info" @click="addtoCart(tempProduct,optionNum)">Add to cart</button>
          </div>
        </div>
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
          <input type="email" class="form-control" name="email" id="useremail" 
          :class="{'is-invalid':errors.has('email')}"
          v-validate="'required|email'"
          v-model="form.user.email" placeholder="請輸入 Email">
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username" 
          :class="{'is-invalid':errors.has('name')}"
          v-validate="'required'" v-model="form.user.name" placeholder="輸入姓名">
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" name="tel"
          :class="{'is-invalid':errors.has('tel')}"
          v-validate="'required'" v-model="form.user.tel" placeholder="請輸入電話">
          <span class="text-danger" v-if="errors.has('tel')">請輸入聯絡電話</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="address" class="form-control" name="address" id="useraddress" 
          :class="{'is-invalid':errors.has('address')}"
          v-validate="'required'" v-model="form.user.address"
            placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>


  </div>
</template>



<script>
  import $ from 'jquery';
  import pagen from '../../components/pagination';

  export default {
    components: {
      pagen,
    },
    data() {
      return {
        products: [],
        pagination: {},
        tempProduct: {},
        cart: {},
        form:{
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
      getProducts(page = 1) {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/products?page=${page}`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(res => {
          vm.products = res.data.products;
          vm.isLoading = false;
          vm.pagination = res.data.pagination;
        });
      },
      getProduct(id) {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/product/${id}`;
        const vm = this;
        vm.status.loadingItem = id;
        this.$http.get(api).then(res => {
          vm.tempProduct = res.data.product;
          vm.status.loadingItem = '';
          vm.optionNum = 1;
          $('#productModal').modal('show');
        });
      },
      addtoCart(item, qty = 1) {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/cart`;
        const vm = this;
        vm.status.loadingItem = item.id;
        const cart = {
          data: {
            product_id: item.id,
            qty,
          },
        };
        this.$http.post(api, cart).then((res) => {
          vm.status.loadingItem = '';
          this.getCart();
          $('#productModal').modal('hide');
          let masg = item.title + res.data.message;
          vm.$bus.$emit('messsagePush', masg, 'success');
        });
      },
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
        this.$http.get(api).then((res) => {
          vm.cart = res.data.data;
        });
      },
      addCouponCode() {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/coupon`;
        const vm = this;
        let couponCode = {
          data: {
            code: vm.coupon_code
          }
        };
        vm.isLoading = true;
        this.$http.post(api, couponCode).then((res) => {
          vm.$bus.$emit('messsagePush', res.data.message, 'success');
          vm.isLoading = false;
          this.getCart();
        });
      },
      createOrder(){
        const vm = this;
        const url = `${process.env.VUE_APP_APIPATH}/api/livepower0815/order`;
        const order = vm.form;
        vm.isLoading = true;
        this.$validator.validate().then((res)=>{
          if(res){
            this.$http.post(url,{data:order}).then((res)=>{
              vm.isLoading = false;
              this.$router.push(`/dashboard/orderCheckout/${res.data.orderId}`);
            });
          }else{
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
      this.getProducts();
      this.getCart();
    },
  }

</script>
