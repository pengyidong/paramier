import {
	request
} from '@/common/request.js'


// 设备实时数据 
export const equipment = (data) => request({
	url: '6342711d9a0ac3000a44c761/data',
	method: 'post',
	data,
	isUpload: false
})

// 治疗档案列表
export const record = (data) => request({
	url: '634e763952cb33000a45e252/data',
	method: 'post',
	data,
	isUpload: false
})

// 治疗档案详情
export const recordDetail = (data) => request({
	url: '634e763952cb33000a45e252/data',
	method: 'post',
	data,
	isUpload: false
})

// 设备运行数据 
export const recordRun = (data) => request({
	url: '6343c34483f745000868a309/data',
	method: 'post',
	data,
	isUpload: false
})

// 编辑治疗档案
export const recordUpdate = (data) => request({
	url: '634e763952cb33000a45e252/data_update',
	method: 'post',
	data,
	isUpload: false
})

// 获取文件上传凭证和上传地址
export const getUploadToken = () => request({
	url: '634e763952cb33000a45e252/file/get_upload_token',
	method: 'post',
	data: {
		transaction_id: "bmrj8888"
	},
	isUpload: true
})

// 获取认证医生
export const getDoctor = (data) => request({
	url: '634e619d3f89ef000acfe68f/data',
	method: 'post',
	data,
	isUpload: false
})

// 获取商机列表
export const getBusinessList = (data) => request({
	url: '63857723fa0a710007b253d8/data',
	method: 'post',
	data,
	isUpload: false
})

// 获取商机详情
export const getBusinessDetail = (data) => request({
	url: '63857723fa0a710007b253d8/data_retrieve',
	method: 'post',
	data,
	isUpload: false
})
