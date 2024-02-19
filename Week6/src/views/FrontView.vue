<template>
    <h2>這是前台</h2>
    <nav>
        <RouterLink to="/">首頁</RouterLink> |
        <RouterLink to="about">關於我們</RouterLink> |
        <RouterLink to="product">前台產品列表</RouterLink> |
        <RouterLink to="cart">前台購物車列表</RouterLink> |
        <RouterLink to="login">登入</RouterLink> |
        <RouterLink to="/admin">後台首頁</RouterLink> |
    </nav>
<RouterView></RouterView>
</template>
