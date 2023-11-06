<template>
    <el-drawer v-model="drawerShow" :title="isCreate ? '创建用户' : '编辑用户'" direction="right">
        <el-form :model="formData" label-width="120px">

            <el-form-item label="所属部门">
                <el-input v-model="formData.password" />
            </el-form-item>
            <el-form-item label="角色">
                <el-input v-model="formData.password" />
            </el-form-item>

            <el-form-item label="用户名">
                <el-input v-model="formData.account" />
            </el-form-item>

            <el-form-item label="昵称">
                <el-input v-model="formData.nickname" />
            </el-form-item>

            <el-form-item label="密码">
                <el-input v-model="formData.password" />
            </el-form-item>

            <el-form-item label="状态">
                <bind-radio v-model="formData.status" :options="statusType" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { useStatusTypeDict } from '@/enums/dictEnums';

const statusType = useStatusTypeDict()


const formData = ref({
    account: '',
    nickname: '',
    password: '',
    dept_id: 0,
    role_id: 0,
    status: 'normal'
})

// 是否为创建表单, 反之就是编辑表单
const isCreate = computed(() => formData.value?.user_id ? false : true)


// 是否显示抽屉
const drawerShow = ref(false)

const open = (data) => {
    if (data) {
        formData.value = data
    } else {
        formData.value = {
            account: '',
            nickname: '',
            password: '',
            dept_id: 0,
            role_id: 0,
            status: 'normal'
        }
    }

    drawerShow.value = true
}

const close = () => {
    drawerShow.value = false
}

defineExpose({
    open,
    close
})
</script>