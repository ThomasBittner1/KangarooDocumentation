---
sidebar_position: 1
---

# Installation

## Simple Instalation
1. Extract the zip file, and copy the content somewhere on disk.
2. Drag&Drop the **install.mel** file into Maya Scene View
3. You should see the new KangarooBuilder shelf already.
4. Restart Maya
`

5. You may need do install numpy. We do that with pip install.
In Windows it would look like this`:
“C:\Program Files\Autodesk\Maya2024\bin\mayapy.exe” -m pip install ‐‐user numpy
(you may need to change the path on maya version or installation location)

If you just want to use the skinCluster/geometry tools or the shape editor - you are done at this point.


## File Structure

If you want to use the Builder and Puppet tools for creating assets, you'll have to first setup the file structure

There are 2 important places:
**assetsLocal**
**assetsServer**

AssetsLocal is the folder where you'll work. It can anywhere on your disk drive. Just create an empty folder, and specify that in the settings


### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
