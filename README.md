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
```

### 文件结构目录
```
pages/xxxx
主要业务文件 - 已功能模块创建文件夹 业务文件夹在此文件夹下：
src/components
子组件命名按照pages文件命名
src/type
TS定义接口字段 - 以pages文件名称来命名

src/plugins
公共的插件组件 - 创建单独文件夹以提供的功能来命名

src/utils
工具类文件夹 - 基础函数类封装



*****
公共文件路径使用alias(别名)
业务文件可使用相对路径 ./

*****

```
