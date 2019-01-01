<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        class="navbar-brand col-sm-3 col-md-2 mr-0"
        href="#"
      ><i class="fas fa-copyright"></i> Monkey Banana</a>
      <!-- <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      > -->
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a
            class="nav-link btn btn-sm btn-outline-secondary px-2"
            href="#"
            @click.prevent="signout"
          >Sign out</a>
        </li>
      </ul>
    </nav>
    </div>
</template>

<script>
export default {
  name:'NavBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    signout(){
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then(res => {
        if(res.data.success){
          this.$router.push('/login');
        };
      });
    },
    check(){
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      this.$http.post(api).then(res => {
        console.log(res.data);
        
      });
    },
  }
}
</script>