import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      //新增一個apiUrl物件, 以便其他函式取用
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      //設定user物件, 裡面的username和password為空字串
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //新增login函式, 裡面宣告一個api變數, 使用樣板字面值, 將apiUlr代入並加上signin的剩餘網址
    login() {
      const api = `${this.apiUrl}/admin/signin`;
      //使用axios post串接新增API
      axios
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          // 寫入 cookie的token
          // 以expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`;
          //從全域window的location代入product.html, 登入之後會跳轉至product.html
          window.location = "product.html";
        })
        .catch((err) => {
          //錯誤則會跳出error的message
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
