# FAQ

### Which Maya versions are supported?

- Maya 2022 (Windows)
- Maya 2023 (Windows, Linux)
- Maya 2024 (Windows, Linux)
- Maya 2025 (Windows, Linux)


### Does it work in Linux or Mac?
The latest version 5 does support all three systems


### After building the character, some vertices are stretched to the origin
Most likely this is because the *loadDeformer()* function is skinning some influences that don’t exist in the rig anymore. If those influences don’t exist in the rig, the *loadDeformer()* function will create them as simple joints outside the hierarchy.
To debug that, either just run until loadDeformer or Run All with the clean function turned off. Then look at joints outside the hierarchy. Easiest way to fix the weights of those is with the move skinCluster tool


### Maya crashes very often
Make sure you are in **DG** mode at the time you open Maya:  
Windows -> Settings -> Preferences -> Animation -> switch to *DG* at the very top. Then restart Maya and verify that it’s still on *DG*.    
This is not just for Kangaroo. Generally Rigging should be done in *DG* while *parallel* and *GPU* is for Animating.


### When I use Studio Library on Kangaroo Rigs, it breaks on saving Animation, and creates some transforms called CURVE1, CURVE2,..
First try to get the latest version. of Studio Library. Older versions didn't get along with joint controls, and on Kangaroo rigs the 
hand/foot iks are joints. 
To go around that problem, go into the studio library code. Find the file animation.py – and change the line (probably on Line 567)
``` python
if maya.cmds.nodeType(node_path) == “transform”:
```
to
``` python
if maya.cmds.nodeType(node_path) in [“transform”, “joint”]:
```

