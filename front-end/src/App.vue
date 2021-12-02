<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/workoutSmall.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Personalized Workouts</h1>
    </div>
    <div class="tabs">
      <router-link to="/">Home | </router-link>
      <router-link to="/user">User | </router-link>
      <router-link to="/workout">Workout</router-link>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a href="https://github.com/bfarley822/cp4.git"> Github Link</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #FAFAD2;
  padding: 0px;
  margin: 0px;
  position: relative;
  min-height: 165vh;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #F0E68C;
  color: #1C454F;
}

.title {
  margin-top: 5px;
  margin-left: 20px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

.tabs {
  margin-top: 35px;
  margin-left: 100px;
}

.tabs a {
  color: #000;
  text-decoration: none;
}

.tabs a:hover {
  color: blue;
}

/* Footer */
.footer {
  height: 2.5rem;
  padding: 20px 100px 0px 100px;
  background: #F0E68C;
  font-size: 15px;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.footer a {
  color: #000;
  text-decoration: none;
}

.footer a:hover {
  color: blue;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
