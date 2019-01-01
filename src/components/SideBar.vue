<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">


        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/products">
              <span data-feather="file-text"></span>
              <i class="fas fa-boxes"></i> 產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/orderList">
              <span data-feather="file-text"></span>
              <i class="far fa-list-alt"></i> 訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/coupon">
              <span data-feather="file-text"></span>
              <i class="fas fa-scroll"></i> 優惠卷
            </router-link>
          </li>
        </ul>
        <hr>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/customerOrders">
              <span data-feather="file-text"></span>
              <i class="fas fa-shopping-cart"></i> 模擬前台訂單
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

  </div>
</template>

<style scoped>
  .nav-link {
    font-size: 18px;
  }
  h6{
    font-size: 16px;
  }
</style>