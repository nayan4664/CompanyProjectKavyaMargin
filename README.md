# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Troubleshooting

### MongoDB Database Case-Sensitivity Error
If you or your teammates encounter the error: 
`db already exists with different case already have: [kavyaMargin] trying to create [kavyamargin]`

This happens because MongoDB database names are **case-sensitive** on certain operating systems (like Windows). If a database named `kavyaMargin` (with a capital M) already exists on the local machine, MongoDB will not allow the creation of `kavyamargin` (all lowercase).

**How to Resolve:**
1.  Open your local `.env` file in the `server/` folder.
2.  Update the `MONGO_URI` to match the case of the existing database. Change:
    `MONGO_URI=mongodb://127.0.0.1:27017/kavyamargin`
    to
    `MONGO_URI=mongodb://127.0.0.1:27017/kavyaMargin`
3.  Alternatively, you can delete the `kavyaMargin` database using MongoDB Compass or the Mongo shell if you don't need the old data, and then the lowercase version will work.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


readme file update