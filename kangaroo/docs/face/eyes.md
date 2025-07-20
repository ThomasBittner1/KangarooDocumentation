



## Eye Puppet Limbs
For the eyeballs you have 3 specific limbs:

* **Eye**
* **EyesLookat**
* **EyeLookatIndiv**

Usually those are already setup-ed when you copied from another character. If you do need to set them up yourself,
make sure to specify the eyes in *attacher: eyes (c)*
![Alt text](../images/face_eyesLookat.jpg)
EyeLookatIndiv is for when you have some character that has the eyes pointing sideways. In those situations the
EyesLookAt is not so great, since the main ctrl is at the front of the character.

Once you've got the right setup in there, all you need to do is place the blueprints.  
And make sure that the polevector in the BP Rig is pointing *downwards*. Otherwise you'll get troubles later with the
eyelid behavior.

### Iris and Pupil
The *EyesLookat* limb also comes with **IrisScale** and **PupilScale** attributes. They reason why they 
are on the *EyesLookat* limb is because those have the ctrls for scaling them: 
*scaleX/scaleY* for Iris, and *scaleZ* for Pupil.  
![Alt text](../images/face_irisAndPupilScale.gif)
And make sure to skin the **jnt_l_eyeIris** and **jnt_l_eyePupil** joints!
 


# Eyelids
If you didn't add the facePro python file, add it now (facePro_v18.py at the time of this writing). 
## Basic Ctrls
The function *baseLidCtrls()* just creates those three arrow ctrls. Those are being used for all setup, no matter
if simple lid joints, blendShapes or splines.  
![Alt text](../images/face_basicLidCtrls.jpg)

To get a good rom, apply **rom_eyes.anim**, which you'll find in almost every character at **Export -> Anim**
Now the eyelids are not moving yet. For them to move, you'll hvae to either do *simpleLidSetup()* (Simple Lid Joints) or *splineLidSetup()* (Eyelid Splines)


## Simple Lid Joints
### Create and Skin
If you turn on the function *simpleLidSetup()*, you'll get mainly 2 joints for each eye *jnt_l_eyeBlinkBot* and *jnt_l_eyeBlinkTop*
and a few pose groups that define in which poses the joints should be as you move the arrow ctrls created 
in **Basic Ctrls**

After you've run that function, skin the joints. 
Don't worry if it doesn't look good yet on the blink, for that you'll need to set the slibling transforms.

### Sibling Transforms
those Transforms that you can move around. 
Those are working with a similar concept as the  *poseLocators* you see in lots of other functions. They basically 
just define the poses of the joints in all eyelid posed by the arrow ctrls (blink, wide, upperLidUp, upperLidDown, ...)  
Locate them by clicking the button **Select Sibling Transforms**
And then just place them, as you go through the rom that you applied:  
![Alt text](../images/face_placeSiblings.gif)  

!!! tip
    Some animators want to be able to achieve a blink by adjusting upperlid and lowerlid separate.  
    In this case you can click the button **set extras from blink**, which will assign the values from the sibling transforms
    of the blink onto the lower and upper ones.

Many times you can get perfectly looking blinks using a acombination of good skinning and well placed Sibling Transforms.
But it's not always the case. In some cases you'll hit limits where you have to add blendShapes on top.

## Eyelid BlendShapes
The *blendShapesAndSliders()* function is using the blendShapes mentioned below.   


**blink_l_ctrl** is triggering the following blendShapes:  
```
blink
eyeWide
upCurveBlink (for some cartoony characters, creates **upCurveBlink** attribute on the blink_l_ctrl)
```

**lidBot_l_ctrl** and **lidTop_l_ctrl** are triggering the following ones:
```
eyeUpperUp
eyeUpperDown
eyeLowerUp
eyeLowerDown
```

!!! tip
    Those blendShapes also work well as correctives on top of Simple Lid Joints (*simpleLidSetup()*). Because if you just
    do blendShapes, a blink might be too linear and even giving intersections with the eyeballs. 
    But getting the spherical motion from the joints and blendShape just as a corrective is giving you the top quality.     
    And yes, instead of joints you could solve the intersections by adding inbetweens, but the result is often not 
    as clean.


When the eyeballs are looking into different directions, those blendshapes are being triggered:
```
eyelookUp
eyelookDown
eyelookLeft
eyelookRight
```
Those eyelook shapes can also be tweaked by animation with the *eyesLookAt_l_ctrl.lidFollow* attribute.




## Eyelid Splines
![Alt text](../images/face_eyelidSplinesCtrls.gif)
The function *splineLidSetup()* is creating splines that take care of a proper blink using some additional joints.  
You'll see there's quite a few chapters just for the *Eyelid Splines*, but 90 % of the time just the first sections 
are required. And actually sometimes it doesn't take more than 5 minutes to get nice Eyelid Spline Setup.    
But in some cases where you need to go more detail, you have the tools for it.

### Eyelid Splines - Creating the Blueprints
This function needs some extra blueprints, but they are easy to create.  
Select a vertex along the edge of the eyelids:  
![Alt text](../images/face_splineLidBlueprints.png)  
Then click the button **Create Left Curve and Locators**, which creates this curve and two locators:  
![Alt text](../images/face_splineLidBlueprints2.jpg)  
Those locators need to be at the inner and outer corners. Those are basically what cuts the lid into lower lid 
and upper lid. Always check if the locators are placed properly, the tool doesn't *always* do that correctly.  
Also notice how there's a hole in the curve, in this case at the upper right side? That's fine, 
because this curve is not being used for the setup, it's only to indicate where the actual setup curve should be 
when building.  

### Eyelid Splines - SkinCluster
Next thing is run  until *loadDeformers()*. Theoretically you could also *Run All*, but it's not needed.  
!!! note
    Remember the *Selection Templates* from the builder? This is where they come in handy ;-)  
Select the mesh, and click **==BIND== -> bind to joints on selected mesh**  
    Under the hood this is using the *Closest Expand* skinCluster tool.   
And then test it using the Blink Ctrl. 
![Alt text](../images/face_eyelidJointsAndSkinning.gif)     
If you find that the skinning needs more influence, you can adjust the iBindRows.
By default it's [2,3] - those numbers represent the FullLoops and FadeOutLoops. For more information what those are,
check the **ClosestExpand** tool. After changing those values you need to bind again using the **==BIND==** button. 
Might be good to transfer back to the jnt_m_headMain first, also using the **==BIND==** button.  

### Eyelid Splines - Check the Ctrls
First check the *blink_l_ctrl*. That ctrl was created in the previous *BASELidCtrls()* function already, but the *splineLidSetup()*
enabled the *rotateZ* attribute.   
The light blue ctrls are manipulating the spline directly. If you don't like the influence, you can play around with
**iCtrlSmoothIterations**. Whenever you modify this value, you'll need to rebuild to see the results.  
In some cases adjusting the *iCtrlSmoothIterations* is enough. But for even more precision you can also directly adjust
the weights on the skinCluster **skinCluster__curve_l_topCombined__CTRLS** of the **curve_l_topCombined** curve.  
![Alt text](../images/face_splineLidCtrlCurves.jpg)  
Make sure you export the weights of those curves. Btw, when you use **Export -> Deformers** on those curves, you'll notice he 
exports all three skinClusters. You could theoretically delete the 2 unchanged ones, but they don't cause many issues,
so I wouldn't bother. 

### Eyelid Splines - Zipper
The *splineLidSetup()* function also comes with a **bZipper** attribute.
![Alt text](../images/face_eyelidZipper.gif)  
*Is it useful??*  
Animators are very divided on this, feel free to checkout this LinkedIn discussion or even put your opinion out there:
<a href="https://www.linkedin.com/posts/thomas-bittner-6bb6302_ive-just-added-eyelid-zipper-to-my-face-activity-7239912418816995329-2aJx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABy3u8BK03tH_Bovh-T4-W99NGXldU3f_g" 
target="_blank">LinkedIn Post on EyelidZipper</a>
 
### Eyelid Splines - Passer Values
On the passer of the **blink_l_ctrl** you can find those attributes. Close the eyelid and experiment with them.
![Alt text](../images/face_splinelidAdjustValues.JPG)   
Mirroring and Saving those happens with the ** === DEFAULT ATTRS === ** button  
!!! tip
    if you select the blink_l_ctrl, the shelf button **selPssr** will select the passer group.

### Eyelid Splines - Poses with Locators
You'll see a locator for each light blue cube ctrl called for example **_poseLoc__eyeSplineBotA_l__blink**
When the eyelid is in a blink state, just move around the locator to adjust the pose a bit.  
![Alt text](../images/face_eyelidsplinePoseLocators.gif)   
It's a great way to make sure the lid is fully closed in case the passer attribute *overShootOnBlinkFactor* is not enough.  
Those locators are basically just get activated when *blink_l_ctrl.ty* is -1.0.  

If you want to get more in detail with poseLocators, you can also go to any pose using the blink_l_ctrl or the other 
two arrow ctrls, and click **Generate PoseLoc at Current LidPosition**.     
This creates extra locators that you can modify.   

Saving locator positions happens with the **fill PoseLocs** button

Saving the PoseLocs works with the **Fill PoseLocs** button. If you want to get rid of some of the extra poseLocs,
don't delete them directly, since this would break the setup. Instead adjust the **ddPoses** attribute (make sure 
to use the JSON Editor!) and rebuild.

!!! warning 
    Very often we create the additional pose on the pose where the upper eyelid is fully down, using the lidTop_l_ctrl.
    If you set this ctrl pose to NOT be fully down, in the end it will fade back to default when the ctrl is fully down.
    Which can be unwanted behavior. 


#### extra control on lids open widely
Once you run the eyelid spline function, you'll get those extra curves:  
![Alt text](../images/eyes_extraCurveBlueprints.jpg)   
Those just specify how the lids behave when they get opened wider.   
If you want to finetune those, you'll more likely want to set the **bLipsCanPushOut** value to **True**, otherwise
the lips will always be constraint onto the eyeballs


### Eyelid Splines - BlendShape Correctives
If the PoseLocs are not enough, you can also go more in detail with sculpting shapes. For that the [Shape Editor](faceGeneral.md#shape-editor)
needs to be understood.  
When you are using the *Shape Editor*, many times doing the usual blendShapes mentioned above like *blink* are already 
enough. But you can go move into detail:  
You could create a **splineLidCorrective\*** target, that works with a similar timing as the PoseLocs mentioned above.     
![Alt text](../images/face_eyelidCorrectiveLowerLid.gif)   
The names of the newly generated target might sound a little technical. That's just because it's trying to fit a lot of 
information into the target name. Basically it's having the lowerlid position and upperlid position in 
percentage separated by **X**. And if there's an **n** before a number, it means the number is negative.  
*"splineLidCorrectiveX030X"* = lower lid 30 % up, nothing is after the second X therefore no pose for upper lid  
*"splineLidCorrectiveX010X089"* = lower lid is 10 % up and upperlid is 89 % down.   
If you have 2 poses (lower and upper), then it's spliting those in the *blendShapesAndSliders()* function, using the skinCluster weights.
!!! tip
    The lower lid up as shown in the gif above is actually very common. 
    Often we add that shape but keep it unchanged, just to create a combo with the *squint*.

   

## Eye Lattice Ctrls
![Alt text](../images/face_eyelattice.gif)  
Just turn on the *eyeLatticeCtrls()* function and specify the eyeBall geos (**sLeftMeshes**, **sRightMeshes**), and the mesh that has
the eyelid geos (**sSkinMeshes**).    
After building, you'll have to fix the eyelid weights. It's best done with **Weightmaps -> Flood** and the *Replace Absolute* option.  
![Alt text](../images/face_eyeLatticeWeights.jpg)  
And you are done. In many cases you might want to adjust the ctrl shapes a bit so they aren't buried inside the mesh.


## Tweakers
If you don't have spline rig for the eyelids, animators might ask for extra ctrls since the blue arrows are not enough.
See [*TWEAKER_lids()*](faceTweakerCtrls.md#tweaker_lids) how to add them


## Blink Line
There's an attribute on the **blink_l_ctrl** that can changes the blink when the eyes are closed.  
Sounds simple - but it needs to be understood how it works under the hood since that's different in all these setups.  
1. If you have just blendShapes, that blink line will not do anything.
2. If you have *simpleLidSetup()* with the *siblingTransforms*, the blinkLine will rotate the eyelids up/down. Can be useful for small adjustments, but probably unstable if animators move it too much
3. for Spline Rig it works much smoother