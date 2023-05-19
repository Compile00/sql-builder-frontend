import { defineConfig } from '@umijs/max';
import MonacoEditorWebpackPlugin from 'monaco-editor-webpack-plugin';
import routes from './src/configs/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  // @ts-ignore
  mock: false,
  routes,
  npmClient: 'yarn',
  // https://umijs.org/zh-CN/guide/boost-compile-speed#monaco-editor-%E7%BC%96%E8%BE%91%E5%99%A8%E6%89%93%E5%8C%85
  // @ts-ignore
  chainWebpack: (memo: any) => {
    // 更多配置 https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    memo.plugin('monaco-editor-webpack-plugin').use(MonacoEditorWebpackPlugin, [
      // 按需配置
      { languages: ['sql', 'json', 'java', 'typescript'] },
    ]);
    return memo;
  },
  
// 设置 links 配置即标签图像，href 是相对于 public 目录的路径
  links: [{ rel: 'icon', href: '/favicon.png' }],
});
