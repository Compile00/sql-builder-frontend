import {updateUserSelf, userLogout} from '@/services/userService';
import { Link } from '@@/exports';
import {
  LogoutOutlined,
  ManOutlined,
  ProfileOutlined,
  UserOutlined,
  WomanOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {Avatar, Button, Dropdown, Form, Input, Menu, message, Modal, Select} from 'antd';
import classNames from 'classnames';
import { stringify } from 'querystring';
import React, {useState} from 'react';
import { history } from 'umi';
import styles from './index.less';



/**
 * 头像下拉菜单
 *
 * @constructor
 */
const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const loginUser = initialState?.loginUser;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const userGender = loginUser ? (() => {
    switch (loginUser.gender) {
      case 0:
        return '保密';
      case 1:
        return '男';
      case 2:
        return '女';
      default:
        return '未知';
    }
  })() : '未获取到用户';
  const onMenuClick = async (event: {
    key: React.Key;
    keyPath: React.Key[];
  }) => {
    const { key } = event;

    if (key === 'logout') {
      try {
        await userLogout();
        message.success('已退出登录');
      } catch (e: any) {
        message.error('操作失败');
      }
      // @ts-ignore
      await setInitialState({ ...initialState, loginUser: undefined });
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
      return;
    }else if (key === "profile") {
      // 显示用户信息修改表单逻辑
      message.info("修改个人信息");
      // 点击“修改个人信息
    }else if(key==="current"){
      //@ts-ignore
        message.success("用户昵称："+loginUser.userName ?? '无名');
    }else if (key==="gender"){
      message.success("性别: "+userGender);
    }
  };



  /**
   * 下拉菜单
   */
  const menuHeaderDropdown = loginUser ? (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="current" title={"用户昵称"} icon={<UserOutlined/> }>
        {loginUser.userName ?? '无名'}
      </Menu.Item>
      <Menu.Item key="gender" title={"性别"} icon={loginUser.gender === 1 ? <ManOutlined /> : loginUser.gender === 2 ? <WomanOutlined /> : <QuestionCircleOutlined/>}>
        {userGender}
      </Menu.Item>
      <Menu.Item key="profile"title={"点击修改信息"} onClick={() => {setIsModalVisible(true);}}>
        <ProfileOutlined />
        <span>修改个人信息</span>
      </Menu.Item>
      <Menu.Item key="logout" title={"点击退出登录"}>
        <span style={{ color: 'red' }}>
          <LogoutOutlined />
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  ) : (
    <></>
  );


  //处理传入的修改信息
  const handleUpdateUserInfo = async (values: UserType.UserUpdateRequest) => {

    const hide = message.loading('正在修改');

    //合并原来的用户id号和修改后的值
    const mergedValues = {
      ...values,
      // @ts-ignore
      id:loginUser.id,
    };

    try {
      await updateUserSelf(mergedValues);  //向后端发送请求数据
      hide();
      message.success('修改成功');
      setIsModalVisible(false);
      return true;
    } catch (error) {
      hide();
      message.error('修改失败');
      return false;
    }
  };


  return loginUser ? (
    <Dropdown
      overlayClassName={classNames(styles.container)}
      overlay={menuHeaderDropdown}
    >
      <div className={`${styles.action} ${styles.account}`}>
        <Avatar
            src={loginUser?.userAvatar}
            alt="avatar"
            size={32}
        >
          {loginUser.userName ? loginUser.userName[0] : '无'}
        </Avatar>

        <Modal
            title="修改个人信息"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => setIsModalVisible(false)}
        >
          <Form
              initialValues={{"userName": loginUser.userName, "userAvatar": loginUser.userAvatar, "gender": loginUser.gender }}
              onFinish={(values) => handleUpdateUserInfo(values)}
          >
            <Form.Item name="userName" label="用户昵称"
                       rules={[{ required: true, message: '请输入修改的昵称' }]}>
              <Input placeholder={"请输入修改的昵称"}/>

            </Form.Item>
            <Form.Item name="userAvatar" label="头像"
                       // rules={[{ required: true, message: '请输入图片链接' }]}
            >
              <Input placeholder={"请输入图片链接"}/>
            </Form.Item>

            <Form.Item name="gender" label="性别">
              <Select placeholder={"请选择"} >
                <Select.Option value="0">保密</Select.Option>
                <Select.Option value="1">男</Select.Option>
                <Select.Option value="2">女</Select.Option>
              </Select>
            </Form.Item>
            <Button htmlType="submit">提交</Button>
          </Form>
        </Modal>
      </div>
    </Dropdown>

  ) : (
    <>
      <Link to="/user/login">
        <Button type="primary" ghost style={{ marginRight: 16 }}>
          登录
        </Button>
      </Link>
    </>
  );
};

export default AvatarDropdown;
