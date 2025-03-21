// src/services/i18n/translations/ja.js
export default {
  common: {
    languages: {
      en: "英語",
      ja: "日本語",
      zh: "中国語",
    },
    actions: {
      save: "保存",
      cancel: "キャンセル",
      confirm: "確認",
      delete: "削除",
      edit: "編集",
      view: "表示",
      back: "戻る",
      next: "次へ",
      submit: "送信",
    },
    status: {
      loading: "読み込み中...",
      success: "成功",
      error: "エラー",
      pending: "保留中",
      completed: "完了",
      confirmed: "確認済み",
      cancelled: "キャンセル済み",
    },
    validation: {
      required: "このフィールドは必須です",
      invalidEmail: "有効なメールアドレスを入力してください",
      invalidPhone: "有効な電話番号を入力してください",
      minLength: "{{count}}文字以上である必要があります",
      maxLength: "{{count}}文字以下である必要があります",
      passwordMatch: "パスワードが一致しません",
      invalidInput: "無効な入力",
    },
  },
  auth: {
    login: {
      title: "ログイン",
      phoneNumber: "電話番号",
      password: "パスワード",
      loginButton: "ログイン",
      loggingIn: "ログイン中...",
      noAccount: "アカウントがありませんか？登録する",
      customer: "お客様",
      merchant: "店舗",
      forgotPassword: "パスワードをお忘れですか？",
    },
    signup: {
      title: "新規登録",
      name: "氏名",
      email: "メールアドレス",
      phoneNumber: "電話番号",
      password: "パスワード",
      confirmPassword: "パスワード（確認）",
      signupButton: "登録",
      haveAccount: "すでにアカウントをお持ちですか？ログイン",
    },
    validation: {
      phoneRequired: "電話番号が必要です",
      phoneDigitsOnly: "電話番号は数字のみを含む必要があります",
      passwordRequired: "パスワードが必要です",
      passwordMinLength: "パスワードは6文字以上である必要があります",
      nameRequired: "名前が必要です",
      emailRequired: "メールアドレスが必要です",
    },
    errors: {
      invalidCredentials: "無効な認証情報",
      networkError: "ネットワークエラー、もう一度お試しください",
      unknownError: "不明なエラーが発生しました",
    },
  },
  restaurant: {
    list: {
      title: "レストラン",
      search: "レストランを検索...",
      filter: "フィルター",
      sort: "並び替え",
      noResults: "レストランが見つかりません",
      open: "営業中",
      closed: "閉店",
    },
    detail: {
      menu: "メニュー",
      reviews: "レビュー",
      info: "情報",
      photos: "写真",
      address: "住所",
      hours: "営業時間",
      phone: "電話番号",
      website: "ウェブサイト",
      reserve: "予約する",
      directions: "道順を見る",
    },
    filters: {
      price: "価格",
      cuisine: "料理ジャンル",
      distance: "距離",
      rating: "評価",
      openNow: "営業中",
    },
    menu: {
      starters: "前菜",
      mainCourse: "メインコース",
      desserts: "デザート",
      drinks: "ドリンク",
      specials: "おすすめ",
      popular: "人気商品",
    },
    reviews: {
      write: "レビューを書く",
      rating: "評価",
      comment: "コメント",
      submit: "レビューを送信",
      helpful: "役に立った",
      report: "報告する",
    },
  },
  reservations: {
    new: {
      title: "新規予約",
      date: "日付",
      time: "時間",
      party: "人数",
      notes: "特別リクエスト",
      confirm: "予約を確定",
      termsAgree: "予約規約に同意します",
    },
    list: {
      title: "予約一覧",
      upcoming: "今後の予約",
      past: "過去の予約",
      cancelled: "キャンセル済み",
      noUpcoming: "今後の予約はありません",
      noPast: "過去の予約はありません",
    },
    details: {
      title: "予約詳細",
      restaurant: "レストラン",
      date: "日付",
      time: "時間",
      party: "人数",
      status: "ステータス",
      notes: "特別リクエスト",
      cancel: "予約をキャンセル",
      modify: "予約を変更",
      directions: "道順を見る",
      contact: "レストランに連絡",
    },
    status: {
      confirmed: "確認済み",
      pending: "保留中",
      cancelled: "キャンセル済み",
      completed: "完了",
      noShow: "無断キャンセル",
    },
    cancel: {
      title: "予約のキャンセル",
      confirm: "この予約をキャンセルしてもよろしいですか？",
      reason: "キャンセルの理由",
      policy: "キャンセルポリシー",
      submit: "キャンセルを送信",
    },
  },
  merchant: {
    dashboard: {
      title: "ダッシュボード",
      overview: "概要",
      today: "今日",
      reservations: "予約",
      tables: "テーブル",
      seating: "座席表示",
      revenue: "売上",
      customers: "顧客",
    },
    tables: {
      title: "テーブル管理",
      tableNumber: "テーブル番号",
      capacity: "収容人数",
      status: "状態",
      empty: "空席",
      occupied: "使用中",
      reserved: "予約済み",
      addTable: "テーブルを追加",
      editTable: "テーブルを編集",
      deleteTable: "テーブルを削除",
    },
    reservations: {
      title: "予約",
      calendar: "カレンダー表示",
      list: "リスト表示",
      grid: "グリッド表示",
      smart: "スマート表示",
      mailbox: "受信箱",
      new: "新規予約",
      noReservations: "予約が見つかりません",
    },
    settings: {
      title: "設定",
      profile: "レストランプロフィール",
      hours: "営業時間",
      menu: "メニュー管理",
      staff: "スタッフ管理",
      notifications: "通知",
      payment: "支払い方法",
      seating: "座席レイアウト",
      account: "アカウント設定",
    },
  },
  settings: {
    title: "設定",
    account: {
      title: "アカウント設定",
      name: "名前",
      email: "メール",
      phone: "電話番号",
      password: "パスワード変更",
      language: "言語",
      notifications: "通知",
      logout: "ログアウト",
    },
    appearance: {
      title: "外観",
      theme: "テーマ",
      light: "ライト",
      dark: "ダーク",
      system: "システムデフォルト",
      fontSize: "フォントサイズ",
    },
    notifications: {
      title: "通知",
      push: "プッシュ通知",
      email: "メール通知",
      sms: "SMS通知",
      reservations: "予約アップデート",
      promotions: "プロモーションとオファー",
      system: "システムアップデート",
    },
    privacy: {
      title: "プライバシー",
      dataUsage: "データ使用",
      location: "位置情報サービス",
      cookies: "クッキー",
      advertising: "パーソナライズド広告",
    },
    help: {
      title: "ヘルプ＆サポート",
      faq: "よくある質問",
      contact: "サポートに連絡",
      terms: "利用規約",
      privacy: "プライバシーポリシー",
      about: "SeatMasterについて",
    },
  },
};
