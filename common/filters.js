// 过滤器

export default {
	transformTime(date) {
		if (!date) return ''
		let time = new Date(date);
		let y = time.getFullYear();
		let M = time.getMonth() + 1;
		let d = time.getDate();
		let h = time.getHours();
		let m = time.getMinutes();
		let s = time.getSeconds();
		return `${addZero(y)}-${addZero(M)}-${addZero(d)} ${addZero(h)}:${addZero(m)}:${addZero(s)}`
	}
}

function addZero(m) {
	return m < 10 ? '0' + m : m;
}
