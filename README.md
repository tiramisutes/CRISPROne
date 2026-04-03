# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## 如何使用和修改

### 1️⃣ 克隆项目

```bash
git clone https://github.com/ASL-mj/CRISPROne.git
cd CRISPROne
```

### 2️⃣ 安装依赖

根据项目中的 `package.json` 安装依赖：

```bash
npm install
```

如果没有安装 Node.js，需要先安装：
👉 Node.js（建议 ≥ 16）

---

### 3️⃣ 启动开发服务器

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

启动后终端会显示访问地址，例如：

```
http://localhost:3000
```

### 4️⃣ 生成 frontend 的 build 目录, 用于替换 Django 项目对应文件夹

```
npm run build
```