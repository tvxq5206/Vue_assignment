<template>
    <h2>這是後台</h2>
        <nav>
        <RouterLink to="/admin/adminproduct">後台產品列表</RouterLink> |
        <RouterLink to="/admin/order">後台訂單列表</RouterLink> |
        <RouterLink to="/">前台</RouterLink> |
        </nav>
<RouterView></RouterView>
</template>
