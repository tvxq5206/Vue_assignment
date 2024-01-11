import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
     apiUrl: 'https://ec-course-api.hexschool.io/v2',
     apiPath: 'nini1202desu',
     products: [],
     tempProduct: {}
    }
  },
  methods: {
    checkAdmin(){
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
      .then(() => {
        this.getData();
      })
      .catch((error) => {
        alert(error.response.data.message)
        window.location = 'login.html';
      })
    },
    getData(){
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
      .then ((res) => {
        this.products = res.data.products;
      })
      .catch ((err) => {
        alert(err.response.data.message);
      })
    },
    openProduct(item){
      this.tempProduct = item;
    }
  },
  mounted(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;

    this.checkAdmin();
  }
}).mount('#app');