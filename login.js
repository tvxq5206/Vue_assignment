import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
    data() {
        return {
            user:
            {
                username: "",
                password: ""
            },
        }
    },
    methods: {
        login() {
            const url = "https://ec-course-api.hexschool.io/v2";
            axios.post(`${url}/admin/signin`, this.user)
                .then((res) => {
                    const { token, expired } = res.data;
                    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                    window.location = 'index.html';
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        },
    },
}).mount("#app");
