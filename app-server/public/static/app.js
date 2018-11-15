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
        .then(resp => this.logs.push(resp.data))
        .catch(error => console.error(error))
    },
  },
  template: `
    <div class="col">
      <h2>{{ url }}</h2>

      <ul class="list-inline">
        <li class="list-inline-item" v-for="log in logs"> {{ log }}</li>
      </ul>
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
    <div>
      <log v-bind:url="url" v-for="url in urls" />
    </div>
  `,

})