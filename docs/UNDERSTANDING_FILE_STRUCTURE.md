# Understading Devty's File Structure

In order to add new things to Devty we first need to understand how things are laid out.

## The `src` folder

This folder contains all modules, views, assets, states & styles.

### The `assets` folder

This folder contains 2 CSS files.

`base.css` file contains css variables that are used across the whole project. Since the project was bootstrapped using `npm create vue@latest` the project variables names are not updated and remain the same as they were when bootstrapped.

`main.css` contains global styling. Since the project is using [`BalmUI`](https://material.balmjs.com/), some components styles are overwritten inside the `main.css` file. You can also use classes defined here throughout the project.

### The `components` folder

This folder contains custom components. Most of the components are wrapper around [BalmUI's Components](https://material.balmjs.com/).

### The `hooks` folder

This folder create custom functions which can be used like hooks.

### The `modules` folder

This folder is where you'll be working mostly if you want to add a new module. This folder contains folders of other modules.

**Every module folder should have a vue file with the name same as the folder's name.**

### The `router` folder

As the name suggests, this folder contains code responsible for routing.

### The `stores` folder

This folder contains stores which can be used inside modules.

`routes.ts`: This file needs to be updated in order to add new module. The `route` variable needs to be updated with the information of your new module.

`snackbar.ts`: Whenever you want to display a snackbar use this store.

Here's a basic example of how you can use snackbar:

```ts
import { useSnackbar } from '@/stores/snackbar'

const snackbar = useSnackbar()

setTimeout(() => {
  snackbar.show('Hello World', 'success')
}, 1000)
```

### The `types` folder

If you encounter a type which is not provided by the module, like file type from `BalmUI`, then you can use this folder.

You can also add more types here, only add those types which you think will be used frequently.

### The `views` folder

This folder contains `Homepage` and `Module` views.

The `Module` view lazy loads the respective module in order to prevent loading all the modules at the same time.

✨ Yay you've made it! Now that you know how folders and files are structured goto next document to understand how to add new module.

[< Prev](INSTALLATION.md)
[Next >](ADDING_CUSTOM_MODULE.md)
