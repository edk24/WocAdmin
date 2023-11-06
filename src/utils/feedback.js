import {
    ElMessage,
    ElMessageBox,
    ElNotification,
    ElLoading
} from 'element-plus';

class Feedback {
    constructor() {
        this.loadingInstance = null;
    }

    static getInstance() {
        return this.instance ?? (this.instance = new Feedback());
    }

    msg(msg) {
        ElMessage.info(msg);
    }

    msgError(msg) {
        ElMessage.error(msg);
    }

    msgSuccess(msg) {
        ElMessage.success(msg);
    }

    msgWarning(msg) {
        ElMessage.warning(msg);
    }

    alert(msg) {
        ElMessageBox.alert(msg, '系统提示');
    }

    alertError(msg) {
        ElMessageBox.alert(msg, '系统提示', { type: 'error' });
    }

    alertSuccess(msg) {
        ElMessageBox.alert(msg, '系统提示', { type: 'success' });
    }

    alertWarning(msg) {
        ElMessageBox.alert(msg, '系统提示', { type: 'warning' });
    }

    notify(msg) {
        ElNotification.info(msg);
    }

    notifyError(msg) {
        ElNotification.error(msg);
    }

    notifySuccess(msg) {
        ElNotification.success(msg);
    }

    notifyWarning(msg) {
        ElNotification.warning(msg);
    }

    confirm(msg) {
        return ElMessageBox.confirm(msg, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        });
    }

    prompt(content, title, options) {
        return ElMessageBox.prompt(content, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            ...options
        });
    }

    loading(msg) {
        this.loadingInstance = ElLoading.service({
            lock: true,
            text: msg
        });
    }

    closeLoading() {
        this.loadingInstance?.close();
    }
}

const feedback = Feedback.getInstance();

export default feedback;