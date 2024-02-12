const { createApp } = Vue;

//定義規則
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 加入多國語系，讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const userProductModal = {
  props: ["tempProduct", "addToCart"],
  data() {
    return {
      productModal: null,
      qty: 1,
    };
  },
  template: "#userProductModal",
  methods: {
    openModal() {
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    },
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.modal);
  },
  watch: {
    tempProduct() {
      this.qty = 1;
    },
  },
};

const app = createApp({
  data() {
    return {
      apiUrl: "https://ec-course-api.hexschool.io/v2",
      apiPath: "nini1202desu",
      products: [],
      tempProduct: {},
      carts: {},
      status: {
        addToCartLoading: "",
        openModalLoading: "",
        changeQtyLoading: "",
      },
      //訂單資料
      form: {
        user: {
          email: "",
          name: "",
          tel: "",
          address: "",
        },
        message: "這是留言",
      },
    };
  },
  methods: {
    getProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/products/all`;
      axios.get(url).then((res) => {
        this.products = res.data.products;
      });
    },
    openModal(product) {
      this.tempProduct = product;
      this.status.openModalLoading = "";
      this.$refs.userProductModal.openModal();
    },
    addToCart(product_id, qty = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
      const order = {
        product_id,
        qty,
      };
      this.status.addToCartLoading = product_id;
      axios.post(url, { data: order }).then((res) => {
        this.status.addToCartLoading = "";
        alert(res.data.message);
        this.getCart();
        this.$refs.userProductModal.closeModal();
      });
    },
    changeCartQty(item, qty = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${item.id}`;
      const order = {
        product_id: item.product_id,
        qty,
      };
      this.status.changeQtyLoading = item.id;
      axios.put(url, { data: order }).then((res) => {
        this.status.changeQtyLoading = "";
        this.getCart();
      });
    },
    deleteCartItem(id) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${id}`;
      this.status.changeQtyLoading = id;
      axios.delete(url).then((res) => {
        alert(res.data.message);
        this.status.changeQtyLoading = "";
        this.getCart();
      });
    },
    deleteAllCart() {
      const url = `${this.apiUrl}/api/${this.apiPath}/carts`;
      axios.delete(url).then((res) => {
        alert(res.data.message);
        this.getCart();
      });
    },
    getCart() {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
      axios.get(url).then((res) => {
        this.carts = res.data.data;
      });
    },
    createOrder() {
      const url = `${this.apiUrl}/api/${this.apiPath}/order`;
      const purchaseOrder = this.form;
      axios
        .post(url, { data: purchaseOrder })
        .then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
  },
  mounted() {
    this.getProduct();
    this.getCart();
  },
  components: {
    userProductModal,
  },
});

//全域註冊VeeValidate套件
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");
