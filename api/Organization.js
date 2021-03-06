import request from '@/utils/request'

export default {
  //  组织机构树
  organizateTree(params) {
    return request.get('/rest/organizate/depart', { params })
  },
  // 异步获取组织机构树
  asynchronousGetDepartTree(params) {
    return request.get('/rest/sysuser/departTree/' + params)
  },
  // 将组织机构拉成平级
  userGroupSelect() {
    return request.post('/rest/processCheck/groupEqualRank')
  },
  // 异步获取组织机构
  getProjectItemFromLayer(data) {
    return request.post('/rest/projectItemInfo/getProjectBQItemById', data)
  },
  // 标段下的人员
  getUserName(data) {
    return request.post('/rest/processCheck/notDeletedUser', data)
  },
  getAllProjectItemTree(data) {   //异步获取组织机构
    return request.post('/rest/projectItemInfo/getProjectBQItemByIdNotZroe', data)
  },
  //设置组织机构
  setDeparent(data){
     return request.post("/rest/projectItemInfo/setItemOrgCode",data) 
  }
}


