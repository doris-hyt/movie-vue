<script >
import { useCounterStore } from "../stores/counter.js";
import { onMounted, ref, computed} from 'vue';
import ModalItem from './ModalComponent.vue'
export default {
  data(){
    return{
      number:0,
      movies_per_page:12
    }
  },
  props:{    
    page: {
      type: Number,
      required: true,
    }
  },
  components:{
     ModalItem
  },
  computed: {
    // 使用計算屬性來從 AllMoviesDetails 獲取數據
    firstindex(){
      return (this.page - 1) * this.movies_per_page      
    },
    lastindex(){
      return this.firstindex +12
    },
    selectedMovie() {
      return this.AllMoviesImgDetails.length > 0 ? this.AllMoviesImgDetails[this.number] : null;
    },
    NEData() {
      return this.selectedMovie ? this.selectedMovie.release_date : ""; // 計算屬性
    },
    NEDescription() {
      return this.selectedMovie ? this.selectedMovie.description : "";
    },
    NETitle() {
      return this.selectedMovie ? this.selectedMovie.title : "";
    },
    NEImg() {
      return this.selectedMovie ? this.selectedMovie.image : "";
    },
    FilterMovie() {
      return this.enhancedMovies.slice(this.firstindex,this.lastindex)
    },
  },
  methods:{
    showMovieModal(event) {
      console.log(this.enhancedMovies);
      console.log(this.NEData);
      const id = event.target.dataset.id// 使用 currentTarget 獲取 data-id 的值
      this.number=Number(id)-1
      console.log(`Clicked button with ID: ${id}`);
      console.log(this.number)
  // axios
  //   .get(index_url + id)
  //   .then((response) => {
  //     const data = response.data.results
  //     console.log(data)
  //     moviemodaltitle.innerText = data.title
  //     moviemodaldate.innerText = 'Release date:' + data.release_date
  //     moviemodaldescription.innerText = data.description
  //     moviemodalimage.innerHTML = `<img
  //           src="${poster_url + data.image}" alt="Movie Poster" class="img-fluid">`
  //   })
   }
    
  },
  setup() {
    const store = useCounterStore();
    const AllMovies = ref([]); // 使用 ref ;
    const AllMoviesDetails=ref([]);
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
      console.log(enhancedMovies.value);

      await store.ShowMovieDetail(); // 確保這是一個異步操作
      AllMoviesDetails.value = store.DetailMovielist; // 從 store 中獲取資料
      console.log(AllMoviesDetails.value); 
      AllMoviesImgDetails.value=store.enhancedShowMovieDetail;
      console.log(AllMoviesImgDetails.value);
    });
    const enhancedMovies = computed(() => {
      return AllMovies.value.map(movie => ({
      ...movie,
      image: poster_url + movie.image, // 根據需要新增或修改屬性
     }));
  });
    
    return {AllMovies, AllMoviesDetails ,index_url, poster_url, base_url,enhancedMovies, AllMoviesImgDetails}
  },
  
}



</script>
<template>
   <div class="col-sm-3" v-for="(item) in FilterMovie" :key="item"> 
      <div class="mb-2">
        <div class="card">
          <img
            :src="item.image" class="card-img-top" alt="Movie Poster" >
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-show-movie me-2" data-bs-toggle="modal" data-bs-target="#movie-modal" :data-id="item.id" @click="showMovieModal">More</button> 
            <!-- <button class="btn btn-info btn-add-favorite" :data-id="item.id">+</button> -->
          </div>
        </div>
      </div>
    </div>
    <ModalItem :NEData="NEData" :NEDescription="NEDescription" :NETitle="NETitle" :NEImg="NEImg"/>

</template>

