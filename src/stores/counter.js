import { defineStore } from 'pinia';
import {ref, computed} from 'vue';
// import * as Vue from 'vue' ;
import axios from 'axios';
// import VueAxios from 'vue-axios';
// const app = Vue.createApp(...);
// app.use(VueAxios, axios)
export const useCounterStore = defineStore('counter', () => {
  const count = ref(3);
  const base_url = "https://webdev.alphacamp.io/";
  const index_url = base_url + "api/movies/";
  const poster_url = base_url + "posters/";  
  const Movielist=ref([]);
  const DetailMovielist = ref([]);
  const isLoading=ref(false);
  const movies_per_page = 12;
  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++
  }
  const addCount=()=>{
    count.value++
  };
  const fetchData=async()=>{
    if (isLoading.value) return // 如果正在載入或已經有資料，則不發送請求
    isLoading.value = true;
    console.log(isLoading.value)
    try{
      const res = await axios.get(index_url);
      Movielist.value.push(...res.data.results);
      console.log(Movielist.value);
      console.log(Movielist.value.length)}
    catch(error){
      console.log(error)
    }
  finally {
    // 無論成功還是錯誤，都設置 isLoading 為 false
    isLoading.value = false;
    console.log("Loading finished:", isLoading.value);  // 確認加載結束
  }
    console.log(number.value)
  };
  

  const ShowMovieDetail = async () => {
    for (let i = 0; i < Movielist.value.length; i++) {
      try {
        const movieId = Movielist.value[i].id; // 確保有正確的 id
        const response = await axios.get(`${index_url}${movieId}`);
        // console.log(response.data.results)
        DetailMovielist.value.push(response.data.results);
        
        // console.log(`Response from ${index_url}${movieId}:`, response.data);
      } catch (error) {
        console.error(`Error fetching ${index_url}:`, error);
      }
    };
    console.log(DetailMovielist.value)
  };
  const enhancedShowMovieDetail = computed(() => {
    return DetailMovielist.value.map(movie => ({
      ...movie,
      image: poster_url + movie.image, // 根據需要新增或修改屬性
    }));
  });
  const number = computed(() => {
    return Math.ceil((Movielist.value.length / movies_per_page))
  });
  

  return { count, doubleCount, increment, addCount, fetchData, Movielist, index_url, poster_url, base_url, ShowMovieDetail, DetailMovielist, enhancedShowMovieDetail, isLoading, number }
})

// export const useCounterStore = defineStore('counter', {
//   state: () => ({ count: 0, name: 'Eduardo' }),
//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })