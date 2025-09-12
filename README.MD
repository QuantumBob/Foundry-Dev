# Foundry VTT VSCode Dev Setup
Basic steps to set up Foundry VTT with VSCode

## Kill server
npx kill-port 30000

## symbolic links
mklink /D link target
mklink /D "F:\RPG\Foundry\Foundry-Data\FVTT-Dev-Data\Data\systems" "F:\RPG\Foundry\Foundry-Dev\systems"
mklink "F:\RPG\Foundry\Foundry-Dev\systems\rwk-rmc\foundry\tsconfig.json" "F:\RPG\Foundry\FoundryVTT-13\tsconfig.json"

mklink /D "C:\FoundryVTT\Data\systems\test-system" "C:\Foundry Dev\systems\test-system"
mklink /D "C:\FoundryVTT\Data\systems\rwk-rmc" "C:\Foundry Dev\systems\rwk-rmc"

mklink /D "C:\Foundry Dev\foundry\client" "C:\Foundry VTT 13\client"
mklink /D "C:\Foundry Dev\foundry\common" "C:\Foundry VTT 13\common"
mklink /D "C:\Foundry Dev\foundry\lang" "C:\Foundry VTT 13\public\lang"
mklink  "C:\Foundry Dev\foundry\tsconfig.json" "C:\Foundry VTT 13\tsconfig.json"

## install typescript and sass
npm install --save-dev typescript sass copyfiles

## install linter
npm install --save-dev eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier

## install typescript all in one
npm install --save-dev typescript sass copyfiles eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier fvtt-types@github:League-of-Foundry-Developers/foundry-vtt-types#main

## install javascript all in one
npm install --save-dev sass copyfiles eslint prettier eslint-config-prettier eslint-plugin-prettier fvtt-types@github:League-of-Foundry-Developers/foundry-vtt-types#main

## install fvtt types v13
npm add -D fvtt-types@github:League-of-Foundry-Developers/foundry-vtt-types#main

## install fvtt types other versions
npm add --save-dev fvtt-types@npm:@league-of-foundry-developers/foundry-vtt-types

## package.json

{
  "name": "test-system",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "sass": "sass --no-source-map src/scss:dist/css",
    "sass:watch": "sass --no-source-map --watch src/scss:dist/css",
    "build tsc and sass": "tsc && sass --no-source-map src/scss:dist/css",
    "watch tsc and sass": "tsc --watch && sass --no-source-map --watch src/scss:dist/css",
	"lint": "eslint . --ext .ts,.tsx, .mts"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^8.42.0",
    "@typescript-eslint/parser": "^8.42.0",
    "eslint": "^9.35.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.5.4",
    "fvtt-types": "github:League-of-Foundry-Developers/foundry-vtt-types#main",
    "prettier": "^3.6.2",
    "sass": "^1.92.1",
    "typescript": "^5.9.2"
  }
}
## tsconfig.json
```
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "esnext",
    "types": [
      "fvtt-types"
    ],
    "sourceMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "auto",
    "skipLibCheck": true,
  },
  "include": [
    "./src/**/*"
  ],
  "exclude": [
    "node_modules",
    "./src/scss/*"
  ]
}
```
## eslintrc.json

{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "rules": {
        // Add or override rules here
        "semi": [
            "error",
            "always"
        ],
        "quotes": [
            "error",
            "double"
        ]
    }
}


## Steps from ChatGPT to try

create package.json
npm init -y

install typescript
npm install --save-dev typescript

install css/scss compiler
npm install --save-dev sass

install copy file utility
npm install --save-dev copyfiles

install JSON editor cli
npm install --save-dev json

all in one
npm install --save-dev typescript sass copyfiles json

add github cli
# macOS
brew install gh

# Windows (scoop)
scoop install gh

# Linux (Debian/Ubuntu)
sudo apt install gh

install linter
npm install --save-dev eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier


add build and utility scripts to package.json
{
  "name": "my-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "clean": "rm -rf dist release",
//    "build": "npm run clean && npm run build:ts && npm run build:css && npm run copy",
    "build:ts": "tsc",
    "build:css": "sass src/styles:dist/styles",
    "copy": "copyfiles -u 1 src/**/*.{json,html,png,jpg,jpeg,svg} dist",
  //  "watch": "tsc --watch & sass --watch src/styles:dist/styles & copyfiles -u 1 src/**/*.{json,html,png,jpg,jpeg,svg} dist -w",
    "version:sync": "json -I -f src/system.json -e \"this.version=require('./package.json').version\"",
 //   "release": "npm run version:sync && npm run build && mkdir -p release && cd dist && zip -r ../release/my-system-v$(node -p \"require('../package.json').version\").zip ."
  "build": "tsc && sass src:dist --no-source-map",
  "watch": "concurrently \"tsc -w\" \"sass --watch src:dist\"",
  "release": "npm run build && zip -r ../rwk-rmc.zip dist"
  "build": "tsc && sass src:dist --no-source-map && npm run lint",
  "watch": "concurrently \"tsc -w\" \"sass --watch src:dist\" \"npm run lint -- --watch\"",
  "lint": "eslint \"src/**/*.{ts,mts}\"",
  "release": "npm run build && zip -r ../rwk-rmc.zip dist"
  },
  "devDependencies": {
    "copyfiles": "^2.4.1",
    "json": "^11.0.0",
    "sass": "^1.77.0",
    "typescript": "^5.4.0",
	"concurrently": "^8.0.0"
  }
}

this version of package.json has the github support
{
  "name": "my-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "clean": "rm -rf dist release",
    "build": "npm run clean && npm run build:ts && npm run build:css && npm run copy",
    "build:ts": "tsc",
    "build:css": "sass src/styles:dist/styles",
    "copy": "copyfiles -u 1 src/**/*.{json,html,png,jpg,jpeg,svg} dist",
    "watch": "tsc --watch & sass --watch src/styles:dist/styles & copyfiles -u 1 src/**/*.{json,html,png,jpg,jpeg,svg} dist -w",
    "version:sync": "json -I -f src/system.json -e \"this.version=require('./package.json').version\"",
    "zip": "mkdir -p release && cd dist && zip -r ../release/my-system-v$(node -p \"require('../package.json').version\").zip .",
    "release": "npm run version:sync && npm run build && npm run zip && npm run github:release",
    "github:release": "gh release create v$(node -p \"require('./package.json').version\") release/my-system-v$(node -p \"require('./package.json').version\").zip --title \"My System v$(node -p \"require('./package.json').version\")\" --notes \"Automated release of version $(node -p \"require('./package.json').version\")\""
  },
  "devDependencies": {
    "copyfiles": "^2.4.1",
    "json": "^11.0.0",
    "sass": "^1.77.0",
    "typescript": "^5.4.0"
  }
}

create tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
{
  "extends": "./tsconfig.json", 
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2022",
    "sourceMap": true,
    "paths": {
      "@client/*": ["./foundry/client/*"],
      "@common/*": ["./foundry/common/*"]
    }
  },
  "include": [
    "src/**/*",
    "rwk-rms.mts",
    "foundry/client/**/*.mts",
    "foundry/common/**/*.mts"
  ],
  "exclude": ["node_modules", "dist"]
}

install typescript, sass extensions in vscode
Sass (syler.sass-indented) → syntax highlighting for .scss
eslint (dbaeumer.vscode-eslint) → keeps typescript clean (optional, but useful)
github pull requests and issues (github.vscode-pull-request-github) → integrates with your GH releases/tags
debugger for chrome/edge (ms-vscode.js-debug-nightly is the newer one, built-in in recent vscode)

add launch.json to vscode
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Debug Foundry VTT",
      "runtimeExecutable": "electron",
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ],
      "cwd": "/absolute/path/to/FoundryVTT/resources/app",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true,
      "protocol": "inspector"
    },
    {
      "type": "pwa-chrome",
      "request": "attach",
      "name": "Attach to Foundry VTT (already running)",
      "port": 9222,
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Foundry VTT",
      "type": "pwa-chrome",
      "request": "launch",
      "runtimeExecutable": "C:/path/to/foundryvtt13/FoundryVTT.exe",
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ],
      "url": "http://localhost:30000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Foundry VTT",
      "type": "pwa-chrome",
      "request": "launch",
      "runtimeExecutable": "C:/absolute/path/to/foundryvtt13/FoundryVTT.exe",
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ],
      "url": "http://localhost:30000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true,
      "preLaunchTask": "Build"
    }
  ]
}
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Foundry VTT with Watch",
      "type": "pwa-chrome",
      "request": "launch",
      "runtimeExecutable": "C:/absolute/path/to/foundryvtt13/FoundryVTT.exe",
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ],
      "url": "http://localhost:30000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true,
      "preLaunchTask": "PreLaunch"
    }
  ]
}
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Foundry VTT with Watch",
      "type": "pwa-chrome",
      "request": "launch",
      "runtimeExecutable": "C:/absolute/path/to/foundryvtt13/FoundryVTT.exe",
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ],
      "url": "http://localhost:30000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true,
      "preLaunchTask": "PreLaunch"
    }
  ]
}


add a tasks.json file to vscode
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build System",
      "type": "npm",
      "script": "build",
      "group": "build",
      "problemMatcher": []
    },
    {
      "label": "Watch System",
      "type": "npm",
      "script": "watch",
      "isBackground": true,
      "problemMatcher": []
    },
    {
      "label": "Release System",
      "type": "npm",
      "script": "release",
      "group": "none",
      "problemMatcher": []
    }
  ]
}
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build",
      "type": "npm",
      "script": "build",
      "group": "build",
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "Watch",
      "type": "npm",
      "script": "watch",
      "isBackground": true,
      "problemMatcher": ["$tsc-watch"]
    },
    {
      "label": "Release",
      "type": "npm",
      "script": "release"
    }
  ]
}
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build",
      "type": "npm",
      "script": "build",
      "group": "build",
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "Watch",
      "type": "npm",
      "script": "watch",
      "isBackground": true,
      "problemMatcher": ["$tsc-watch"]
    },
    {
      "label": "Release",
      "type": "npm",
      "script": "release"
    },
    {
      "label": "PreLaunch",
      "dependsOn": ["Watch"],
      "problemMatcher": []
    }
  ]
}
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build",
      "type": "npm",
      "script": "build",
      "group": "build",
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "Watch",
      "type": "npm",
      "script": "watch",
      "isBackground": true,
      "problemMatcher": ["$tsc-watch"]
    },
    {
      "label": "Release",
      "type": "npm",
      "script": "release"
    },
    {
      "label": "PreLaunch",
      "dependsOn": ["Watch"],
      "problemMatcher": []
    }
  ]
}
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build",
      "type": "npm",
      "script": "build",
      "group": "build",
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "Watch",
      "type": "npm",
      "script": "watch",
      "isBackground": true
    },
    {
      "label": "Release",
      "type": "npm",
      "script": "release"
    },
    {
      "label": "PreLaunch",
      "dependsOn": ["Watch"],
      "problemMatcher": []
    }
  ]
}


update foundry's system.json
{
  "id": "my-system",
  "title": "My Cool System",
  "version": "1.0.0",
  "esmodules": ["module/main.mjs"],
  "styles": ["styles/style.css"]
}

Create a file .eslintrc.json in rwk-rmc/
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}


add the following to .vscode/settings.json
{
  "editor.formatOnSave": true,	
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
