---
title: Kangaroo's Pose Editor (Maya)
description: Improve your deformations with just a few clicks
---

From Kangaroo Builder Version **5.16** you can also use the Pose Editor on rigs that are *not* built with Kangaroo Builder.
You just have to start the Pose Editor a bit different.  
First run those lines in python:
``` python
from kangarooTools import poseEditorIsolated
poseEditorIsolated.showUI() 
```
And in there open the Pose Editor with this button:  
![Alt text](../images/poseEditorStandalone_openPoseEditor.jpg)  



## Create the Interpolators
Creating interpolators requires a bit more attention, because in many cases the axes of the ctrls are different than the default.  
But before reading further, make sure you are familiar with [interpolators](poseEditor1.md#creatinginterpolators) in general

For all poses, the PoseEditor assumes that the twist axis is **Y**. But in many rigs it's **X**. So first on *all* 
newly created interpolators you may have to spend more time to adjust the pose rotations:   
![Alt text](../images/poseEditorStandalone_poseRotations.jpg)  

### Spherical
Likely you'll have all the values at 25 % at first. Once you adjust the pose rotations for each pose, it should work 
right away (if you have set the correct joints and ctrls).


### Cone
For the cone - apart from adjusting the Pose Rotations, make sure to check the Twist Axis:  
![Alt text](../images/poseEditorStandalone_ctrlTwistAxis.jpg)  


### SignedAngle
Special Attention is needed on the **CtrlAttr**, **Angle Axis (Joint)** and **Up Axis (Joint)**:  
![Alt text](../images/poseEditorStandalone_signedAngle.jpg)  

### Upleg
Don't use the Upleg one, it's too specific to kangaroo rigs



## Export/Import
With the **Export (Fill)** and **Load (Apply)** buttons you can export/import the setup.
!!! warning
    Do **NOT** load it twice! Loading it is only meant to do on a clean rig that doesn't have pose editor setups yet.
