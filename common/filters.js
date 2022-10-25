// 过滤器

export default {
	transformTime(date) {
		var d = new Date(date);
		var datetime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		return datetime;
	}
}
