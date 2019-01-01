<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <table class="table mt-4 table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th width="120">購買日期</th>
              <th width="280">Email</th>
              <th>購買款項</th>
              <th width="120">應付金額</th>
              <th width="120">是否付款</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orders" :key="index" @dblclick="checkout(item.id)">
              <td> {{item.create_at | dateFormat}} </td>
              <td> {{item.user.email}} </td>
              <td>
                <ul>
                  <li v-for="(i, ind) in item.products" :key="ind">
                    {{i.product.title}} 數量 ：
                    {{i.qty}} {{i.product.unit}}
                  </li>
                </ul>
              </td>
              <td> {{item.total | currency}} </td>
              <td>
                <span v-if="item.is_paid == 1" class="text-success">已付款</span>
                <span v-else>尚未付款</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <pagen @changePage="getOrderList" :propPage="pagination"></pagen>

  </div>
</template>

<script>
  import pagen from '../../components/pagination';

export default {
  components:{
    pagen,
  },
  data(){
    return {
      isLoading: false,
      fullPage: true,
      orders:[],
      pagination:{},
    }
  },
  methods:{
    getOrderList(page = 1){
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/livepower0815/admin/orders?page=${page}`;
      this.$http.get(api).then(res=>{
        vm.orders = res.data.orders;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    checkout(id){
      this.$router.push(`/dashboard/orderCheckout/${id}`);
    }
  },
  created(){
    this.getOrderList();
  },
}
</script>