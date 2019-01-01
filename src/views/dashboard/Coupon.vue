<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click="openModal">建立新Coupon</button>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <table class="table mt-4 table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th>優惠卷名稱</th>
              <th>折扣率</th>
              <th>截止日</th>
              <th>優惠卷代碼</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in coupons" :key="index">
              <td>{{ item.title }}</td>
              <td>{{ item.percent / 10 }} 折</td>
              <td>{{ item.due_date | dateFormat }}</td>
              <td>{{ item.code }}</td>
              <td>
                <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <button class="btn btn-outline-danger btn-sm" @click="deleteCoupon(item.id)">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- add_Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">優惠卷名稱</label>
              <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">折扣率</label>
                <input type="text" class="form-control" id="category" v-model="tempProduct.percent" placeholder="請輸入分類">
              </div>
              <div class="form-group col-md-6">
                <label for="price">優惠卷代碼</label>
                <input type="unit" class="form-control" id="unit" v-model="tempProduct.code" placeholder="請輸入單位">
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1"
                  :false-value="0" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-info" @click="add_edit">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';

  export default {
    data() {
      return {
        coupons: [],
        isLoading: false,
        fullPage: true,
        tempProduct: {},
      };
    },
    methods: {
      getCoupons(page = 1) {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/coupons?page=${page}`;
        vm.isLoading = true;
        this.$http.get(api).then((res) => {

          vm.coupons = res.data.coupons;
          vm.isLoading = false;
        });
      },
      add_edit() {
        let api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/coupon`;
        const vm = this;
        let httpMethod = 'post'
        vm.tempProduct.due_date = Math.floor(Date.now() / 1000) + 10000000;
        this.$http[httpMethod](api, {
          data: vm.tempProduct
        }).then(res => {
          if (res.data.success) {
            $('#couponModal').modal('hide');
            vm.getCoupons();
          } else {
            $('#couponModal').modal('hide');
            console.log('新增失敗');
          }
        });
      },
      openModal() {
        $('#couponModal').modal('show');
      },
      deleteCoupon(id) {
        const vm = this;
        vm.isLoading = true;
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/coupon/${id}`;
        this.$http.delete(api).then((res) => {
          vm.isLoading = false;
          this.getCoupons();
        });
      },
    },
    created() {
      this.getCoupons();
    },
  }

</script>
