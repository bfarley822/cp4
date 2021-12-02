<template>
<div class="user">
  <h1>Users</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2>Create a user</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="name" placeholder="Name">
      <p></p>
      <input v-model="height" placeholder="Height">
      <p></p>
      <input v-model="weight" placeholder="Weight">
      <p></p>
      <p>Choose a profile picture:</p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addUser">
      <h2>{{addUser.name}}</h2>
      <img :src="addUser.path" />
      <h2>{{addUser.height}} {{addUser.weight}}</h2>
    </div>
  </div>
  <hr>
  <div class="heading">
    <div class="circle">2</div>
    <h2>Edit/Delete a user</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findName" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectUser(s)">{{s.name}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findUser">
      <input v-model="findUser.name">
      <p></p>
      <input v-model="findUser.height">
      <p></p>
      <input v-model="findUser.weight">
      <p></p>
      <img :src="findUser.path" />
    </div>
    <div class="actions" v-if="findUser">
      <button @click="deleteUser(findUser)">Delete</button>
      <button @click="editUser(findUser)">Edit</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'User',
  data() {
    return {
      name: "",
      height: "",
      weight: "",
      file: null,
      addUser: null,
      users: [],
      findName: "",
      findUser: null,
    }
  },
  computed: {
    suggestions() {
      let users = this.users.filter(user => user.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return users.sort((a, b) => a.name > b.name);
    }
  },
  created() {
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
        let r2 = await axios.post('/api/users', {
          name: this.name,
          height: this.height,
          weight: this.weight,
          path: r1.data.path
        });
        this.addUser = r2.data;
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
    selectUser(user) {
      this.findName = "";
      this.findUser = user;
    },
    async deleteUser(user) {
      try {
        await axios.delete("/api/users/" + user._id);
        this.findUser = null;
        this.getUsers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editUser(user) {
      try {
        await axios.put("/api/users/" + user._id, {
          name: this.findUser.name,
          height: this.findUser.height,
          weight: this.findUser.weight,
        });
        this.findUser = null;
        this.getUsers();
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
  border-radius: 50%;
  width: 110px;
  height: 110px;
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
