<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">
          <i class="fas fa-copyright"></i> MonkeyShot 猴寶拍拍
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/shopping">
                商品選購
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/order">
                追蹤訂單資訊
              </router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <router-link class="btn btn-outline-info my-2 my-sm-0" to="/login">
              後台管理
            </router-link>
          </form>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
  export default {

  }
</script>