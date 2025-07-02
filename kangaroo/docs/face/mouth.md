For lips you also have option between blendShapes and splines.  
But what's different to the other setups is that on the lips you do both ways with the same function: *BASEMouthCtrls()*

## Blueprints
The first part of the blueprints is the same between blendShapes and Splines

### Blueprints - Inner and Outer Curves
First select the closest (or smallest) loop of vertices, and press **Create Inner Curves and Locators**
![Alt text](../images/mouth_edgeloop.jpg)    
This gives you this blueprint curve with locators. Make sure the locators are at the outer corners, since those
are separating the top and the bottom.  
![Alt text](../images/mouth_blueprintcurve.jpg)    
Now there's a very important and easy to miss attribute - **bFlipInnerMouthCurves**. On many characters the lips
are so close together, that in the middle the upper vertices are lower than the lower vertices. If this is the case,
then you'll need to set that attribute to True. Otherwise False.    
![Alt text](../images/mouth_bFlipInnerMouthCurves.jpg)    
!!! warning
    This gets forgetten easily! Make sure to check this on every character.
 

And then select the loop of the outer corner of the lips, and press **Create Outer Curves and Locators**
![Alt text](../images/mouth_edgeloopOutside.jpg)  

### Blueprints - Mouth Pivot
Then click **Create Mouth Pivot**. Imagine if the mouth moves left/right in a sperical motion, where should the center be?  
That's where you place the *bp_m_mouthPivot*

![Alt text](../images/mouth_mouthPivot.jpg)  

### Blueprints - Slide Surfaces
This is only for spline rigs. If you leave the *bSPLINE* attribute as False, you can skip this.   
But for splines, this is the surface that the controls slide along. In most cases this is better to represent the shape
of the teeth, instead of the shape of the skin.  
For now just shape it roughly, but very likely you'll be revisiting this later and adjust the shape.
![Alt text](../images/mouth_slidingPlane.jpg)  

## Upper and Lower Ctrls
The Lip Ctrls (Upper and Lower Lips Ctrls) are the only dynamic ones, where you can specify how many you'd like.  
And you do that with the **fLeftLipParamPercs**. Now thats's a bit technical and needs to be understood.
If you set the attribute to *[0.20, 0.33, 0.5]*, you'll get this many lip ctrls:  
![Alt text](../images/mouth_lipCtrls.jpg)  
*Is it too many?* Yes, for a human most likely. But for dogs thave have long mouths, this could be the right amount.  
For humans you might want to set it to *[0.33, 0.5]*, which means one in the middle (yellow) and one on each side.
Or if you don't want the middle, just set it to *[0.33]*
!!! note
    You see how we don't specify parameters after 0.5? That's because as the name already says it, we only specify 
    the left ones, and the right ones are mirrored. 



## BlendShapes
Here you can see a list of blendShapes. Those can all be used with or without the *bSPLINES* attribute.  
If you set *bSPLINES* to True, then the blendShapes will act as correctives.  

Corners (*lipsCorner_\[lr\]_ctrl*):
```
    cornerIn
    cornerOut
    cornerUp
    cornerDown
    cornerOutUp (diagonal)
    cornerOutDown (diagonal)
    cornerInUp (diagonal)
    cornerInDown (diagonal)
```    
If you are using the diagonal ones, you need to set **bbCornerBarycentricCoords** in *blendShapesAndSliders()* to **True**.     
!!! note
    For simple rigs you'll likely get away with just the simple ones (*cornerIn, cornerOuot, cornerUp, cornerDown*). 
    Or use the simple ones and add combos, such as *cornerOut_cornerUp* instead of *cornerOutUp*.  
    But for more high fidelity rigs you'll definitely get better blending between the poses if you use the diagonal ones.


Upper/Lower Lips (*lipsTop[0-9]_[lr]_ctrl*):
```
    upperUp (upper lip raiser)
    upperDown (opposite of upperUp)
    lowerDown (lower lip depressor)
    lowerUp (opposite of lowerDown)
```    


mouth_ctrl:
```
    funnel
    lipPress
    mouthLeft
    mouthRight
    mouthUp
    mouthDown
```

Box Ctrls Translations (*mouthBot_ctrl*, *mouthTop_ctrl*):
```
    funnelBot
    funnelTop
    lipPressBot
    lipPressTop    
```

Box Ctrls Rotations:
```
    lowerRollIn
    lowerRollOut
    upperRollIn
    upperRollOut
```


!!! note
    For realistic humans it would be best to shape the **funnel** and **lipPress** according to their scientific representation 
    (one page to check about FACs is [facial-action-coding-system](https://imotions.com/blog/learning/research-fundamentals/facial-action-coding-system/)).  
    But if you are doing cartoony characters, many times animators prefer Box Ctrls and mouth_ctrl to just simply move
    the lips forward or back. 




## Splines
You'll get the splines when you set **bSPLINE** to *True*. This option came with Kangaroo V5.  
The great thing about the splines is that it's using the same controls like the blendShapes. So brings a lot of advantages:

- You can use all the blendShapes stated above also as correctives
- you can have some characters with blendShapes and some with splines, and animators will have the same sets of controls


### Spline - The Joints
For the spline rig there are the Big Joints (**jnt_l_botMouthSplineBig_???**) and the Small Joints (**jnt_l_botMouthSplineSmall_???**). 
By default they are a joint at each vertex on the loop.
But if you have a character that has a ton of joints, then you can set the **iSkipSplineJoints** value to something higher than 0.
For example if you set it to 1, it means it skips every other joint. If you set it to 2, it always skips 2 joints until the next
one.  
![Alt text](../images/mouth_splineJoints.jpg)    
*Why are they called Big and Small Joints?*  
That's becuase the bigger ones are bigger, ..  
But also because the bigger ones have (should have) a wider range of influence. Basically the Small Joints should just affect the lips 
since they are taking more rotation from the ctrls.  
The Big Joints take less rotational movements from the Ctrls, and therefore are more stable to use for the area around the lips.     

There's 2 more special joints, which are **jnt_l_lipsEnd** and **jnt_r_lipsEnd**. Those sit at the corner, and it's best to bind
the area left and right of the lips. Basically part of the cheekcs

### Splines - Skinning
At this point before skinning the Mouth Spline Joints, it helps a lot if the jaw is already skinned nicely. But don't worry - 
if you do want to adjust the jaw weighting later, there's nice buttons that transfer skinning from spline joints to jaw/head and back.

!!! note
    While you are free to use your own skinning tools on the mouth splines, it's recommended that you follow this workflow, since it
    involves tools that are made specifically for this setup.  


To get the Mouth Spline Skinning tools, click this shelf button:  
![Alt text](../images/mouth_faceSkinShelfButton.jpg)  
Which brings up this UI:   
![Alt text](../images/mouth_faceSkin.jpg)

#### Big Joints
The best thing is to just start with the button **Add to Big Joints** when you have the whole head selected. 
But first set the **Rigid Loops** and **Fade Loops** values.
It's using the **ClosestExpand** SkinCluster tool under the hood, therefore it's best to check that for reference.

!!! tip
    Make sure to use the *Grow Selection* (CTRL >) and *Shrink Selection* (CTRL <) Maya commands and Soft Selection!

At this point it's best to load the Rom Animation by clicking the button **Create Rom Animation**.
Now you can do a few combinations of:  

- clicking the *Add to Big Joints* on different vertex selections
- smoothing with just one iteration (there's a **Smooth** button at the bottom of the UI)
- add some weights to the lipsEnd Joints using the **Move head/jaw to LipsEnds** button


!!! warning
    You might be tempted to use the smooth tool a lot. But please don't overdo this. And if you use the smooth in the skinning tools,
    make sure to NEVER do more than one iteration when it's about the face. Unless it's a very high resolution face.

At this point try to get it to look clean, but don't worry too much about the details yet. That part comes later.

#### Small Joints

Once you find that it's sort of holding up the corner shapes, select the vertices of just the lips (or the whole face and lower the *Rigid/Fade Loops*),
and click **Add To Small Joints**.  
To see the results, check the roll movements a bit later in the Rom that you applied before.


### Splines - Pose Locators


### Splines - NLF Setup
*createNlfSetup()* can be very useful for characters that show a strong NLF line that you'd like to maintain on the corner shapes.  
It is another function, but taking a lot of info from the *createBASEMouth()*, and would only make sense if you have its *bSLINE* attribute enabled. 

### Splines - Cheek Setup

