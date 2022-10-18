import Mock from 'mockjs'

export default [
  {
    url: '/user/getCode',
    type: 'get',
    response: () => {
      return {
        status: 0,
        data: Mock.Random.image('90X40'),
        msg: null
      }
    }
  },
  {
    url: '/user/login',
    type: 'post',
    response: (req) => {
      if ((req.body.username !== 'admin') && (req.body.username !== 'test')) {
        return {
          status: 1,
          data: null,
          msg: '账号或密码错误'
        }
      }

      return {
        status: 0,
        data: {
          token: req.body.username
        },
        msg: null
      }
    }
  },
  {
    url: '/user/userInfo',
    type: 'get',
    response: () => {
      return {
        status: 0,
        data: {
          username: 'admin',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
        },
        msg: null
      }
    }
  },
  {
    url: '/user/menuList',
    type: 'get',
    response: ({ headers }) => {
      if (headers.cookie.includes('AUTHORIZATION=admin')) {

      }
      return {
        status: 0,
        data: [
          {
            id: 1,
            name: '首页',
            menuIcon: 'HomeOutlined',
            menuUrl: '/home',
            value: 'Home',
            button:[
              {
                id:2,
                name:'导出',
                value:'export'
              },
              {
                id:3,
                name:'分配',
                value:'allocation'
              },
            ]
          }
        ],
        msg: null
      }
    }
  }
]
