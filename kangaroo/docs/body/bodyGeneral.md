## Muscle Joints
Muscle joints are simple lightweight joints that can be great for preserving volume,
or some piston type parts
<iframe width="560" height="315"
src="https://www.youtube.com/embed/7A5NZNeP8vg"
title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>


## Blend Joints
Those are simple joints that rotate a percentage of the main joints. And they have a lot of
attributes to make them translate or scale based on their parents' rotation

To add one, just specify the joint in the list.
![Alt text](../images/body_blendJointsAdd.gif)

Then after running that function you'll get that joint. And you can adjust its values:
![Alt text](../images/body_blendJoint.gif)

Mirroring and Saving those values can be done with the DEFAULTATTRS options.  
![Alt text](../images/body_blendJointsFill.jpg)
!!! note 
    the DEFAULTATTRS thing is a common workflow throughout all the kangaroo tools. Especially when
    we come to the face


## Finger Poses
The *fingerPoses()* function creates those attributes that poses fingers:   
![Alt text](../images/fingerPoses_fist.jpg)

## ZV Groups
The function *addZVGroups()* is for the tool [ZV Parent Master](https://apps.autodesk.com/MAYA/en/Detail/Index?id=3374365102069298437&appLang=en&os=Win64).
You can adjust the *sCtrls* parameter for which ctrls you would like to have groups for. 
By default it does these:
``` bash
armIk_r_ctrl
armIk_l_ctrl
legIk_l_ctrl
legIk_r_ctrl
armWrist_l_ctrl
armWrist_r_ctrl
legAnkle_l_ctrl
legAnkle_r_ctrl
```
