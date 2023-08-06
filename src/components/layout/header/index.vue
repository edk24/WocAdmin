<template>
    <div class="header">
        <div class="flex-1 flex">
            <div class="fold-icon" @click="toggle">
                <el-icon v-if="!sidebarCollapse" :size="24" color="#909399">
                    <Fold />
                </el-icon>
                <el-icon v-else :size="24" color="#909399">
                    <Expand />
                </el-icon>
            </div>

            <Breadcrumb />
        </div>



        <el-dropdown class="justify-end" trigger="click">
            <div class="avatar">
                <el-avatar :src="userInfo.avatar" shape="circle" size="small"></el-avatar>
                <span>{{ userInfo.nickname }}</span>
                <el-icon>
                    <caret-bottom />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item divided @click="signout">用户登出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Fold, Expand, CaretBottom, User } from '@element-plus/icons'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import { mapState } from 'pinia'
import useUserStore from '@/stores/modules/user'

export default defineComponent({
    name: 'Header',
    props: {
        sidebarCollapse: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Fold,
        Expand,
        CaretBottom,
        User,
        Breadcrumb
    },
    computed: {
        ...mapState(useUserStore, ['userInfo'])
    },
    emits: ['update:sidebarCollapse'],

    setup(props, { emit }) {
        const router = useRouter()


        // ↓sidebar折叠/展开的开关
        const toggle = () => {
            // ↓修改父组件值
            emit('update:sidebarCollapse', !props.sidebarCollapse)
        }
        // ↓登出
        const signout = () => {
            // TODO 有store变量后需清除store变量
            router.push('/login')
        }

        return { toggle, signout }
    },
})
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    box-shadow: 3px 1px 4px 0px rgba(0, 0, 0, 0.1);
    background: #fff;

    .fold-icon {
        padding: 11px 13px;
    }

    .avatar {
        padding: 5px;
        margin-right: 2px;
        display: inline-flex;
        align-items: center;

        .el-avatar {
            margin-right: 5px;
        }
    }

    .fold-icon:hover,
    .avatar:hover {
        cursor: pointer;
        background: #f7f7f7;
    }
}
</style>
