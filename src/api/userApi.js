// 用户相关的 API 接口 都封装到这个模块中



import Axios from '../tool/http';


// // 根据 用户名 密码 查询数据库是否有账号
// export const Userlogin= function(accountNumber,upassword){
//   // 返回的是 Promise类型对象
//   return axios.post('/user/login',{
//     // headers: {
//     //   'Content-Type': 'application/json;charset=UTF-8'
//     // },
//     // 请求参数
//     params:{
//         accountNumber,
//         upassword
//     }
//   })
// }

function Userlogin (accountNumber,upassword){
  return Axios({
    method:'POST',
    url: '/user/login',
    params:{
      accountNumber,
      upassword
    }

  })
}

export default{
  Userlogin
}