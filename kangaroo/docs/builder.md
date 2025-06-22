# Builder

The **Builder** and **Puppet** are the two most important tools that you need to get familiar with for creating characters.

The builder basically just manages a ton of Python functions from different files, and lets
you run them. Either just selected functions or all at once for the final creation using the **Build All** button

Go to that character you created from the previous section and click *Build All*  
Now sit back and enjoy watching him build the character for you :-)
![Alt text](images/builder_buildAll.gif)

Now take a moment to get familiar with the UI. At the top you have python functions. You can add python files,
remove python files. You can even uncheck them and then all their functions will disappear.
Below are the functions. Even further below you can set function arguments for each functino that you select.
And on the right side (you'll have to drag the splitter a bit) you can see buttons and a description for 
whatever functino you have selected.
You can also create your own python functions and specify arguments and build buttons. But more to that
in the Python section.
![Alt text](images/builder_filesAndFunctions.jpg)

For now let's check out some of the more important functions that we already get automatically.  


## *importModel()* 

The *importModel()* function imports the model. Currently it's just that boring grey guy. 
If you already have a model, go to export -> MODEL, and with the Explorer New Model button
you get a folder that let's you copy a character in it
![Alt text](images/addModel.gif)

## *importBlueprints()*, *buildPuppet()*
importBlueprints and buildPuppet are the functions is grabbing the work you do in the puppet tool.
Blueprints is basically just a simple ma file with guide joints, and buildPuppet is generating all the 
controls and rigging logic like Iks, Fks, Auto Clavicle, ...
We'll get to those more in detail in **Puppet** below. But for now let's continue checking out the 
other important functions.

## *create_GAMESKELETON()*
This creates a duplicated hierarchy that is clean enough to run in Game Engines such as UE or Unity.
You can even set the arguments to convert the joints to the typical UE joint namings/orientations,
which can be handy in many situations.  
When you run that function, you'll see a GAMESKELETON group that you can export as an FBX. 
You can even use the Function button *export FBX* to do that for you   

## *loadCtrlShapes()*
This loads the ctrl shapes that you export in **Ctrls** -> **Export** -> **Export All Ctrls** 


## *loadDeformers()*
This loads the deformers (mainly skinCluster weights) 
You can export the deformers in **Export** -> **Deformers**  
Please keep in mind this only saves **weights**, **attribute values** and **deformer orders**  
Some riggers in the past expected it to also load the deformer structures such as blendShape targets, or wrap deformer setups.
But for the blendShapes there are way cooler tools than that (see later in **Pose Editor** and **Shape Editor**. 
And if you want to do stuff like Wrap Deformers or Morph, it's much cleaner to do that in a 
python function before the loadDeformers, and let the loadDeformers just set the weights.  
Easy deformers like *DeltaMush* that mainly just need weights and attribute could can be handled 
just in the loadDeformers() function

## *importMayaFiles()*
If you go to **Export** -> **MayaImp**, you can export some scene elements. Those get imported on the **mayaImport()** function

## *importTargets()*
Very similar to importMayaFiles. But Targets are just simple Polygon Meshes. Those are saved with a Numpy file format
that keeps the files smaller. Obvously the file might be even smaller if you save it as a dummy blendShape and add a builder function that extracts it (and some kangaroo tools do exactly that),
but there are many situations where you have some simple meshes and you don't want to go through that hassle.
If you go to **Export** -> **Targets**, you can export the selected meshes.  
By default it creates a file for each mesh and the mesh name is defined in the file name. 
This makes it very easy to manage later


## other Functions
Now I've just shown you the important basic functions. But there's a looooot more, like all the green buttons
And later for the Face, we'll add lots of orange functions

