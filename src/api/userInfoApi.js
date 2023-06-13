import Axios from '../tool/http';
// 保存到info表
function savePassword(uid, infoType, infoMessage) {
    return Axios({
        method: 'post',
        url: '/userInfo/addUserInfo',
        params: {
            uid,
            infoType,
            infoMessage
        }
    })
}
//  分页查询
function selectLimitUserInfo(object, pageBegin, pageCount) {
    return Axios({
        method: 'get',
        url: '/userInfo/selectLimitUserInfo',
        params: {
            object,  //字段必须和后端保持一致
            pageBegin,
            pageCount,
        }
    })
}
//    查看表中有多少条数据
function selectUserInfoCount(uid) {
    return Axios({
        method: 'get',
        url: '/userInfo/selectUserInfoCount',
        params: {
            uid
        }
    })
}
// 删除userInfo的API
function deleteByInfoId(infoId) {
    return Axios({
        method: 'get',
        url: '/userInfo/deleteByInfoId',
        params: {
            infoId,
        }
    })
}
export default {
    savePassword,
    selectLimitUserInfo,
    selectUserInfoCount,
    deleteByInfoId
}