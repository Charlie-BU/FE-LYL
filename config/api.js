const http = uni.$u.http
export const $get = function(url, data = {}) {
	return http.get(`/${url}`, {
		params: data
	})
}
export const $post = function(url, data = {}) {
	return http.post(`/${url}`, data)
}
export const $put = function(url, data = {}) {
	return http.put(`/${url}`, data)
}
export const $delete = function(url, data = {}) {
	return http.delete(`/${url}`, data)
}