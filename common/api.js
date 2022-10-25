import {
	request
} from '@/common/request.js'


// 设备实时数据 
export const equipment = (data) => request({
	url: '/63413e3366ceda0008b4e512/entry/6342711d9a0ac3000a44c761/data',
	method: 'post',
	data
})

// 治疗档案列表
export const record = (data) => request({
	url: '/63413e3366ceda0008b4e512/entry/634e763952cb33000a45e252/data',
	method: 'post',
	data
})

// 治疗档案详情
export const recordDetail = (data) => request({
	url: '/63413e3366ceda0008b4e512/entry/634e763952cb33000a45e252/data',
	method: 'post',
	data
})

// 设备运行数据 
export const recordRun = (data) => request({
	url: '/63413e3366ceda0008b4e512/entry/6343c34483f745000868a309/data',
	method: 'post',
	data
})