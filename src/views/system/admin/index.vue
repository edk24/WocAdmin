<template>
    <el-row class="mb-4">
        <el-button size="small" :icon="Refresh"></el-button>
        <el-button size="small" type="primary">新增</el-button>
        <el-button size="small" type="danger">删除</el-button>
        <el-button size="small" type="info" @click="handleOpenImport">导入Excel</el-button>
    </el-row>

    <el-row>
        <el-table size="small" stripe :data="userList" @filter-change="handleFilterChange" style="width: 100%">
            <el-table-column type="selection" width="38" />
            <el-table-column property="account" label="用户名" width="120" />
            <el-table-column property="nickname" label="昵称" width="120" />
            <el-table-column property="dept.dept_name" label="所属部门" width="120" />
            <el-table-column property="roleName" label="角色" width="120" />
            <el-table-column property="status" column-key="status" label="状态" width="120" :filters="statusFilters">
                <template #default="scope">
                    <el-tag :type="scope.row.statusColor">
                        {{ scope.row.statusText }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column property="last_login_ip" label="最后登录IP" width="100" />
            <el-table-column property="last_login_time" label="最后登录时间" width="150" />
            <el-table-column property="create_time" label="创建时间" width="150" show-overflow-tooltip />
            <el-table-column property="update_time" label="更新时间" width="150" show-overflow-tooltip />
            <el-table-column label="管理" width="120" fixed="right">
                <template #default="scope">
                    <el-space>
                        <el-link :icon="Edit" type="primary" :disabled="isMe(scope.row.user_id)">编辑</el-link>

                        <el-popconfirm title="确定删除吗?" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-link :icon="Delete" type="danger" :disabled="isMe(scope.row.user_id)">删除</el-link>
                            </template>
                        </el-popconfirm>
                    </el-space>
                </template>
            </el-table-column>
        </el-table>


    </el-row>

    <el-row class="mt-4">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[20, 50, 100, 200]"
            :small="true" :disabled="false" :background="true" layout="total, sizes, prev, pager, next, jumper"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-row>


    <UploadImport url="ss" ref="imortRef"></UploadImport>
</template>

<script setup>
import { Refresh, Edit, Delete } from '@element-plus/icons'
import UploadImport from '@/components/upload/import/index.vue'
import { deleteUserById, userLists } from '@/api/system/user'
import { onMounted } from 'vue'
import { useStatusTypeDict } from '@/enums/dictEnums'
import useUserStore from '@/stores/modules/user'
const imortRef = ref()

// 字典
const statusType = useStatusTypeDict()
const statusFilters = statusType.value.map((item) => {
    item.text = item.label
    return item
})

// 登录用户信息
const userStore = useUserStore()
// 是否为当前用户
const isMe = (userId) => userId == userStore.userInfo.user_id

// 用户列表
const userList = ref([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const params = ref({
})

const handleSizeChange = (value) => {
    fetchList()
}
const handleCurrentChange = (value) => {
    fetchList()
}
// 抓取数据
const fetchList = () => {
    const args = Object.assign({}, params.value, {
        page: currentPage.value,
        limit: pageSize.value
    })
    userLists(args)
        .then((data) => {
            total.value = data.total
            userList.value = data.rows
        })
}
const handleFilterChange = (filter) => {
    params.value = Object.assign(params.value, filter)
    currentPage.value = 1
    fetchList()
}

onMounted(() => {
    fetchList()
})


// 其他操作
const handleDelete = (row) => {
    deleteUserById(row.user_id)
        .then((data) => {
            console.log(data)
            userList.value = userList.value.filter((item) => item.user_id != row.user_id)
        })
}


// 打开导入
const handleOpenImport = () => imortRef.value.open()
</script>