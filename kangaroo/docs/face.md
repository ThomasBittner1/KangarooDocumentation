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

## Eye Limbs
For the eyes you have 3 specific limbs:

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
## BaseLidCtrls
The function *baseLidCtrls()* just creates those three arrow ctrls.

## Simple Lid Setup
If you turn on the function *simpleLidSetup()*, you'll get those locators that you can move around


## BlendShapes
the *blendShapesAndSliders()* function is using the blendShapes mentioned below. If you are doing the blink
with just blendShapes, it's advisable to also turn on the *TWEAKER_lids()* function, since animators might
want some extra behavior.

**blink_l_ctrl** is triggering those blendShapes:

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

## splineLidSetup
The function *splineLidSetup()* is creating splines that take care of a proper blink and some additional joints

### Eyelid Zipper
The *splineLidSetup()* function also comes with a bZipper attribute.   
If you are struggling with the idea if you should add it or not, you might find this discussion useful:
<a href="https://www.linkedin.com/posts/thomas-bittner-6bb6302_ive-just-added-eyelid-zipper-to-my-face-activity-7239912418816995329-2aJx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABy3u8BK03tH_Bovh-T4-W99NGXldU3f_g" 
target="_blank">LinkedIn Post on EyelidZipper</a>
 
 


## Lattice Ctrls
![Alt text](images/face_eyelattice.gif)  
Just turn on the *eyeLatticeCtrls()* function and specify the eyeBall geos (**sLeftMeshes**, **sRightMeshes**), and the mesh that has
the eyelid geos (**sSkinMeshes**).    
After building, you'll have to fix the eyelid weights. It's best done with **Weightmaps -> Flood** and the *Replace Absolute* option.  
![Alt text](images/face_eyeLatticeWeights.jpg)  
And you are done. In many cases you might want to adjust the ctrl shapes a bit so they aren't buried inside the mesh.

# Lips



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
