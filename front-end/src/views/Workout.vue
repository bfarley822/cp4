<template>
<div class="workout">
  <h1>Workouts</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2>Create a workout</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="partOfBody" placeholder="Part of Body">
      <p></p>
      <input v-model="intensity" placeholder="Intensity (1-10)">
      <p></p>
      <input v-model="time" placeholder="Time">
      <p></p>
      <textarea v-model="description" rows="1" cols="22" placeholder="Description"></textarea>
      <p></p>
      <h2>Select who the workout is for:</h2>
      <div class="form">
        <input v-model="findName" placeholder="Search">
        <div class="suggestions" v-if="suggestions2.length > 0">
          <div class="suggestion" v-for="s in suggestions2" :key="s.id" @click="selectUser(s)">{{s.name}}
          </div>
        </div>
        <div class="upload" v-if="findUser">
          <p>Workout is for: {{findUser.name}}</p>
        </div>
      </div>
      <h2>Choose a picture for the workout:</h2>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addWorkout">
      <h2>{{addWorkout.partOfBody}}</h2>
      <img :src="addWorkout.path" />
    </div>
  </div>
  <hr>
  <div class="heading">
    <div class="circle">2</div>
    <h2>Edit/Delete a workout</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findPartOfBody" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectWorkout(s)">{{s.partOfBody}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findWorkout">
      <input v-model="findWorkout.partOfBody">
      <p></p>
      <input v-model="findWorkout.intensity">
      <p></p>
      <input v-model="findWorkout.time">
      <p></p>
      <textarea v-model="findWorkout.description" rows="5" cols="22"></textarea>
      <p></p>
      <input v-model="findWorkout.who">
      <p></p>
      
      <h1></h1>
    </div>
    <div class="actions" v-if="findWorkout">
      <button @click="deleteWorkout(findWorkout)">Delete</button>
      <button @click="editWorkout(findWorkout)">Edit</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Workout',
  data() {
    return {
      who: "",
      partOfBody: "",
      intensity: "",
      time: "",
      description: "",
      file: null,
      addWorkout: null,
      workouts: [],
      findPartOfBody: "",
      findWorkout: null,
      addUser: null,
      users: [],
      findName: "",
      findUser: null,
      name: "",
    }
  },
  computed: {
    suggestions() {
      let workouts = this.workouts.filter(workout => workout.partOfBody.toLowerCase().startsWith(this.findPartOfBody.toLowerCase()));
      return workouts.sort((a, b) => a.partOfBody > b.partOfBody);
    },
    suggestions2() {
      let users = this.users.filter(user => user.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return users.sort((a, b) => a.name > b.name);
    }
  },
  created() {
    this.getWorkouts();
    this.getUsers();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/workouts', {
          partOfBody: this.partOfBody,
          intensity: this.intensity,
          time: this.time,
          description: this.description,
          who: this.who,
          path: r1.data.path
        });
        this.addWorkout = r2.data;
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
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectWorkout(workout) {
      this.findPartOfBody = "";
      this.findWorkout = workout;
    },
    selectUser(user) {
      this.findName = "";
      this.findUser = user;
      this.who = user.name;
    },
    async deleteWorkout(workout) {
      try {
        await axios.delete("/api/workouts/" + workout._id);
        this.findWorkout = null;
        this.getWorkouts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editWorkout(workout) {
      try {
        await axios.put("/api/workouts/" + workout._id, {
          partOfBody: this.findWorkout.partOfBody,
          intensity: this.findWorkout.intensity,
          time: this.findWorkout.time,
          description: this.findWorkout.description,
          who: this.findWorkout.who
        });
        this.findWorkout = null;
        this.getWorkouts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 200px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
