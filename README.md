# How to a create Custom NPM Module for React Components?

Custom React component as a npm Module(Can be installed locally).

## Installation

**Step 1:** Make a directory and initialize npm.

```bash
  mkdir custom-npm-package
  npm init
```

Add the necessary fields. After the successfull walkthrough a package.json will created and looks like below.

```bash
{
  "name": "gittuts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

**Step 2:** Create a src folder in the root add a index.js/index.ts in it also create a component folder and creates some components in it.

```bash
src
├── components
│   ├── Component1
│   │   └── index.tsx
│   ├── Component2
│   │   └── index.tsx
│   └── Component3
│       └── index.tsx
└── index.ts
```

**Step 3:** Now, Add react and react-dom as peer-dependencies and dev-dependencies. 

```bash
  yarn add react react-dom --dev

  or

  npm install react react-dom --dev
```

The final package.json may looks like below.

```bash
  {
  "name": "custom-npm-package",
  "version": "1.0.0",
  "description": "react custom npm module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npx babel src --out-file index.js --extensions .ts,.tsx"
  },
  "author": "Anandhu",
  "license": "ISC",
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.34",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.4"
  }
}
```

Since it is Typescript. I've also installed typescript, typescript react with it.

**Step 7:** Its time to convert the code.

```bash
  // For Typescript
  npx babel src --out-file index.js --extensions .ts,.tsx

  // For Vanilla
  npx babel src --out-file index.js
```

To our package.json, let's add this as build command so that we won't have to type it repeatedly. Under "scripts" in package.json add the following.

```bash
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npx babel src --out-file index.js --extensions .ts,.tsx"
  }
```

now we can simply use "npm run build" or "yarn build" to convert the code.

If it compiled without any error you may see an "index.js" file will be generated in the root folder.

![App Screenshot](https://raw.githubusercontent.com/ananduremanan/Demo/demo_files/eg_1.png)

The npx babel command we're using will not work out of the box for TypeScript files. The reason is that TypeScript files need to be transpiled by the TypeScript compiler before they can be transformed by Babel.

To transpile TypeScript files before transforming them with Babel, we can use the @babel/preset-typescript preset.

```bash
npm install --save-dev @babel/cli @babel/preset-typescript
```

Note: that if you're using a build tool like Webpack, you may not need to use npx babel at all. Instead, you can use a TypeScript loader like ts-loader or awesome-typescript-loader that will transpile and transform your TypeScript files as part of the build process.

**Step 8:** Lets pack it so we can use it in other projects. Run the following command from  the root folder.

```bash
  npm pack
```
This will generate a .tgz file that we can use to install the package locally in other projects.

**Step 9:** Navigate to your other project's directory and install your package using npm install <path to tarball file>. For example:

```bash
  npm install ../my-react-input-component/my-react-input-component-1.0.0.tgz
```

**Step 10:** In your other project's code (Check the branch "hostApp" of this repo for sample code), you can import and use your component as follows:

```bash
  import logo from "./logo.svg";
  import "./App.css";
  import TextInput from "srp2";
  import { useState } from "react";

  function App() {
    const [value, setValue] = useState('');
    console.log(value)

    function handleChange(e) {
      setValue(e.target.value);
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Custom npm module.</p>
          <TextInput label="Name" value={value} onChange={handleChange} />
        </header>
      </div>
    );
  }

  export default App;

```

Final output may look like below.

![App Screenshot](https://raw.githubusercontent.com/ananduremanan/Demo/demo_files/eg_2.png)


## Acknowledgements

 - This Repo is inspired by [Manoj Singh Negi's](https://medium.com/recraftrelic/building-a-react-component-as-a-npm-module-18308d4ccde9) Medium blog.

