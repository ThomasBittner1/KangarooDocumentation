# Installation

1. Extract the zip file, and copy the content somewhere on disk.
2. Drag&Drop the **install.mel** file into Maya Scene View
3. You should see the new KangarooBuilder shelf already.
4. Restart Maya
`

If you get an error that numpy is missing, you'll have to install numpy, too.
We do that with *pip install*.  
Do the following thing in a CMD. You'll most likely have to  change the path on maya version or installation location)
And if you get weird looking errors, try without the --user numpy flag
```bash
cd C:\Program Files\Autodesk\Maya2024\bin 
mayapy.exe -m pip install ‐‐user numpy
```

If you just want to use the skinCluster/geometry tools or the shape editor - you are done at this point.


# Rig your First Character

## AssetsLocal
First we need to create the AssetsLocal folder. It's the folder where you'll work. 
It can anywhere on your disk drive. Just create an empty folder, and specify that in the settings  
![Alt text](images/settingAssetsLocal.jpg)

## AssetsServer
To start creating characters, 99.95 % of the times you copy from an existing one and adjust.
And we usually grab one from the server. **Templates** is a default one that comes with the tool, and has those options:
```commandline
BASEHUMAN
BASEDOG (digigrade quadruped - dogs, cats, ...)
BASEHORSE (unguligrade quadruped - horses, deers, ..) 
BASEMOUSE (plantigrade quadruped - mouse, bears, ...)
BASEBIRD
BASEPROP 
BASELEGOFIGURE
```




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
