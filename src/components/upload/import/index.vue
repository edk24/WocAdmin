<template>
    <el-dialog v-model="dialogVisible" :title="title" width="450px">

        <el-upload drag :action="uploadAction" :headers="uploadHeaders">
            <el-icon class="el-icon--upload">
                <UploadFilled />
            </el-icon>
            <div class="el-upload__text">
                拖动文件到这里或 <em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    支持格式: xls、xlsx、csv。
                </div>
                <div class="el-upload__tip">
                    <el-link @click="handleDownloadTemplate">
                        导入模板下载
                    </el-link>
                </div>
            </template>
        </el-upload>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { baseUrl } from '@/config';
import { getToken } from '@/utils/auth';
import { UploadFilled, Download } from '@element-plus/icons'
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'UploadImport',
    props: {
        // 上传接口地址, 如: /admin/admin/import
        url: {
            type: String,
            required: true
        },
        // 弹出层标题
        title: {
            type: String,
            default: '数据导入'
        },
        // 模板文件下载URL, 如: /admin/admin/importTemplate
        templateUrl: {
            type: String
        }
    },
    components: {
        UploadFilled,
        Download
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    computed: {
        uploadAction() {
            return baseUrl + '/admin/upload'
        },
        uploadHeaders() {
            return {
                token: getToken()
            }
        }
    },
    methods: {
        open() {
            this.dialogVisible = true
        },

        close() {
            this.dialogVisible = false
        },

        handleSubmit() {

        },

        // 下载导入模板
        handleDownloadTemplate() {

        }
    }
})
</script>