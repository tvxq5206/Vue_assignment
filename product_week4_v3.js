import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

import pagination from './pagination.js';
import productModal from './productModal.js';
import deleteModal from './deleteModal.js';

createApp({
    data() {
      return {
        apiUrl: "https://ec-course-api.hexschool.io/v2",
        apiPath: "nini1202desu",
        products: [],
        isNew: false,
        tempProduct: {
            imagesUrl: [],
        },
        pages: {},
      }
    },
    methods: {
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            //使用axios套件請求資料
            axios
              .post(url)
              .then(() => {
                this.getData();
              })
              .catch((error) => {
                alert(error.data.message);
                window.location = "login.html";
              });
          },
          //宣告一個取得並渲染資料的函式
        getData(page = 1) {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
            //使用axios套件get資料
            axios
              .get(url)
              .then((res) => {
                this.products = res.data.products;
                this.pages = res.data.pagination;
              })
              .catch((err) => {
                alert(err.data.message);
                window.location = 'login.html'
              });
        },
        //修改產品資料
        updateProduct(){
           let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
           //全新資料, 就使用post取得資料
           let http = 'post';
           //有產品, http就使用put的方式取得資料
           if (!this.isNew){
            url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            http = 'put';
           }

           axios[http](url, { data: this.tempProduct })
           .then((res) => {
            alert(res.data.message)
            this.getData();
            this.$refs.pModal.closeModal();
            //modalProduct.hide();
            this.tempProduct = {};
           })
           .catch((err) => {
            alert(err.data.message);
           })

        },
        openModal(status, product){
           if (status === 'new'){
            this.tempProduct = {
                imagesUrl: [],
            };
            this.isNew = true;
            this.$refs.pModal.openModal();
           // modalProduct.show();
           }else if(status === 'edit'){
            this.tempProduct = { ...product };
            if (!Array.isArray(this.tempProduct.imagesUrl)) {
              this.tempProduct.imagesUrl = [];
            }
            this.isNew = false;
            this.$refs.pModal.openModal();
            //modalProduct.show();
           }else if(status === 'delete'){
            this.tempProduct = { ...product };
            this.$refs.delModal.openDelModal();
            //modalDel.show();
           }
        },
        delProduct(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
            .then((response) => {
                alert(response.data.message);
                this.$refs.delModal.closeDelModal();
                //modalDel.hide();
                this.getData();
            })
            .catch((err) => {
                alert(err.data.message);
            });
        },
        createImages(){
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        }
    },
    mounted() {
        //取出token
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          );
        axios.defaults.headers.common["Authorization"] = token;

        this.checkAdmin();
    },
    components: {
      pagination,
      productModal,
      deleteModal
    }
  }).mount('#app')