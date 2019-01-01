<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="text-right">
      <button class="btn btn-primary mt-4" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table mt-4 table-hover">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-right">原價</th>
          <th width="120" class="text-right">售價</th>
          <th width="100" class="text-right">是否啟用</th>
          <th width="130" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td class="text-right">
            <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    


    <!-- 下面是分頁component -->

    <pagen @changePage="getProducts" :propPage="pagination"></pagen>

    <!-- 下面是新增修改的modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew == true">新增產品</span>
              <span v-if="isNew == false">編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-white" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" @change="uploadFile" ref="files">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category" v-model="tempProduct.category" placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price" v-model="tempProduct.price" placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description" v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
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
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updatePorduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 下面是刪除的modal -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import $ from 'jquery';
  import pagen from '../../components/pagination';
  export default {
    components:{
      pagen,
    },
    data() {
      return {
        products: [],
        pagination: {},
        tempProduct: {},
        isNew: false,
        isLoading: false,
        fullPage: true,
        status: {
          fileUploading: false,
        },
      };
    },
    methods: {
      getProducts(page = 1) {
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/products?page=${page}`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then(res => {
          vm.products = res.data.products;
          vm.isLoading = false;
          vm.pagination = res.data.pagination;
        });
      },
      openModal(isNew, item) {
        if (isNew) {
          this.tempProduct = {};
          this.isNew = true;
        } else {
          this.tempProduct = Object.assign({}, item);
          this.isNew = false;
        }
        $('#productModal').modal('show');
      },
      updatePorduct() {
        let api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/product`;
        const vm = this;
        let httpMethod = 'post'
        if (!vm.isNew) {
          api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/product/${vm.tempProduct.id}`;
          httpMethod = 'put';
        }
        this.$http[httpMethod](api, {
          data: vm.tempProduct
        }).then(res => {
          if (res.data.success) {
            $('#productModal').modal('hide');
            vm.getProducts();
          } else {
            $('#productModal').modal('hide');
            console.log('新增失敗');
          }
        });
      },
      deleteModal(item) {
        this.tempProduct = Object.assign({}, item);
        $('#delProductModal').modal('show');
      },
      confirmDelete() {
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/product/${vm.tempProduct.id}`;
        this.$http.delete(api).then(res => {
          $('#delProductModal').modal('hide');
          vm.getProducts();
        });
      },
      uploadFile() {
        const uploadedFile = this.$refs.files.files[0];
        const vm = this;
        vm.status.fileUploading = true;
        const formData = new FormData();
        formData.append('file-to-upload', uploadedFile);
        const url = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/upload`;
        this.$http.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl);
            vm.status.fileUploading = false;
          } else {
            vm.$bus.$emit('messsagePush', res.data.message, 'danger');
            vm.status.fileUploading = false;
          }
        });
      },
    },
    created() {
      this.getProducts();
    }
  };

</script>
