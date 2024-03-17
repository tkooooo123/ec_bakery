# Bakery 電商網站
![Bakery](https://i.imgur.com/ObAlj8N.jpeg)
![商品頁面](https://i.imgur.com/3bEW24R.png)
![購物車頁面](https://i.imgur.com/KByTySc.png)
![後台頁面](https://i.imgur.com/pYaYwnw.png)
## Demo 連結
```
https://tkooooo123.github.io/ec_bakery/#/
```

## 網站功能
### 前台

1. 首頁：品牌形象 Banner、訂閱電子報
2. 商品：商品一覽、詳細資訊、搜尋關鍵字
3. 購物：加入購物車、訂單填寫、結帳
4. 使用者：帳號註冊、登入/登出、瀏覽訂單明細、編輯個人資料、修改密碼
5. 其他：品牌故事、常見問題、聯絡我們、404 頁面自動跳轉

### 後台

1. 管理者：登入/登出
2. 商品管理：商品上架、修改、刪除
3. 訂單管理：新增、修改、刪除訂單
4. 分類管理：新增、修改、刪除分類
5. 文章管理：新增、修改、刪除文章


### 管理者帳號
```
Email: root@example.com
Password: 12345678
```
### 使用者帳號
```
Email: user1@example.com
Password: 12345678
```
### 信用卡資料
```
卡號：4000 2211 1111 1111
到期日：任意未到期年月
驗證碼：任意3碼
```

## 使用工具
* node ^16.15.0
* react ^18.2.0
* react-router-dom ^6.17.0
* react-hook-form ^7.47.0
* react-redux ^9.1.0
* aos ^2.3.4
* axios ^1.5.1
* bootstrap ^5.3.2
* fslightbox-react ^1.7.6
* gsap ^3.12.4
* jquery ^3.7.1
* sass ^1.69.4
* sweetalert2 ^11.6.4
* swiper ^11.0.4


## 安裝流程
1. 開啟終端機，執行以下指令：
 ```
 $ git clone https://github.com/tkooooo123/ec_bakery.git
 ```
2. 進入專案資料夾:
```
 $ cd ec_bakery
```
3. 使用npm安裝套件
```
$ npm install
```
4. 新增.env檔案，設定環境變數
```
VITE_BASE_URL=https://lit-lowlands-54861.herokuapp.com/api/

```
5. 執行專案
```
$ npm run dev
```