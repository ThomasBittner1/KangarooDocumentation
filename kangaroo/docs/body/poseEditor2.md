## Model Change
Whenever the model changed, open the *poseEditorExports.ma* file from the *Export -> MayaImp* tool,
and import the new model. Then select the new model + the corresponding Blendshape Mesh you have in scene:    
![Alt text](../images/poseEditor_selectionForModelChange.jpg)  

And then you have 2 buttons: **Warp** or **BlendShape**  
You can do *blendShape* when the topology is the same and you used the default *invertExport* option. For all other
cases do *Warp*  
![Alt text](../images/poseEditor_modelChange.jpg)  
!!! note
    The selection order doesn't matter here. But it's important that the model you select has the same name! 


## Sharing Interpolators between Rigs
It can be very helpful to share Interpolators between characters.
And there are 2 ways:  
### In the PoseEditor UI
Right click on the interpolator -> *Copy*. Then go to your other character, and right click -> *Paste*  
![Alt text](../images/poseEditor_copy.jpg)  

!!! warning "Known bug"
    Currently the *Paste* option doesn't show up unless you click on an existing interpolator. So if you want to paste
    an interpolator to a new character that doesn't have any interpolators yet, just create a dummy one that you delete
    again after.

### With the JSON Editor
Once you exported the setup with the *Fill and Export from Scene* button, you can open the *JSON Editor* by right click 
on **ddInterpolators** attribute:  
![Alt text](../images/poseEditor_jsonEditor.jpg)  

Then having the interpolators you want to transfer selected, right click -> **Copy**. 
And then right click -> **paste** on the same location in the other character.

Check [JSON Editor](../builder/jsonEditor.md) for more information.

!!! note
    While you could also share Target Infos using the JSON Editor, we don't do that as often as sharing interpolators.


## Useful tools

### Multiply
The multiply tool just multiplies by a certain value. In this gif we just multiplied things by 0.0 to fix some artefacts:  
![Alt text](../images/poseEditor_multiply.gif)  
But it doesn't stop there! You can also use the multiply tool to improve your shapes by using vertex soft selection and maybe even 
multiply by something higher than 0, such as 0.3. 
!!! note
    You see a similar tool under the right click menu of the targets called *Erase*. That's pretty much the same as 
    multiply by 0.0.

### Warp
The warp tool can warp secondary meshes. Most of the time we sculpt things on the main mesh such as the skin. And then
we just warp to secondary meshes such as costume. To do that, put the skin mesh (*body_geo*) into the **Master** field,
select all the targets, select the mesh in the scene, and then **TOOLS -> Warp ..**.
![Alt text](../images/poseEditor_warp.jpg)  
!!! warning "Known Bug"
    At this time the warp tool expects you to already have the mesh inside the mesh table and have it activated for all targets.
    Basically what you get when you check the mesh having all targets selected. If you don't do that, it'll either
    quietly do nothing, or give you a strange error.
!!! note
    Don't forget to have the mesh that you want to warp selected in scene. Btw, you can also do vertex and soft selection
    for that, and it'll only warp the vertices you have selected.


### Blend IDs
If you have another mesh that has the pose sculpted already, the *Blend IDs* tool can help you with that, also under 
the **TOOLS** button.


