import { Component } from 'vue'

export declare type RouterRecord = {
    hidden?: boolean
    path: string
    component?: Component
    meta?: any
    children?: Array<RouterRecord>
    redirect?: string
    props?: any
}