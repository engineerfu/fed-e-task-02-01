// 实现这个项目的构建任务
const del = require('del')
const browerSync = require('browser-sync');

// 开发服务器
const bs = browerSync.create();


const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

const { src, dest, parallel, series, watch} = require('gulp')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')

const data = {
    pkg: {
        name: 'lxf happy build',
        description: 'i am sorry'
    },
    item: 'a b c d lalalala'
}

const clean = () => {
    return del(['dist','temp'])
}

const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(sass({ outputStyle: 'expanded' }))  //会忽略掉下划线开头的文件   {outputStyle:'expanded'} 使编译后的css格式完全展开
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))
}

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))
}

const page = () => {
    return src('src/*.html', { base: 'src' })
        .pipe(plugins.swig({ data }))
        .pipe(dest('temp'))
        .pipe(bs.reload({stream:true}))
}

const image = () => {
    return src('src/assets/images/**',{base:'src'})
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const font = () => {
    return src('src/assets/fonts/**',{base:'src'})
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
    return src('public/**',{base:'public'})
    .pipe(dest('dist'))
}

const serve = () => {
    watch('src/assets/styles/*.scss',style)
    watch('src/assets/scripts/*.js',script)
    watch('src/*.html',page)
    // watch('src/assets/images/**',image)
    // watch('src/assets/fonts/**',font)
    // watch('public/**',extra)

    //文件变化自动更新浏览器
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ],bs.reload)

    bs.init({
        notify:false,
        // port:2080,
        open:false,
        // files:'dist',
        server:{
            baseDir:['temp','src','public'],
            routes:{
                '/node_modules':'node_modules'
            }
        }
    })
}

const useref = () => {
    return src('temp/*.html', {base:'temp'})
    .pipe(plugins.useref({
        searchPath:['temp','.']
    }))
    // 对文件进行压缩
    .pipe(plugins.if(/\.js$/,plugin.uglify()))
    .pipe(plugins.if(/\.css$/,plugin.cleanCss()))
    .pipe(plugins.if(/\.html$/,plugin.htmlmin(
    {
        collapseWhitespace:true,
        minifiCss:true,
        minifiJs:true,
    })))
    .pipe(dest('release'))
}
const compile = parallel(style,script,page)

const build = series(
    clean, 
    parallel(series(compile,useref), image, font, extra))

const develop = series(compile,serve)

module.exports = {
    clean,
    build,
    develop,
}