<template>
    <component :is="type" v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script lang="ts">
import { isExternal } from '@/utils/url'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        to: {
            type: String,
            required: true
        }
    },
    computed: {
        isExternal() {
            return isExternal(this.to)
        },
        type() {
            if (this.isExternal) {
                return 'a'
            }
            return 'router-link'
        }
    },
    methods: {
        linkProps(to: string) {
            if (this.isExternal) {
                return {
                    href: to,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                to: to
            }
        }
    }
})
</script>