<template>
    <div class="login-bg">
        <div class="flex h-[100vh] justify-center items-center">
            <el-card class="login-card">

                <div class="banner"></div>

                <div class="login-container">
                    <div class="text-2xl text-center">系统登录</div>

                    <el-form class="mt-4 px-4" :model="formData" label-width="0">
                        <el-form-item>
                            <el-input :prefix-icon="User" v-model="formData.account" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item>
                            <el-input :prefix-icon="Lock" type="password" v-model="formData.password" placeholder="请输入密码" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" :loading="loading" class="w-[100%] mt-2" round
                                @click="handleLogin">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>


        <div class="footer">
            Copyright © Woc-Admin
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons'
import useUserStore from '@/stores/modules/user';
import feedback from '@/utils/feedback';
import { useRouter } from 'vue-router';

// 表单
const formData = ref({
    account: 'admin',
    password: 'e10adc3949ba59abbe56e057f20f883e'
})

const loading = ref(false) // 加载中
const userStore = useUserStore()
const router = useRouter()
const handleLogin = () => {
    loading.value = true

    userStore.login(formData.value.account, formData.value.password)
        .then(() => {
            router.push({ path: '/' })
        })
        .finally(() => {
            loading.value = false
        })
}
</script>

<style lang="scss">
.login-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/assets/images/login-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.login-card {
    border-radius: 8px;
    border-width: 0 !important;
    width: 500px;
    height: 230px;

    .el-card__body {
        padding: 0 !important;
        display: flex;


        .banner {
            background-image: url('@/assets/images/login-banner.png');
            background-size: auto 100%;
            background-position: center;
            background-repeat: no-repeat;
            flex: 2;
        }

        .login-container {
            flex: 2;
            padding: 20px;
        }
    }
}

.footer {
    position: fixed;
    bottom: 15px;
    text-align: center;
    left: 0;
    right: 0;
    font-size: 12px;
    color: #eee;
}
</style>

