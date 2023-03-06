/**
 * 按照初始化数据定义项目中的权限，统一管理
 * 参考文档 https://next.umijs.org/docs/max/access
 * @param initialState
 */
export default (initialState: InitialState) => {
  const canUser = !!initialState.loginUser;
  const canAdmin =
    initialState.loginUser && initialState.loginUser.userRole === 'admin';  //当角色和用户名都对上时就登录到管理界面
  return {
    canUser,
    canAdmin,
  };
};
