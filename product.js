import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

let modalProduct = null;
let modalDel = null;


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
                alert(error.response.data.message);
                window.location = "login.html";
              });
          },
          //宣告一個取得並渲染資料的函式
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
            //使用axios套件get資料
            axios
              .get(url)
              .then((res) => {
                this.products = res.data.products;
              })
              .catch((err) => {
                alert(err.response.data.message);
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
           .then((response) => {
            console.log(response.data.message)
            alert(response.data.message);
            modalProduct.hide();
            this.getData();
           })
           .catch((err) => {
            alert(err.response.data.message);
           })

        },
        openModal(isNew, product){
           if (isNew === 'new'){
            this.tempProduct = {
                imagesUrl: [],
            };
            this.isNew = true;
            modalProduct.show();
           }else if(isNew === 'edit'){
            this.tempProduct = { ...product };
            this.isNew = false;
            modalProduct.show();
           }else if(isNew === 'delete'){
            this.tempProduct = { ...product };
            modalDel.show();
           }
        },
        delProduct(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
            .then((response) => {
                alert(response.data.message);
                modalDel.hide();
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
      //用element Id抓modal
        modalProduct = new bootstrap.Modal(
            document.getElementById('productModal'), 
        {
            keyboard: false,
        }
        );
        modalDel = new bootstrap.Modal(
            document.getElementById('delProductModal'), 
        {
            keyboard: false,
        }
        );
        //取出token
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          );
        axios.defaults.headers.common["Authorization"] = token;

        this.checkAdmin();
    }
  }).mount('#app')