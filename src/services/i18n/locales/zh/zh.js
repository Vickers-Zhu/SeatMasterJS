// src/services/i18n/translations/zh.js
export default {
  common: {
    languages: {
      en: "英文",
      ja: "日文",
      zh: "中文",
    },
    actions: {
      save: "保存",
      cancel: "取消",
      confirm: "确认",
      delete: "删除",
      edit: "编辑",
      view: "查看",
      back: "返回",
      next: "下一步",
      submit: "提交",
    },
    status: {
      loading: "加载中...",
      success: "成功",
      error: "错误",
      pending: "待处理",
      completed: "已完成",
      confirmed: "已确认",
      cancelled: "已取消",
    },
    validation: {
      required: "此字段为必填项",
      invalidEmail: "请输入有效的电子邮件地址",
      invalidPhone: "请输入有效的电话号码",
      minLength: "必须至少有{{count}}个字符",
      maxLength: "必须最多有{{count}}个字符",
      passwordMatch: "密码不匹配",
      invalidInput: "无效输入",
    },
  },
  auth: {
    login: {
      title: "登录",
      phoneNumber: "电话号码",
      password: "密码",
      loginButton: "登录",
      loggingIn: "正在登录...",
      noAccount: "没有账户？注册",
      customer: "顾客",
      merchant: "商家",
      forgotPassword: "忘记密码？",
    },
    signup: {
      title: "注册",
      name: "姓名",
      email: "电子邮件",
      phoneNumber: "电话号码",
      password: "密码",
      confirmPassword: "确认密码",
      signupButton: "注册",
      haveAccount: "已有账户？登录",
    },
    validation: {
      phoneRequired: "电话号码为必填项",
      phoneDigitsOnly: "电话号码只能包含数字",
      passwordRequired: "密码为必填项",
      passwordMinLength: "密码必须至少6个字符",
      nameRequired: "姓名为必填项",
      emailRequired: "电子邮件为必填项",
    },
    errors: {
      invalidCredentials: "无效的凭据",
      networkError: "网络错误，请重试",
      unknownError: "发生未知错误",
    },
  },
  restaurant: {
    list: {
      title: "餐厅",
      search: "搜索餐厅...",
      filter: "筛选",
      sort: "排序",
      noResults: "未找到餐厅",
      open: "营业中",
      closed: "已关闭",
    },
    detail: {
      menu: "菜单",
      reviews: "评价",
      info: "信息",
      photos: "照片",
      address: "地址",
      hours: "营业时间",
      phone: "电话",
      website: "网站",
      reserve: "预订",
      directions: "获取路线",
    },
    filters: {
      price: "价格",
      cuisine: "菜系",
      distance: "距离",
      rating: "评分",
      openNow: "营业中",
    },
    menu: {
      starters: "前菜",
      mainCourse: "主菜",
      desserts: "甜点",
      drinks: "饮品",
      specials: "特色菜",
      popular: "热门菜品",
    },
    reviews: {
      write: "写评价",
      rating: "评分",
      comment: "评论",
      submit: "提交评价",
      helpful: "有帮助",
      report: "举报",
    },
  },
  reservations: {
    new: {
      title: "新预订",
      date: "日期",
      time: "时间",
      party: "人数",
      notes: "特殊要求",
      confirm: "确认预订",
      termsAgree: "我同意预订条款和条件",
    },
    list: {
      title: "我的预订",
      upcoming: "即将到来",
      past: "过去的",
      cancelled: "已取消",
      noUpcoming: "没有即将到来的预订",
      noPast: "没有过去的预订",
    },
    details: {
      title: "预订详情",
      restaurant: "餐厅",
      date: "日期",
      time: "时间",
      party: "人数",
      status: "状态",
      notes: "特殊要求",
      cancel: "取消预订",
      modify: "修改预订",
      directions: "获取路线",
      contact: "联系餐厅",
    },
    status: {
      confirmed: "已确认",
      pending: "待确认",
      cancelled: "已取消",
      completed: "已完成",
      noShow: "未到场",
    },
    cancel: {
      title: "取消预订",
      confirm: "您确定要取消此预订吗？",
      reason: "取消原因",
      policy: "取消政策",
      submit: "提交取消",
    },
  },
  merchant: {
    dashboard: {
      title: "仪表板",
      overview: "概览",
      today: "今天",
      reservations: "预订",
      tables: "餐桌",
      seating: "座位视图",
      revenue: "收入",
      customers: "顾客",
    },
    tables: {
      title: "餐桌管理",
      tableNumber: "餐桌号",
      capacity: "容量",
      status: "状态",
      empty: "空闲",
      occupied: "已占用",
      reserved: "已预订",
      addTable: "添加餐桌",
      editTable: "编辑餐桌",
      deleteTable: "删除餐桌",
    },
    reservations: {
      title: "预订",
      calendar: "日历视图",
      list: "列表视图",
      grid: "网格视图",
      smart: "智能视图",
      mailbox: "收件箱",
      new: "新预订",
      noReservations: "未找到预订",
    },
    settings: {
      title: "设置",
      profile: "餐厅档案",
      hours: "营业时间",
      menu: "菜单管理",
      staff: "员工管理",
      notifications: "通知",
      payment: "支付方式",
      seating: "座位布局",
      account: "账户设置",
    },
  },
  settings: {
    title: "设置",
    account: {
      title: "账户设置",
      name: "姓名",
      email: "电子邮件",
      phone: "电话号码",
      password: "更改密码",
      language: "语言",
      notifications: "通知",
      logout: "退出登录",
    },
    appearance: {
      title: "外观",
      theme: "主题",
      light: "浅色",
      dark: "深色",
      system: "系统默认",
      fontSize: "字体大小",
    },
    notifications: {
      title: "通知",
      push: "推送通知",
      email: "电子邮件通知",
      sms: "短信通知",
      reservations: "预订更新",
      promotions: "促销和优惠",
      system: "系统更新",
    },
    privacy: {
      title: "隐私",
      dataUsage: "数据使用",
      location: "位置服务",
      cookies: "cookies",
      advertising: "个性化广告",
    },
    help: {
      title: "帮助与支持",
      faq: "常见问题",
      contact: "联系支持",
      terms: "服务条款",
      privacy: "隐私政策",
      about: "关于SeatMaster",
    },
  },
};
