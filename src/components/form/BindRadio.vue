<template>
    <el-radio-group :value="modelValue" @change="onChange">
        <el-radio :label="opt.value" v-for="opt in options" :key="opt.value">{{ opt.label }}</el-radio>
    </el-radio-group>
</template>

<script lang="ts" setup>

interface OptionType {
    label: string
    value: any
}

defineProps({
    options: Array<OptionType>,
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])


const onChange = (value: string | number | boolean) => {
    emit('update:modelValue', value)
}
</script>