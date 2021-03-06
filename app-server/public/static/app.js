const INTERVAL = 1
const PER_PAGE = 10

Vue.component('log-time', {
  data: function() {
    return {
      createdAt: 0
    }
  },
  mounted: function() {
    setInterval(() => this.createdAt = this.createdAt + INTERVAL, INTERVAL * 1000)
  },
  template: `<span @click="createdAt = 0" class="badge badge-secondary badge-pill">since {{ createdAt }}s</span>`
})

Vue.component('log', {
  props: ['url'],
  data: function() {
    return {
      display: true,
      reversed: false,
      logs: [],
      page: 0,
    }
  },
  mounted: function() {
    setInterval(() => this.fetchServer(), 1000)
  },
  computed: {
    logSorted: function() {

      let cloneLogs = this.logs.map(a => a)

      if (this.reversed) {
        cloneLogs.reverse()
      }

      let start = this.page * PER_PAGE
      let end = start + PER_PAGE

      return cloneLogs.slice(start, end)

    },
    numberOfPage: function() {
      return Math.floor(this.logs.length / PER_PAGE) + 1
    }
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

      <div class="btn-group mr-2" role="group" aria-label="First group">
        <button
          v-for="i in numberOfPage"
          type="button"
          class="btn btn-secondary"
          @click="page = i + 1"
        >{{i}}</button>
      </div>

      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" @click="reversed = !reversed">Toggle sort</button>
        <button class="btn btn-default" @click="display = !display" >
          bouton Antoine
        </button>
      </div>

      <ul class="list-group" v-if="display">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="log in logSorted"
        >
          {{ log }}
          <log-time />
        </li>
      </ul>
    </div>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    title: 'Hello Vue!',
    secret: null,
    urls: [
      'http://localhost:4001/secret/',
      'http://localhost:4002/',
      'http://localhost:4000/',
    ]
  },
  methods: {
    changeSecret: function() {
      axios.put('http://localhost:4001/secret/', {
          content: this.secret
        })
        .then(resp => {
          alert('Updated :)')
        })
        .catch(error => console.error(error))
    }
  },
  template: `
    <div class="row">

      <form class="col-12" @submit.prevent="changeSecret">
        <label for="name">Contenu du secret</label>
        <textarea name="content" class="form-control" v-model="secret">
        </textarea>
        <input type="submit" class="btn btn" />
      </form>

      <log v-bind:url="url" v-for="url in urls" />
    </div>
  `,

})