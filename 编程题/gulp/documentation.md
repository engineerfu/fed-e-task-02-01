第一步：    
    安装gulp
    创建 gulpfile.js

第二步：
    声明 style 命令来处理 所有的样式文件
    安装转换流插件 gulp-sass

第三步：
    编译脚本文件
    安装 gulp-babel
    安装 @babel/core 
        @babel/preset-env

 第四步：
    模板文件的编译
    安装 gulp-swig 

 第五步：
    创建组合任务：
           compile  

 第六步：
    图片转换
    安装 gulp-imagemin

 第七步：
    处理public下面的文件
    添加 extra 命令

    自动清除dest下的文件：安装 del包  

    安装插件 gulp-load-plugins 替代require，自动的加载gulp的插件 

 第八步：
    热更新服务器
    安装 browser-sync  

 第九步：
    监视源代码变化 热更新   
    watch api
    思考哪些在开发环境不必去构建，提高开发效率

 第十步：
    处理node_modules文件
    借助 useref 插件   

 第十一步：
    对上一步js css html 文件变化产生的对应文件
    分别安装对应的压缩插件和判断当前是什么流的插件
    gulp-htmlmin  gulp-uglife  gulp-clean-css
    gulp-if

 第十二步：
    在package.json中配置 scripes
    在gitignore文件中忽略掉 dist temp
