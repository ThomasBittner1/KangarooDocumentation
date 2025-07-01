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




