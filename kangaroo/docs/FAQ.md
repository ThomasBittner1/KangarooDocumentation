# FAQ

### Which Maya versions are supported?
Maya 2022
Maya 2023
Maya 2024
Maya 2025

### Does it work in Linux or Mac?
The latest version 5 does support all three systems

### I got an error that numpy is not installed
You need numpy python module. You can install it like this in a command prompt:
“C:\Program Files\Autodesk\Maya2022\bin\mayapy.exe” -m pip install ‐‐user numpy

### After building the character, some vertices are stretched to the origin
Most likely this is because the loadDeformer function is skinning some influences that don’t exist in the rig anymore. If those influences don’t exist in the rig, the loadDeformer function will create them as simple joints outside the hierarchy.
To debug that, either just run until loadDeformer or Run All with the clean function turned off. Then look at joints outside the hierarchy. Easiest way to fix the weights of those is with the move skinCluster tool

### Maya crashes randomly after building
Make sure you are in DG mode at the time you open Maya. Windows -> Settings -> Preferences -> Animation: switch to DG at the very top. Then restart maya and verify that it’s still on DG

### While I’m building, I’m getting a message asking if to create Empty Map Mesh Cluster
The full message could be: “None of the 3 skinClusters exists: splitSkinCluster__eyebrows, skinCluster__eyebrows__MOUTH, skinCluster__eyebrows
Create an empty Map Mesh Cluster?”
It happens in the function autoSetupSliders. For splitting some shapes to bottom (jaw) and top (non jaw), he’s trying to get that from one of the mentioned skinClusters. But if they don’t exist, we’ll have to create one. After running that function, you can see there’s a new Mesh called *__MAPS – in this case eyebrows__MAPS. Locate that and check that the faceBottom weights are good, meaning that jaw and below is 1 and everything else is 0. In the eyebrows example, everything needs to be 0 because it has no jaw.
Then export it under Export -> Maps.
This will then import it in the imporMapMeshes function, and you should not get that error anymore later.



### When I use Studio Library on Kangaroo Rigs, it breaks on saving Animation, and creates some transforms called CURVE1, CURVE2,..
First try to get the latest version. of Studio Library. Older versions didn't get along with joint controls, and on Kangaroo rigs the 
hand/foot iks are joints. 
To go around that problem, go into the studio library code. Find the file animation.py – and change the line (probably on Line 567)
```
if maya.cmds.nodeType(node_path) == “transform”:
```
to
```
if maya.cmds.nodeType(node_path) in [“transform”, “joint”]:
```

### I want to change the orientation of a singleBone or singleTransform using the adjustAxisOrientation. How do I set those values?
First build the rig with adjustAxisOrientation as 0,0,0. Then manually rotate the slider group of the ctrl to how you want it, and store those values into the adjustAxisOrientation. And then rebuild the rig.

### I have a jawOpen shape in the Shape Editor. At which rotateZ value of the jaw_ctrl will it be activated fully?
If you have BASEMouthCtrls function active, and bSPLINES flag is True, it’s the jawOpen entry in the dPoseCtrlValues.
If you have either BASEMouthCtrls function disabled or bSPLINES flag is False, it will take the rotateZ from the shape editor file (rotateZ of jnt_m_jawMain in the * button)
However the joint values that are specified in the * button are activated at a different value! They get activated at the value of the rotateZ in the * button. 
Unfortunately this is a small flaw in the system, those two should generally be called the same time. To go around this issue you can specify the fPoseCtrlValue flag in the jawAutoTranslate function to be the same as what you defined in the dPoseCtrlValues of the BASEMouthCtrls function.
One extra little gotcha - if you change the ‘jawOpen’ pose in the dPoseCtrlValues, and if you want to click the button “Match Selected Targets Scene Selection” in the Shape Editor to get the shape from the rig, you first have to rebuild the rig and load it in again. Otherwise it would take the old ‘jawOpen’ value from dPoseCtrlValues. This is an exception, because for other poses the shape editor will look directly inside the entries (in the UI) of dPoseCtrlValues


###In Shape Editor: when I click “Match Scene Selection Selected Targets”, the jaw open pose not the same that I specify on the * button.
It could be that the rig doesn’t know yet about those values from the * buttons. Save the blendShape file, rebuild the rig (make sure to have importBlendShapeFile and jawAutoTranslate activated!), and use that newly built rig in the “Transfer from Referenced Rig” section. Best also make sure to turn off the blendshapes in the referenced rig for getting the jaw shape again


### Why does the jaw rotate sideways if I rotate it up (reverse to open)?
This is most likely happening because it’s getting the motion from the joints in the blendShape file, and in there the jaw joint is at the origin. Either delete the joints in the blendShape file, or set them properly by getting Skin Setup from the rig
You could also disable the jawAutoTranslate function

### In the shape editor it’s tricky to set the jawOpen values on the * button, any tips on that?
Yes. Cut the translate/rotate/scale connections of the jaw joint (jnt_m_jawMain) -> place the jaw joint to where you’d like it to be -> screengrab its translate/rotate/scale values -> after reloading the shape editor and the connections are restored, enter those values into the start button


### What’s the correct order of deformers on the face rig?
In the Channel Box, the order should appear like this from top to bottom (so the evaluation order would be reverse of that):
skinCluster__head_geo__BEND
lattice__head_geo__r_EYE
lattice__head_geo__l_EYE
skinCluster__head_geo__TWEAKERS
skinCluster__head_geo
blendShape__head_geo
This is assuming the head geo is called head_geo, so in your case those deformers might be called different.
You might also not have all of them, or you might have some extra ones.




### On moving the corner ctrls in, the actual corners (joints) are moving at a strange direction.
The joints are following curves controlled by transforms that are sliding along the sliding surfaces (bpNurbs_l_cornerSlidePlane). It’s easiest if you make those surfaces touch the corners in default


### On moving the corner ctrls in, the top/bot lip ctrls are moving at a strange direction.
If you have bDepricatedStaticCurves as True, they will slide along the static curves. This can look strange especially on bigger mouths, since their movements can get too different to the corners’ movements. It’s recommended to switch bDepricatedSaticCurves to False, but make sure the sliding surface (bpNurbs_l_cornerSlidePlane) goes through the corners and covers all range.


### How can I change the orientations of lipsTop_l_ctrl, lipsBot_l_ctrl, lipsTop_ctrl, lipsBot_ctrl, lipsTop_r_ctrl, lipsBot_r_ctrl?
Orientations are adjusted with the slider blueprints. But in those cases it’s not live, you’ll have to adjust the slider blueprints, export, and rebuild


### How can I change the positions of lipsTop_l_ctrl, lipsBot_l_ctrl, lipsTop_ctrl, lipsBot_ctrl, lipsTop_r_ctrl, lipsBot_r_ctrl?
There are 2 ways to move lip ctrl positions
Pivot Groups: Those are offset groups of each ctrl, a few parents up, for example grp_l_lipsTop1OffsetPivot. The way you adjust them is you move them manually, and then Fill the Values (DEFAULT ATTRS -> fill all values), and rebuild
Or you just change the cvs of the ctrls and export the ctrl shapes.
If you should do (1) or (2) depends on how the lip roll works (lip ctrls rotating in X). On more hyper realistic characters you might want to move the actual pivots into the middle of the lip shape. But the more stylized the character is, the bigger chance that you might want to keep the pivots at the joint level and just move the cvs.
Keep in mind if you change the positions using the pivot groups, the lip seal won’t work nicely anymore. You’d have to turn it off, but use the postZipper (a few functions below) instead.


### My SmallJoints/BigJoints weights got messed up because I changed the spline joint count, either by adjusting the curves or iSkipSplineJoints flag. How can I fix this?
In the FaceSkininng UI, click the “Distribute BigJoints” and “Distribute SmallJoints” buttons


### If I translate the mouth_ctrl up/down/left/right things are moving in wrong directions. Where do those orientations come from?
This is coming from the ‘bp_m_mouthPivot’, which is originally placed based on the head joint (jnt_m_headMain). It might be confusing that the xyz axes are not exactly world aligned. The X axis is pointing up, Y axis is pointing back, and the Z axis is pointing to the right. You should however get the correct orientation automatically when you have the head oriented same as in the template characters. 

### The lip ctrls are oriented not Y facing up and Z facing perpendicular to the mouth.
Possibly originating from head being (or was different)
Theoretically you could fix the orientations using the slider blueprints, but it’d be safer to fix it at the root cause. For more detail check the question before.


### for BrowsSplinesSurface brows are moving in a different direction than the ctrls
The brows are moving in straight lines of the surface. At this time the best is to adjust the orientation of the ctrls so they are oriented to the lines of the surfaces. (There could be a fix in future to support ctrls going more diagonal)


### Sometimes the interpolators don’t evaluate anymore
Most of the time this is an evaluation issue, happening from a cycle in the rig. When you click the EDIT button, it’s using the cmd.sculptTarget() command, which sort of creates a cycle. So when you deactivate the EDIT button, it might work again.
If not, you may have another cycle in the rig. If you cannot locate and remove that cycle, try force rebuilding the interpolator with the right mouse click menu. 
If it’s still not evaluating after rebuilding, then that most likely isn’t a cycle issue, try the run poseEditorApply() function again. 
If after that it’s still not evaluating, then check the inputs of the interpolator.

