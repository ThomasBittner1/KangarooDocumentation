# General
Face Rigging in Kangaroo has gotten very powerful in version 5. It's got many different setups to choose
from for each part - mouth, brows, eyelids, etc and it's got some general squash/stretch ctrls.

Most of the time you have the option of doing spline setups or blendShapes. You can also mix.

The first thing to do when you do Face Rig is add the python file **facePro_v16.py** (right click on the Python Files
in the builder -> **Add File** -> **+default** -> **facePro** -> **facePro_v16.py**


# Puppet Limbs
## The Generic Ones 
For things like Tongue (*Spine*), teeth (*SingleTransform* or *Belt*) we can use the puppet limbs that we also use for the body.
You can also use Tweaker Ctrls if you want to give animators some extra modifiers. But make sure
to first read through Face Tweaker Ctrls in here, since those might already give you better options for many cases.  

## Eyeball 
For the eyeballs you have 3 specific limbs:

* **Eye**
* **EyesLookat**
* **EyeLookatIndiv**

Usually those are already setup-ed when you copied from another character. If you do need to set them up yourself,
make sure to specify the eyes in *attacher: eyes (c)*
![Alt text](images/face_eyesLookat.jpg)
EyeLookatIndiv is for when you have some character that has the eyes pointing sideways. In those situations the
EyesLookAt is not so great, since the main ctrl is at the front of the character.

Once you've got the right setup in there, all you need to do is place the blueprints.  
And make sure that the polevector in the BP Rig is pointing *downwards*. Otherwise you'll get troubles later with the
eyelid behavior.

### Iris and Pupil
The *EyesLookat* limb also comes with **IrisScale** and **PupilScale** attributes. They reason why they 
are on the *EyesLookat* limb is because those have the ctrls for scaling them: 
*scaleX/scaleY* for Iris, and *scaleZ* for Pupil.  
![Alt text](images/face_irisAndPupilScale.gif)
And make sure to skin the **jnt_l_eyeIris** and **jnt_l_eyePupil** joints!
 


# Shape Editor
Shape Editor is where you can sculpt and manage the sculpted shapes. You'll use it heavily on blendShape setups. But
it can also be handy for spline rigs, when it's all looking great but you want to add a corrective to adjust
the shape a bit more.

This video shows how it works:
<iframe width="560" height="315"
src="https://www.youtube.com/embed/cEBJ-tPLMuU"
title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

Basically you just create a blendShape file such as *blendShapes.ma* that you import and manage in the *importBlendShapeFile()*
And later the function *blendShapesAndSliders()* is grabbing those baked meshes and putting them into the rig as blendShapes.


# SliderBlueprints
Slider Blueprints are NOT the *blueprints* in the puppet tool. Instead they
are just some simple joints for the Face Setups. There's no centralized place where you manage them. Instead every 
function just creates them and puts them into the *__sliderBlueprints* group, and when you export them, you export them all together.
![Alt text](images/face_sliderBlueprints.jpg)

## Mirror
While you could theoretically mirror them with the *mirror* shelf button, usually we mirror them by just not exporting the 
right side ones, and then the functions create them using the left side ones.
To specify which ones get exported and which ones not you can switch the **doExport** attribute on each sliderBlueprint joint

## Export 
Exporting works with the button **-export \*Slider\* BPs-**. You'll find this button on many functions such as *BASELidCtrls()*,
*blendShapesAndSliders()*, *parallelAttachTransforms()*. And it'll do the same thing on each function, it exports
ALL the sliderBlueprints, not just the ones of the current function.
## Placing them
Most of the time it's best to build until before *parallelAttachTransforms()*, and then adjust their locations and scale.
This way you can test right away if they work well with the blendShape they are driving.  
Just whenever they are driving spline rigs such as the lips spline rig, that connection is already broken. And in 
those cases you just have to guess when giving them good scale values, and rebuild.
  


# Eyelids
## Basic Ctrls
The function *baseLidCtrls()* just creates those three arrow ctrls. Those are being used for all setup, no matter
if blendShapes or splines.

## Eyelid Locators
If you turn on the function *simpleLidSetup()*, you'll get those locators that you can move around


## Eyelid BlendShapes
the *blendShapesAndSliders()* function is using the blendShapes mentioned below.   
TIP: If you are doing the blink with just blendShapes, it's advisable to also turn on the *TWEAKER_lids()* function, 
since animators might want some extra behavior.

**blink_l_ctrl** is triggering the following blendShapes:

* blink
* upCurveBlink (for some cartoony characters, creates **upCurveBlink** attribute on the blink_l_ctrl)

**lidBot_l_ctrl** and **lidTop_l_ctrl** are triggering the following ones:

* eyeUpperUp
* eyeUpperDown
* eyeLowerUp
* eyeLowerDown

When the eyeballs are looking into different directions, those blendshapes are being triggered:

* eyelookUp
* eyelookDown
* eyelookLeft
* eyelookRight

Those are also being used for lookUp/Down 

## Eyelid Splines
![Alt text](images/face_eyelidSplinesCtrls.gif)
The function *splineLidSetup()* is creating splines that take care of a proper blink using some additional joints.  
You'll see there's quite a few chapters just for the *Eyelid Splines*, but 90 % of the time just the first sections 
are required. And actually sometimes it doesn't take more than 5 minutes to get nice Eyelid Spline Setup.    
But in some cases where you need to go more detail, you have the tools for it.

### Eyelid Splines - Creating the Blueprints
This function needs some extra blueprints, but they are easy to create.  
Select a vertex along the edge of the eyelids:  
![Alt text](images/face_splineLidBlueprints.png)  
Then click the button **Create Left Curve and Locators**, which creates this curve and two locators:  
![Alt text](images/face_splineLidBlueprints2.jpg)  
Those locators need to be at the inner and outer corners. Those are basically what cuts the lid into lower lid 
and upper lid. Always check if the locators are placed properly, the tool doesn't *always* do that correctly.  
Also notice how there's a hole in the curve, in this case at the upper right side? That's fine, 
because this curve is not being used for the setup, it's only to indicate where the actual setup curve should be 
when building.  

### Eyelid Splines - SkinCluster
Next thing is run  until *loadDeformers()*. Theoretically you could also *Run All*, but it's not needed.  
TIP: Remember the *Selection Templates* from the builder? This is where they come in handy ;-)  
Select the mesh, and click **==BIND== -> bind to joints on selected mesh**  
Under the hood this is using the *Closest Expand* skinCluster tool.   
And then test it using the Blink Ctrl. 
![Alt text](images/face_eyelidJointsAndSkinning.gif)     
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
![Alt text](images/face_splineLidCtrlCurves.jpg)  
Make sure you export the weights of those curves. Btw, when you use **Export -> Deformers** on those curves, you'll notice he 
exports all three skinClusters. You could theoretically delete the 2 unchanged ones, but they don't cause many issues,
so I wouldn't bother. 


### Eyelid Splines - Zipper
The *splineLidSetup()* function also comes with a **bZipper** attribute.
![Alt text](images/face_eyelidZipper.gif)  
*Is it useful??*  
Animators are very divided on this, feel free to checkout this LinkedIn discussion or even put your opinion out there:
<a href="https://www.linkedin.com/posts/thomas-bittner-6bb6302_ive-just-added-eyelid-zipper-to-my-face-activity-7239912418816995329-2aJx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABy3u8BK03tH_Bovh-T4-W99NGXldU3f_g" 
target="_blank">LinkedIn Post on EyelidZipper</a>
 
### Eyelid Splines - Passer Values
On the passer of the **blink_l_ctrl** you can find those attributes. Close the eyelid and experiment with them.
![Alt text](images/face_splinelidAdjustValues.JPG)   
Mirroring and Saving those happens with the ** === DEFAULT ATTRS === ** button  
TIP: if you select the blink_l_ctrl, the shelf button **selPssr** will select the passer group.

### Eyelid Splines - Poses with Locators
You'll see a locator for each light blue cube ctrl called for example **_poseLoc__eyeSplineBotA_l__blink**
When the eyelid is in a blink state, just move around the locator to adjust the pose a bit.  
![Alt text](images/face_eyelidsplinePoseLocators.gif)   
It's a great way to make sure the lid is fully closed in case the passer attribute *overShootOnBlinkFactor* is not enough.  
Those locators are basically just get activated when *blink_l_ctrl.ty* is -1.0.  

If you want to get more in detail with poseLocators, you can also go to any pose using the blink_l_ctrl or the other 
two arrow ctrls, and click **Generate PoseLoc at Current LidPosition**.     
This creates extra locators that you can modify.   

Saving locator positions happens with the **fill PoseLocs** button

Saving the PoseLocs works with the **Fill PoseLocs** button. If you want to get rid of some of the extra poseLocs,
don't delete them directly, since this would break the setup. Instead adjust the **ddPoses** attribute (make sure 
to use the JSON Editor!) and rebuild.

TIP: Very often we create the additional pose on the pose where the upper eyelid is fully down, using the lidTop_l_ctrl.
If you set this ctrl pose to NOT be fully down, in the end it will fade back to default when the ctrl is fully down.
Which can be unwanted behavior. 

### Eyelid Splines - BlendShape Correctives
If the PoseLocs are not enough, you can also go more in detail with sculpting shapes. For that the **Shape Editor**
needs to be understood.  
When you are using the *Shape Editor*, many times doing the usual blendShapes mentioned above like *blink* are already 
enough. But you can go move into detail:  
You could create a **splineLidCorrective\*** target, that works with a similar timing as the PoseLocs mentioned above.     
![Alt text](images/face_eyelidCorrectiveLowerLid.gif)   
The names of the newly generated target might sound a little technical. That's just because it's trying to fit a lot of 
information into the target name. Basically it's having the lowerlid position and upperlid position in 
percentage separated by **X**. And if there's an **n** before a number, it means the number is negative.  
*"splineLidCorrectiveX030X"* = lower lid 30 % up, nothing is after the second X therefore no pose for upper lid  
*"splineLidCorrectiveX010X089"* = lower lid is 10 % up and upperlid is 89 % down.   
TIP: the lower lid up as shown in the gif above is actually very common. 
Often we add that shape but keep it unchanged, just to create a combo with the *squint*.

   

## Eye Lattice Ctrls
![Alt text](images/face_eyelattice.gif)  
Just turn on the *eyeLatticeCtrls()* function and specify the eyeBall geos (**sLeftMeshes**, **sRightMeshes**), and the mesh that has
the eyelid geos (**sSkinMeshes**).    
After building, you'll have to fix the eyelid weights. It's best done with **Weightmaps -> Flood** and the *Replace Absolute* option.  
![Alt text](images/face_eyeLatticeWeights.jpg)  
And you are done. In many cases you might want to adjust the ctrl shapes a bit so they aren't buried inside the mesh.


# Brows
## BlendShapes
The blendShape targets that you can sculpt in the ShapeEditor are:

* innerBrowDown
* innerBrowUp
* browIn
* browOut
* outerBrowUp
* outerBrowDown
## Splines
If you want a spline rig with a ton of ctrls, use the *browSplinesSurface()* function. 





# Lips




# Face Tweaker Ctrls
Remember *Tweaker Ctrls* in **body**? The Tweaker ctrls we are talking about here work with the same logic, and most
things here you could theoretically recreate with what you've learned in Tweaker Ctrls before. But the functions 
here are mainly just engineered a bit more for facial rigging purposes. 

Apart from the **sockets** we usually just use those tweakers on blendShape driven setups. If you are already using
spline setups such as *splineLidSetup()* or *browSplinesSurface()*, they won't be that useful since those spline
setups already come with a lot of control.

Currently we have those functions:

## TWEAKER_lids 
Those are for eyelids. Great for when you have blendShape driven Eyelids, and you just want to give animators some
extra control
## TWEAKER_sockets 
That's the eye sockets. On cartoony characters animators almost always expect them.
## TWEAKER_lips
This one's a bit more fancy. It's got the **bSplines** attribute which gives nicer deformations and you can use the
**SkinCluster -> ClosestExpand** tool for binding them.   
If you set the bSplines attribute to False, it's best to skin the lips just with the flood tool - but open the Jaw
so it finds the proper closest vertices.
## TWEAKER_browsSimple
Nothing fancey, just 3 controls per side


# Lip Zipper
For the lips there are 2 ways to to the zipper.
If you are using **bSPLINES** in the *baseMOUTHCtrls()* function, you can turn on the **bZipper** attribute.
Or you can do the *postZipper()* function, which is creating a set of extra joints and an additional skinCluster
