import {
	request
} from '@/common/request.js'

// type
// 1 => v1
// 4 => v4
// 0 => 仪表盘接口


// 设备实时数据 
export const equipment = (data) => request({
	url: '6342711d9a0ac3000a44c761/data',
	method: 'post',
	data,
	type: "1"
})

// 治疗档案列表
export const record = (data) => request({
	url: '634e763952cb33000a45e252/data',
	method: 'post',
	data,
	type: "1"
})

// 治疗档案详情
export const recordDetail = (data) => request({
	url: '634e763952cb33000a45e252/data',
	method: 'post',
	data,
	type: "1"
})

// 设备运行数据 
export const recordRun = (data) => request({
	url: '6343c34483f745000868a309/data',
	method: 'post',
	data,
	type: "1"
})

// 编辑治疗档案
export const recordUpdate = (data) => request({
	url: '634e763952cb33000a45e252/data_update',
	method: 'post',
	data,
	type: "1"
})

// 获取文件上传凭证和上传地址
export const getUploadToken = () => request({
	url: '634e763952cb33000a45e252/file/get_upload_token',
	method: 'post',
	data: {
		transaction_id: "bmrj8888"
	},
	type: '4'
})

// 获取认证医生
export const getDoctor = (data) => request({
	url: '634e619d3f89ef000acfe68f/data',
	method: 'post',
	data,
	type: "1"
})

// 获取商机列表
export const getBusinessList = (data) => request({
	url: '63857723fa0a710007b253d8/data',
	method: 'post',
	data,
	type: "1"
})

// 获取商机详情
export const getBusinessDetail = (data) => request({
	url: '63857723fa0a710007b253d8/data_retrieve',
	method: 'post',
	data,
	type: "1"
})

// 获取商机统计
export const getBusinessStatistical = (data) => request({
	url: 'data_process/data/dash/combined_group',
	method: 'post',
	data,
	type: "0"
})
