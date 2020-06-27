import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-wallet-theos.herokuapp.com/',
    /* other custom settings */
});

module.exports = api;

// const URL_API = 'https://api-wallet-theos.herokuapp.com/';
//
// async function post(rota, params) {
//     const res = await axios.post(URL_API + rota, params.data, { headers: params.header } );
//     return res.data;
// }
//
// async function get(rota, params) {
//     console.log('aaa', URL_API + rota, params.data, { headers: params.header });
//     const res = await axios.get(URL_API + rota, { headers: params.header });
//     return res.data;
// }
//
// async function put(rota, params) {
//     const res = await axios.put(URL_API + rota + '/:' + params.id, params.data);
//     return res.data;
// }
//
// export default async function (rota, tipoRota,  ...params) {
//     try {
//         if (tipoRota === 'get') {
//             return await get(rota, ...params);
//         } else if (tipoRota === 'post') {
//             return await post(rota, ...params);
//         } else if (tipoRota === 'put') {
//             return await put(rota, ...params);
//         }
//
//     } catch (ex) {
//         if (ex.message === 'Network Error') {
//             console.log('Erro na Api - ', ex, ' - Rota - ', rota);
//         }
//         throw ex;
//     }
// };
