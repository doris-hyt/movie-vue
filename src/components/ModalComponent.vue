<script>
export default {
  props:{
    NEData: {
      type: String,
      required: true,
    },
    NEDescription: {
      type: String,
      required: true,
    },
    NETitle: {
      type: String,
      required: true,
    },
    NEImg: {
      type: String,
      required: true,
    },

  }
}

</script>

<template>
  <!--Movie modal-->
  <div class="modal fade" id="movie-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- 1 -->
          <h5 class="modal-title" id="movie-modal-title">{{NETitle}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="movie-body-title">
          <!--製作跳出視窗html架構-->
          <div class='row'>
            <!-- 2 -->
            <div class="col-sm-8" id="movie-modal-image">
              <img
                :src="NEImg"
                alt="movie-poster" class="img-fluid">
            </div>
            <div class="col-sm-4">
              <!-- 3 -->
              <p>發行日期:<em id="movie-modal-date">{{ NEData }}</em></p>
              <!-- 4 -->
              <p id="movie-modal-description">簡介:{{ NEDescription }}</p>
            </div>
          </div>
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>
</template>
