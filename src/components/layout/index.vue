<template>
    <el-config-provider :locale="locale">
        <el-container>
            <Sidebar />
            <el-container>
                <el-header height="50px">
                    <Header v-model:sidebar-collapse="sidebarCollapse" />
                </el-header>
                <el-main>
                    <!-- ↓layout路由视图 -->
                    <router-view v-slot="{ Component, route }">
                        <component :is="Component" :key="route.fullPath" />
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue'
import Sidebar from './sidebar/index.vue'
import Header from './header/index.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'


export default defineComponent({
    name: 'Layout',
    components: { Sidebar, Header },

    setup() {
        // ↓侧边栏折叠
        const sidebarCollapse = ref(false)
        // ↓提供给sidebar注入
        provide('sidebarCollapse', sidebarCollapse)


        // 语言
        const language = ref('zh-cn')
        const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

        return {
            locale,
            sidebarCollapse,
        }
    },
})
</script>

<style lang="scss" scoped>
.el-header {
    padding: 0;
}

.el-main {
    text-align: center;
}
</style>
