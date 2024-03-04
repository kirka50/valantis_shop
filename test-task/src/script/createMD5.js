import md5 from 'crypto-js/md5.js'

const password = 'Valantis'
function createMD5() {
    const date = new Date();
    const curDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    return md5(`${password}_${curDate}`)
}




export default createMD5()