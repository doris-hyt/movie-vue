<script>
import rendermovies from '../components/movieList.vue'
import { useCounterStore } from "../stores/counter.js";
import { ref ,onMounted} from 'vue';
export default {
  components:{
    rendermovies
  },
  data(){
    return{
      movies_per_page:12,
      movies_one_page:1,
    }
  },
  methods:{
    showMovieModal(id) {
      // const id = event.target.dataset.id// 使用 currentTarget 獲取 data-id 的值
      console.log('Clicked ID:', id);
      this.movies_one_page=Number(id)
      ;
      console.log(this.movies_one_page)
}
},
  computed: {
    number() {
       return Math.ceil((this.AllMovies.length / this.movies_per_page))
   }
   },
  setup() {
    const store = useCounterStore();
    const AllMovies = ref([]); // 使用 ref ;
    const AllMoviesImgDetails=ref([]);
    const base_url = "https://webdev.alphacamp.io/";
    const index_url = base_url + "api/movies/";
    const poster_url = base_url + "posters/";
    // 可選: 在組件掛載時自動加載數據
    onMounted(async () => {
      await store.fetchData(); // 確保這是一個異步操作
      AllMovies.value = store.Movielist; // 從 store 中獲取資料
      console.log(AllMovies.value); 
      // AllMovies.value.forEach(movie => {
      //   movie.image = poster_url+ movie.image; // 根據需要修改 image 屬性
      // });
      console.log(AllMovies.value);
    })
    
    return {AllMovies,index_url, poster_url, base_url, AllMoviesImgDetails}
  } 
}


</script>
<template>
  <div class="container mt-5">
  <div class="row">
    <!-- Search Bar -->
    <!-- <form class="row row-cols-lg-auto g-3 align-items-center mb-2" id="search-form">
      <div class="col-12">
        <label class="visually-hidden" for="search-input">Search Keyword</label>
        <input type="text" class="form-control" id="search-input" placeholder="Keyword...">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary" id="search-submit-button">Search</button>
      </div>
    </form> -->
  </div>
  <div class="row" id="data-panel">
    <!-- Render Movie List-->
    <rendermovies :page="movies_one_page"/>
     
  </div>
</div>
<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center" id="paginator">
   <li  class="page-item mt-2 page-link" v-for="i in number" :key="i" @click="showMovieModal(i)"
      :data-id="i">{{i}}</li>
  </ul>
  
</nav>
</template>
