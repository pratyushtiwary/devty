# Adding Custom Module to Devty

Following are the steps on how to add a new module to Devty:

- Create a new folder inside `src/modules`.

**Devty follows `CamelCase` convention for naming modules' folders**

- Inside the new folder, make sure to create a vue file with the name same as the folder name.

- Inside the folder also make sure to create a `config.json` file which will define slug, name & image/icon for the module.

**All icons from [`Google's MaterialIcon`](https://fonts.google.com/icons) are available when using the `icon` property**

**If you want to add a custom image as icon for the module, use the `image` property**

- Now update the vue file you created earlier and add the required functionality and you'er done!

Checkout a module example [here](/src/modules/HashGenerator/)

🎉 Yay, you've just create a new module inside Devty!

[< Prev](UNDERSTANDING_FILE_STRUCTURE.md) [Back to home](README.md)
