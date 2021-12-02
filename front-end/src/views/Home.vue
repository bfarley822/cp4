<template>
<div class="home">
  <section class="hi">
    <div class="image1" v-for="user in users" :key="user.id">
      <div class="image">
        <img :src="user.path" />
        <div class="text">
          <h1>{{user.name}}</h1>
          <p>Height: {{user.height}}</p>
          <p>Weight: {{user.weight}}</p>
        </div>
      </div>
      <h1 class="line">______________________</h1>
      <div class="image2" v-for="workout in workouts" :key="workout.id">
        <div class="image-gallery" v-if="whoCheck(user,workout)">
          <h1>{{workout.partOfBody}}</h1>
          <img :src="workout.path" />
          <div class="text">
            <p>Intensity: {{workout.intensity}}</p>
            <p>Time: {{workout.time}}</p>
            <p>{{workout.description}}</p>
          </div>
        </div>
      </div>
      <hr style="width:100%;">
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     users: [],
     workouts: [],
    }
  },
  created() {
    this.getUsers();
    this.getWorkouts();
  },
  methods: {
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getWorkouts() {
      try {
        let response = await axios.get("/api/workouts");
        this.workouts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    whoCheck(user,workout) {
      if (user.name == workout.who) {
        return true;
      }
      else {
        return false;
      }
    }
  },
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

.line {
  margin-top: -35px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1em;

}

.image {
  margin: 0 0 1.5em;
  display: inline-flex;
  width: 100%;
}

.image img {
  border-radius: 50%;
  width: 110px;
  height: 110px;
}

.text {
  padding-left: 10px;
  padding-top: 0px;
  font-size: 12px;
}

.image1 {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image2 {
  margin: 0 0 1.5em;
  display: inline-flex;
  width: 100%;

}

.image2 img {
  max-width: 200px;
  max-height: 200px;
}

.center {
  text-align: center;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 1;
  }
}
</style>
