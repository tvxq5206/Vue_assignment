import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  //資料方在data中
  data() {
    return {
      apiUrl: "https://ec-course-api.hexschool.io/v2",
      apiPath: "nini1202desu",
      //放入一個空陣列, 以便下方函式放入資料進去
      products: [],
      //空物件來暫存事件監聽的資料
      tempProduct: {},
    };
  },
  //函式放在methods中
  methods: {
    //宣告一個驗證登入管理控制平台的函式
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
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
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
    //查看細節按鈕的函式, 事件監聽點擊之後會渲染出畫面
    openProduct(item) {
      this.tempProduct = item;
    },
  },
  //元件生成的時候, 會先觸發一次的地方
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    this.checkAdmin();
  },
}).mount("#app");
