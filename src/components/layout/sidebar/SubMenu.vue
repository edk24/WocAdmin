<template>
    <div v-if="!menu?.hidden">
        <template
            v-if="hasOneShowingChild(menu?.children, menu) && (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) && !menu?.alwaysShow">
            <app-link v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild?.path)">
                <el-menu-item :index="resolvePath(onlyOneChild?.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
                    <el-icon>
                        <Edit />
                    </el-icon>
                    <span>{{ onlyOneChild?.meta.title }}</span>
                </el-menu-item>
            </app-link>
        </template>

        <el-sub-menu v-else :index="resolvePath(menu?.path)" :key="resolvePath(menu?.path)">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>{{ menu?.meta?.title }}</span>
            </template>

            <SubMenu v-for="child in menu?.children" :key="child.path" :is-nest="true" :menu="child"
                :base-path="resolvePath(child.path)" class="nest-menu" />
        </el-sub-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isExternal } from '@/utils/url'
import AppLink from './AppLink.vue'
import { Location, Edit } from '@element-plus/icons'
import { resolve } from "path-browserify"

export default defineComponent({
    name: 'SubMenu',
    props: {
        menu: {
            type: Object,
        },
        basePath: {
            type: String,
            default: ''
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    components: {
        AppLink,
        Location,
        Edit
    },
    data() {
        this.onlyOneChild = null
        return {
        }
    },
    mounted() {
    },
    methods: {
        isExternal,

        hasOneShowingChild(children: any, parent: any) {
            if (!children) {
                children = []
            }

            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item
                    return true
                }
            })

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
                return true
            }

            return false
        },

        resolvePath(routePath: string): string {
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(this.basePath)) {
                return this.basePath as string
            }
            return resolve(this.basePath, routePath)
        }
    }
})
</script>