import request from '@/utils/request'

// 向外按需导出 一个 API 函数
export const getArticleListAPI = function (_page, _limit) {
  // 函数的返回值，没有 return 则会返回undefined
  return request.get('/articles', {
    // 请求参数
    params: {
      _page,
      _limit
    }
  })
}
