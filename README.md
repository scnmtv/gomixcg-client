## Angular 2 (TypeScript + Pug + SCSS) Skeleton

### Usage
```bash
$ git clone git@github.com:CastawayLabs/ng2-skel project-name
$ cd project-name
# don't forget to edit package.json to update metadata

$ npm install

# npm scripts
$ npm run make           # compiles the app to dist/
$ npm run make:prod      # same, but production version
$ npm run watch          # watches src/ and compiles on change
$ npm run dev            # same, but with live-reload (BrowserSync)
$ npm run clean          # cleans up logs, modules and build dirs
$ npm run lint           # lints all JS and TS code in project
```

### Notes
- **IMPORTANT:** The build-system makes liberal use of some of the fairly
  recently implemented ES6 features, so Node.js versions lesser than v6 will
  probably fail to run it. For best results, use the latest (not LTS) version
  of Node.js.
- Minor issue with `ng-bootstrap` (peer dependencies versions mismatch) may
  cause errors on `$ npm install`. Hopefully it will be fixed soon.
  See [here](https://github.com/valor-software/ng2-bootstrap/issues/1067)
  for further details or resolution.
- Use Bootstrap 4 which is still in alpha. Bootstrap 3 is stable and can be
  chosen in package.json, but then Gulpfile needs to be updated to include
  tasks for copying vendor files like fonts etc. to dist/ dir.
- Build-system does not support testing (yet).

### To do
- Update README.md
- Integrate E2E-testing into the setup

