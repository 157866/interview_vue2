import axios from 'axios';
// 创建实例时配置默认值
const Axios = axios.create({
  baseURL: 'http://localhost:8080/',
 
});



export default Axios