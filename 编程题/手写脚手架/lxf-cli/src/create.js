const axios = require('axios')
const ora = require('ora')
const Inquirer = require('inquirer')

const {downloadDirectory} = require('./constants.js')
const { promisify } = require('util')
let downloadGitRepo = require('download-git-repo');
downloadGitRepo = promisify(downloadGitRepo);

let ncp = require('ncp')
ncp = promisify(ncp);
const path = require('path')
// 获取仓库模板信息
const fetchRepoList = async () => {
    // 组织地址后面加上 repos
    const {data} = await axios.get("https://api.github.com/orgs/writeScaffold/repos")
    return data;
}
// 封装loading
const waitFnloading = (fn,message) => async (...args) => {
    const spinner = ora(message);
    spinner.start(); //开始loading
    let repos = await fn(...args);
    spinner.succeed(); //结束加载loading
    return repos;
}
// 出去tag列表
const fetchTagList = async (repo) => {
    const {data} = await axios.get(`https://api.github.com/repos/writeScaffold/${repo}/tags`)
    return data
}
// git 下载项目
const download = async(repo,tag) => {
    let api = `writeScaffold/${repo}`
    if(tag){
        api += `#${tag}`
    }
    console.log(api)
    const dest = `${downloadDirectory}/${repo}`
    console.log(dest)
    await downloadGitRepo(api,dest)
    
    return dest;
}
module.exports = async (proname) => {
    // 获取项目模板
    let repos = await waitFnloading(fetchRepoList,'fetching template....')();
    
    repos = repos.map(item => item.name);

    const {repo} = await Inquirer.prompt({
        name:"repo", //选择后的结果
        type:"list", //什么方式展现
        message:"please choise a template to create project", //提示信息
        choices: repos, // 选择的数据
    })

    // 获取对应的版本号
    let tags = await waitFnloading(fetchTagList,'fetching tags....')(repo);
    tags = tags.map(item => item.name);
    
    // 选择版本号
    const {tag} = await Inquirer.prompt({
        name:"tag", //选择后的结果
        type:"list", //什么方式展现
        message:"please choise a tag", //提示信息
        choices: tags, // 选择的数据
    })
    
    // 下载项目 返回一个临时的存放目录
    const result = await waitFnloading(download,'down load....')(repo,tag);
    await ncp(result,path.resolve(proname));
}   