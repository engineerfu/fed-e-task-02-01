// 存放用户的变量文件
const {
    version
} = require('../package.json')
const downloadDirectory = `${process.env[process.platform ==='darwin' ? 'HOME' : 'USERPROFILE']}/.template`
module.exports = {
    version,
    downloadDirectory
}