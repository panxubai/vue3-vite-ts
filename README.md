# Vue 3 + TypeScript + Vite


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```


yarn run build:dev  测试环境 


yarn run build:prod 生产环境

```

### Lints and fixes files
```
yarn lint
```

### 配置主题色
```
yarn et

1.element-variables.scss里更改全局css
2.执行 yarn et

*注意 element-theme 依赖gulp为v3.9版本 所以本地node版本要求低于v12.x版本
```

### 文件结构目录
```
src/components
公共的UI组件 - 创建单独文件夹以提供的功能来命名

src/const
TS定义接口字段 - 以功能模块名称来命名

src/plugins
公共的插件组件 - 创建单独文件夹以提供的功能来命名

src/templates
模板类UI组件 - 以功能模块创建文件夹进行开发

src/utils
工具类文件夹 - 表单校验以及一些基础函数类封装

views/xxxx
主要业务文件 - 已功能模块创建文件夹 业务文件夹在此文件夹下：
如concern功能
views/concern
views/concern/business - concern模块 业务工单
views/concern/quality - concern模块 质量工单

*****
公共文件路径使用alias(别名)
业务文件可使用相对路径 ./

变化文件结构目录暂时,只需要更换router里对应的path字段即可
后端数据库里的path值不影响前端的router,待售后和服务管理端UAT后再同步后端数据库
只要项目文件结构和框架清晰，即使各个业务的代码写的很乱，项目整体还是能清清楚楚，如果项目文件结构不清晰，业务代码写的再整洁，还是让人摸不到头脑
*****

```
