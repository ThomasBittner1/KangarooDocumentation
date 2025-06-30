
# Brows
## BlendShapes
The blendShape targets that you can sculpt in the ShapeEditor are:

* innerBrowDown
* innerBrowUp
* browIn
* browOut
* outerBrowUp
* outerBrowDown

!!! Note
    There are some additional corrective targets that can be sculpted, but those are only available when you use the
    Splines as shown below

## Brow Splines
If you want a spline rig with a ton of ctrls, use the *browSplinesSurface()* function. On the brows the control set
is different to the control set you get with blendShapes.
![Alt text](../images/face_browSplines.gif)


### Brow Splines - Blueprints
And those joints are sliding along the two nurbs surfaces **surface_forehead** and **surface_forehead_eyeSocket**
![Alt text](../images/face_browSplines_surfaces.jpg)  
Most joints are sliding along the *surface_forhead** surface but the ones below the main line are sliding along
the *surface_forehead_eyeSocket*  
To create those surfaces, first click the button **Import Default Surfaces** and shape them.    
!!! tip 
    To get them shaped as good as possible to the forhead, the easiest thing might be to shape it roughly
    and then create a shrinkWrap with option *closest* to snap it to the head geo.  
    Then select vertices and click the button **Create Left Brow Curve**. You adjust the curve after, the cvs of that
    curve don't necessarily need to be on the vertices of the skin mesh.  

Then click **Create Left Brow Orientation Locators** and orient those locators. It's best to have their *up* axis
go along the lines of the surfaces, otherwise you might get the feeling the joints are moving a slightly different location:  
![Alt text](../images/face_browSplines_orientationLocators.jpg)  

 
### Brow Splines - skinCluster



### Brow Splines - PoseLocs


### Brow Splines - Correctives


