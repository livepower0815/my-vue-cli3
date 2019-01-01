<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled':!propPage.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(propPage.current_page -1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="(page, index) in propPage.total_pages" :class="{'active':propPage.current_page === page}"
          :key="index">
          <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled':!propPage.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(propPage.current_page +1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props:['propPage'],
  methods:{
    getProducts(page){
      this.$emit('changePage',page);
    }
  }
}
</script>