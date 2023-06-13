import Axios from '../tool/http';


function saveDiary(did, uid, dtitle, diary) {
    return Axios({
        method: 'post',
        url: '/diary/saveDiaryAndUpdate',
        params: {
            did,
            uid,
            dtitle,
            diary
        }

    })
}
// 日记的分页查询
function selectByUidLimit(object, pageBegin, pageCount) {
    return Axios({
        method: 'get',
        url: '/diary/selectByUidLimit',
        params: {
            object,
            pageBegin,
            pageCount
        }
    })
}
// 删除日志
function deleteByUid(did) {
    return Axios({
        method: 'get',
        url: '/diary/deleteByUid',
        params: {
            did,
        }
    })
}
// 查看数据条数
function countDiary(uid) {
    return Axios({
        method: 'get',
        url: `/diary/countDiary/${uid}`,
    })
}

export default {
    saveDiary,
    selectByUidLimit,
    deleteByUid,
    countDiary

}