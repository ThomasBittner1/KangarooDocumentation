The Shape Editor is a tool for modeling Facial Shapes (targets).  

!!! info 
    If you prefer watching videos, on this one you can jump down to [Video](#video). But keep in mind that some menu options
    changed since the time of making that video.

You can open the *Shape Editor* with the shelf button ![Alt text](../images/shapeEditor_shelfButton.jpg) 


![Alt text](../images/shapeEditor_ui.jpg)     
On the left side of the UI you see all the Main Targets. And on the right side you see the Combo Targets.


## It's NOT the Pose Editor!
You might find a few similarities to the [Pose Editor](../body/poseEditor.md), but the architecture and how we
use it is quite different:   

- The *Pose Editor* runs on the actual rig, but the *Shape Editor* runs on another file that gets imported in the *importBlendShapeFile()*
and gets applied to the rig in the function *blendShapesAndSliders()*
- While the *Pose Editor* focuses on how shapes are driven and can add shapes on its own, the *Shape Editor* mainly (apart from combos) is just
about sculpting and managing the shapes.

## Getting Started
You can select any polygon mesh, and click the **<<** button:    
![Alt text](../images/shapeEditor_initiate.gif)  
If that polygon mesh wasn't used with the *Shape Editor* yet, it'll ask you to choose a *Target List*.   
By default you just have *cartoon* and *general*. If you are creating a blendShape rig where you want to do most 
shapes including mouth, eyes, etc with blendShapes - choose *general*. But if you are doing a rig where you want
do do most tarets with splines, then *cartoon* is a better start, because it only lists the targets that doesn't 
have spline rigs.  

*What did he do under the hood?*  
He created a new blendShape node. And all the Targets that you see in the UI are basically blendShape Targets on 
the blendShape, just like you've already used before:    
![Alt text](../images/shapeEditor_blendShape.jpg)  

!!! info
    While in the gif above I just selected vertices and moved them, you can do a lot more. For example you can use
    the sculpting tools (**Mesh Tools -> Sculpting Tools**) or use some Kangaroo Geometry Tools such as the **Match**
    or **Smooth Vertices** tools.

!!! note
    You are not limited to just *general* or *cartoon*! Later in [Adding More Main Targets](#adding-more-main-targets)
    you'll see how to either create your own custom lists or just add targets to your existing collection. 

Now to sculpt some main targets by clicking the *Edit* button and sculpt:
![Alt text](../images/ShapeEditor_EDIT.gif)  

!!! note
    Here we have a similarity to the *Pose Editor* but also a difference. While in the *Pose Editor* you also have those
    *EDIT* buttons that you use to sculpt the Targets, in the *Pose Editor* you have to select the meshes, while in the
    *Shape Editor* it just does it on all the meshes that are in the collection. 


## Combos
### Combos - Create Them
Combo targets is the Table on the right side. You can create any combination between 2, 3, 4, ... Main Targets. Most of the
time we create combination of just 2 targets. Sometimes 3, and very rarely 4.   
For a combination of 2 targets the combo would be called for example *cornerUp_upperUp*. A combination of 3 would be
*cornerUp_noseWrinkler_upperUp*. It's basically the main targets' names ordered alphabetically and separated by a single \_.
!!! note 
    You will never have to name them yourself, the tool takes care of it. You just need to be aware that whenever you create a *Main Target*
    yourself, it *cannot* have the \_ sign in there.

Creating them is easy, just select the main targets, right click -> **create combo Targets**:  
![Alt text](../images/shapeEditor_comboTargets.gif)
### Combos - Multiply/Minimum
In the gif above you can see that in the end we switch between the evaluation modes *Muliply* and *Minimum*.  
*Multiply* means that the main targets are just multiplied. So if *cornerUp* is activated 0.8 and *upperUp* is activated 0.5,
the combination will be 0.4 (0.8 * 0.5).  
And in *Minimum* in the same example it would be 0.5, because 0.5 is the smaller one between 0.8 and 0.5.  

Both modes have pros and cons. If you use *Multiply*, the result will be smoother but the issue is that the shape will not 
be driven linearly while all main targets are being activated the same time. For example if you have 2 main targets that are both 
activated as 0.5, the combo target will be 0.25. But ideally it should also be 0.5. Look at this example where we have
a combination of 3 Main Targets. See how it moves slower at smaller values, and then speeds up at higher values?
![Alt text](../images/shapeEditor_multiply.gif)  

If you need it to run linearly, you can switch to *Minimum*. If all main targets are 0.5, the combo target would be 0.5, too. But *Minimum* has
the ugly disadvantage that it's not as smooth as *Multiply*. In certain situations you'll find that as one main target is being 
activated slowly, the combo might suddenly change from getting activated to not reacting.  
Look at this example. See how it moves more linear, but if I move one alone it starts activating at one point? Animators hate that!
![Alt text](../images/shapeEditor_minimum.gif)  

!!! warning
    The disadvantages of both modes (*Multiply* and *Minimum*) are only getting worse the more Main Targets you use for the 
    combo. So keep it to a minimum! Any combination of more than 3 targets can get very nasty.

### Combos - add Percentage
When you open the blendShapes.ma on the *THOMAS* asset, you'll see a combo called jawOpen50_mouthClose. This just means
that the jawOpen will only go to 0.5 (50 %):  
![Alt text](../images/shapeEditor_comboWithPercantage.gif)   
Try it out! But don't overuse them. The art of sculpting shapes is making this work with the simplest logics. But if you
do need the extra complexity, it's there.  
Changing and adding percentages happens through the marking menu:  
![Alt text](../images/shapeEditor_setPercentage.jpg)   


## Extra Sliders
At the bottom you see a lot of sliders. Those are just representations of how the rig will later set them up. So they are basically
a great way to get a feeling of how they will work later.   
On each slider you could also isolate the targets with the right click menu, so you can see what targets are driven by them.   
Open the Shape Editor File from the templates asset *THOMAS*, and play around with the sliders:  
![Alt text](../images/shapeEditor_sliders.gif)  


## Inbetweens
You can add inbetweens to any Target.
![Alt text](../images/shapeEditor_inbetween.gif) 

### Interpolate
Inbetweens are basically another shape stored in the node. It may not appear like this at first because when you apply the 
inbetween, it gives it a default shape which is the interpolated shape at the time of when you apply it.  
BUT if you change the Full Target, the inbetween will NOT change.  
But there's a solution to it - you can re-interpolate the inbetweens. You'll loose the shape that you sculpted on the inbetween, but
it'll follow again that the full shape does. You'll see the options on the right click menu:    
![Alt text](../images/shapeEditor_inbetweenInterpolate.jpg)   

!!! note
    You'll see the words *All Inbetweens* and *Closest Inbetwween* a lot in the *Shape Editor*. It's relevant when you 
    have more than one inbetween. So in the picture above where there are 3 inbetweens (red marks) the current weight
    is closer to the first one, therefore the *Closest Inbetween* would only touch the first one. 

!!! warning
    When the *blendShapesAndSliders()* adds the blendShapes, the logic of inbetweens is a bit complicated because of a few
    mathematical challenges on how those inbetweens work. This means in certain situations you might find things behaving a bit strange.   
    It's recommended to keep inbetweens to minimum. And if you do use them, watch out for the results carefully.


## Adding more Main Targets
### Custom Targets
### Generating TargetList File


## Video
To see it in action, you can watch the video below. But keep in mind that some menu options changed a bit!
<iframe width="560" height="315"
src="https://www.youtube.com/embed/cEBJ-tPLMuU"
title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

