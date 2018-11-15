const INTERVAL = 1

Vue.component('log-time', {
  data: function() {
    return {
      createdAt: 0
    }
  },
  mounted: function() {
    setInterval(() => this.createdAt = this.createdAt + INTERVAL, INTERVAL * 1000)
  },
  template: `<span @click="createdAt = 0" class="badge badge-secondary badge-pill">{{ createdAt }} s</span>`
})

Vue.component('log', {
  props: ['url'],
  data: function() {
    return {
      display: true,
      logs: []
    }
  },
  mounted: function() {
    setInterval(() => this.fetchServer(), 1000)
  },
  methods: {
    fetchServer: function() {
      // debugger;
      axios.get(this.url)
        .then(resp => {
          if (this.logs.length === 100) {
            this.logs.shift()
          }

          this.logs.push(resp.data)

        })
        .catch(error => console.error(error))
    },
  },
  template: `
    <div class="col">
      <h2>{{ url }}</h2>

      <input type="checkbox" v-model="display" />
      <label>hide/show</label>

      <br/>

      <ul class="list-group" v-if="display">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="log in logs"
        >
          {{ log }}
          <log-time />
        </li>
      </ul>
      <button class="btn btn-default" @click="display = !display" >
      bouton Antoine
      </button>
    </div>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    title: 'Hello Vue!',
    urls: [
      'http://localhost:4001/secret/',
      'http://localhost:4002/',
      'http://localhost:4000/',
    ]
  },
  template: `
    <div class="row">
      <log v-bind:url="url" v-for="url in urls" />
    </div>
  `,

})