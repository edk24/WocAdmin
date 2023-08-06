<template>
    <div class="sidebar">
        <el-menu default-active="" class="menu" :collapse="sidebarCollapse" @open="handleOpen" @close="handleClose"
            active-text-color="rgb(64, 158, 255)" background-color="rgb(48, 65, 86)" text-color="rgb(191, 203, 217)">
            <div class="logo">
                <img class="w-[32px] h-[32px]" src="@/assets/images/default-avatar.jpeg" />
                <span class="ml-2 text-white" style="color: #fff;" v-show="!sidebarCollapse">{{ appName }}</span>
            </div>

            <SubMenu v-for="route in routes" :key="route.path" :index="route.path" :menu="route" :base-path="route.path" />
        </el-menu>
    </div>
</template>


<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { appName } from '@/config'
import SubMenu from './SubMenu.vue'
import useUserStore from '@/stores/modules/user'
export default defineComponent({
    name: 'Sidebar',
    setup() {
        // ↓注入父组件值
        const sidebarCollapse = ref<boolean>(inject('sidebarCollapse') as boolean)

        const userStore = useUserStore()
        const routes = userStore.routes

        return {
            userStore,
            routes,
            sidebarCollapse,
            appName
        }
    },
    components: {
        SubMenu
    },
    mounted() {

    },
    methods: {
        handleOpen(key: string, keyPath: string[]) {
            // console.log(key, keyPath)
        },
        handleClose(key: string, keyPath: string[]) {
            // console.log(key, keyPath)
        }
    }
})
</script>

<style lang="scss" scoped>
.sidebar {
    height: 100vh;
    box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.1);
    background: rgb(48, 65, 86);

    .menu {
        border-right: unset;

        .logo {
            height: 52px;
            line-height: 52px;
            padding: 0 10px;
            overflow: hidden;
            background: #2b2f3a;

            img {
                vertical-align: middle;
                margin-left: 6px;
                display: inline-block;
            }

            span {
                font-weight: bold;
                font-size: 16px;
            }
        }
    }

    .menu:not(.el-menu--collapse) {
        width: 220px;
    }
}
</style>
