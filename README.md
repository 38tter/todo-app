This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## アプリのセットアップ方法

 - プロジェクトのルートディレクトリにて `yarn && yarn start` または を実行。
 - http://localhost:3000/ をブラウザから開く。

## 基本機能

- フォームにタスクの内容を記述し、「add」でタスクを追加
- チェックボックスのクリックでタスクを完了
- セレクタの（All, Completed, Incomplete）で（全て/完了/未完了）の表示を切り替え

## 追加機能(タスク5, 6について)

Google カレンダーの予定を ToDo タスクとして取り込めるようにした。
「Google カレンダーから予定を取り込み」ボタンを押すと、Google アカウント のOAuth 認証を行い、Google カレンダーの全予定をタスクとして表示する。
（セキュリティ上 カレンダーの認証権限は read-only とした）
より発展的には、日時の表示、タスクの重要度の設定と、それに基づいたソートなども追加したい。

### 機能追加の理由について

タスク管理において ToDo リストとカレンダーの役割は重複しがちであり、一本化したいと考えたため。
どちらか一方へのみのタスクの登録による抜け漏れを防ぐためには、「カレンダーへの予定の登録」->「ToDoリストへのタスクの取り込み」という順序づけを行うことが必要であると考えた。
そこで ToDo リスト側でカレンダーから予定を取り込めるようにすることで、上記の手順でタスク管理を行えると考えた。

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
