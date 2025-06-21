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
(you may need to change the path on maya version or installation location)`:
```bash
“C:\Program Files\Autodesk\Maya2024\bin\mayapy.exe” -m pip install ‐‐user numpy
```

If you just want to use the skinCluster/geometry tools or the shape editor - you are done at this point.


## File Structure
If you want to use the Builder and Puppet tools for creating assets, you'll have to first setup the file structure

There are 2 important places - **assetsLocal** and **assetsServer**

#### AssetsLocal
AssetsLocal is the folder where you'll work. It can anywhere on your disk drive. Just create an empty folder, and specify that in the settings  
![Alt text for accessibility](/img/settingAssetsLocal.jpg)

#### AssetsServer
AssetsServer can be one or more locations. And most of the time you exactly 2.
One is the template folder that comes with the installation. And the other one is a server on a shared location, such as a drive setup-ed with smart drive like Dropbox or Box.
Or if you are working in a network, it can be a location on the network. 

If you don't have one yet, just create an empty one.
And after that, open the **pathEnv.mel** file with a text editor, and change the path after default@ to be your server path.
```bash
putenv "KANGAROO_SERVER_PATH" "templates@./templates; default@C:/Users/thoma/Dropbox/assetsServer";
```
This is setting the Environment variable. The pathEnv.mel is a great way to just get started, but if you are setting up the tool inside a pipeline, you might want to just comment out that line with //, and 
create the Environment variables in a more 'appropriate' way
