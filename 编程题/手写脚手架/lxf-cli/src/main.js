// 获取版本号
const {version} = require('./constants')
const program = require('commander');
const path = require('path');
// 配置三个命令
const mapActions = {
    create:{
        alias:'c',
        description:'create a project',
        examples:[
            'lxf-cli create <project-name>'
        ],
    },
    config:{
        alias:'conf',
        description:'config project variable',
        examples:[
            'lxf-cli config set <k><v>',
            'lxf-cli config get <k>'
        ]
    },
    '*':{
        alias:'',
        description:'command not found',
        examples:[]
    }
}
// 循环创建命令
// console.log(Reflect.ownKeys(mapActions))
Reflect.ownKeys(mapActions).forEach(action => {
    program.command(action) // 配置命令的名称
    .alias(mapActions[action].alias) // 命令的别名
    .description(mapActions[action].description) // 命令对应的描述
    .action(() => {
        if(action === "*"){
            // 访问不到我们的命令
            console.log(mapActions[action].description)
        }else{
            // console.log(action)
            // 截取命令
            // lxf-cli create proname
            require(path.resolve(__dirname,action))(...process.argv.slice(3))
        }
    })
})
// 监听用户的help事件
program.on('--help',() => {
    console.log('\nExamples:')
    Reflect.ownKeys(mapActions).forEach(action => {
        mapActions[action].examples.forEach(example => {
            console.log(example)
        })
    })
})

// process.argv 返回用户在命令行中传入的参数
program.version(version).parse(process.argv);

