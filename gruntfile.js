module.exports = function(grunt){

  grunt.initConfig({

    //监听文件变动，自动重新生成
    watch: {
      jade: {
        files: ['views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/js/**', 'models/**/*.js', 'schemas/**/*/js'],
        //tasks: ['jshint'],   //语法检查
        options: {
          livereload: true   //当文件有改动，重新启动服务
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['./'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    //默认任务
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })


  grunt.loadNpmTasks('grunt-contrib-watch');  //只要有文件进行添加修改删除，它就会去重新执行注册好的任务
  grunt.loadNpmTasks('grunt-nodemon');  //实时监听app.js，如果有改动就自动重启app.js
  grunt.loadNpmTasks('grunt-concurrent');  //针对慢任务开发的插件，编译像sass/less，优化他们构架的时间

  grunt.option('force', true);  //开发阶段为了便于不让部分语法错误、警告等中断整个Grunt服务
  grunt.registerTask('default', ['concurrent']);  //注册默认任务
}
