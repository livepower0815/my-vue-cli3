<template>
  <div>
    <navbar/>
    <AlertMessage/>
    <div class="container-fluid">
      <div class="row">
        <sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '../components/NavBar';
import sidebar from '../components/SideBar';
import AlertMessage from '../components/Alert';

export default {
    components:{
        navbar,
        sidebar,
        AlertMessage,
    },
}
</script>