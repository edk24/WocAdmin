import { ref } from 'vue'

// 状态
export function useStatusTypeDict() {
    return ref([
        {
            label: '正常',
            value: 'normal',
            color: 'primary'
        },
        {
            label: '禁用',
            value: 'disable',
            color: 'error'
        },
    ])
}