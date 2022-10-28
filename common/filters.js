// 过滤器

export default {
	transformTime(date) {
		if(!date) return ''
		let d = new Date(date);
		let datetime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		return datetime;
	}
}
