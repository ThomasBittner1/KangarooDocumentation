
Kangaroo's Skinning Tools are an alternative to weight painting. The idea is that you select vertices with soft selection,
and then click the buttons.  
Might sound like a big change to some people, but if you master the big collection of tools available here, the big chance
is that you'll be much faster than if you were following your original painting approach.
!!! info "Video"
    Also interesting subject on this - [Why can I not paint Weights Kangaroo Skin Tools](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=15m57s).


At the bottom there's a collection of tools. Remember - *all* tools work with soft selection! If you are not doing 
softselection, you won't be utilizing it properly.

And try to use *Undo* and *Redo* as many times as possible. The idea is to overshoot some values -> apply -> undo if
it was too strong -> adjust values accordingly -> do again ...  
The advantage with this workflow is that this usually keeps the weights cleaner, compared to if you do a million 
painting strokes with a painting tool....

The best thing to learn about the skinning tools is actually by watching the [Video](https://www.youtube.com/watch?v=z4GYYWd6gS4).  
This page is more just a *table of contents*, and actually you'll see a lot of direct links to the proper time stamps in there.


The skinning tools work for multiple skinClusters, and the attribute is **Choose SkinCluster**. If you leave it empty,
it chooses the default one. 
!!! info "Video"
    Check [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=8m13s) to see in action how *Choose SkinCluster* works.
 


## Flood
The name is from the Maya *Flood* button, but here you have more options:  

-  Select more than one influence at the same time. It assigns the weights by closest joints to each vertex, and smoothes
on top (you can control the smoothness with the *Smooth Steps* 


### Joint Lines
The joint line for each joint is just the line from the Joint to the its *Joint Child*.   
*But what if a joint has more than one children, which one will he pick??*  
By default he takes only joints that are in the selection. But this can be a problem sometimes when the child joints
are not in selection.  
So whenever you do have that issue, you can switch *Joint Lines* to *Yes And Include Children Not In Input For Closest Joints*   

!!! info "Video"
    Flood is the first thing shown in the [Video](https://www.youtube.com/watch?v=z4GYYWd6gS4)



### Distribute 
*Distribute Weights* is an option inside the *Flood* tool. This gets overlooked a lot, but it's one of those powerful 
features that actually make Kangaroo Skinning Tools special!   
It first gathers all the weights assigned to the selected joints (in the flood menu), and then reassigns the weights based 
on closest joints to each vertex.
This is useful for:  

- when you changed the joint positions, many times with this you can just clean up the skinning in one click
- if you've bound them with normal *Flood* settings, but with bad *Smooth Step*. Correct the smooth steps and Flood again


!!! tip
    Most of the time when using the Distribute options we can just select the whole mesh. Because he won't touch the
    vertices that didn't have weights from the selected joints.

    
!!! info "Video"
    Check Distribute Option in the [Video from 1:32](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=1m32s)




## ClosestExpand
*Closest Expand* tool is for situations such as lips or eyelids, where you have joint splines and each joint is located
on a vertex.  
It basically finds the closest vertices for each joint, and then expands the influence. How much you expand is defined
with the *Expanded Full Weight Loops* and *Expanded Fade Out Loops".  
The tool also works for high density meshes where you are skipping joints, for example you only have a joint for each second
or third vertex. If you are skipping many joints, keep an eye on the *Max Connection Path Count* option.  

This tool also comes with a **Distribute** attribute. The idea is the same as with the one in the *Flood* tool - it first
gathers all the weights that are already on the joints, and uses that as a mask for the new operation.   
Make sure to set *Full Weight Loops* to a higher value such as 30, because the fade out amount is already handled through 
the previous weights.  
This is useful when you've already generated the weights and then you did changes to the setup.  

!!! info "Video"
    Check [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=12m15s) to see *ClosestExpand* in action  



## Smooth
Well - what can I say, the properly most popular tool in the set.  
But don't overuse it!!

!!! info "Video"
    Check Smooth Tool [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=3m26s)


## Average
This averages the weights. Often you use it on buttons. It can also average islands separately, which is for when 
for example you have a lot of buttons combined into a single mesh.  

!!! info "Video"
    Check Average Tool [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=4m08s)


## Transfer 
Transfers weights from another mesh. Make sure you try using it together with Vertex (Soft) Selection!

!!! info "Video"
    Check Average Tool [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=4m45s)


## IntTransfer
Like Transfer, but transfers from within the same mesh.  
To use that properly, just select a few vertices **without** Soft Selection. Because the algorithm will for each selected
vertex find the the closest non-selected vertex and transfer from that.   

!!! info "Video"
    Check [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=11m32s) to see *IntTransfer* in action  


## Copy/Paste
Select a vertex to copy from, and click *Copy*, then select vertices you want to paste to, and click *Paste*.  
On the *Paste* you can also do Soft Selection, and also you can paste onto a different mesh. It'll just ask you
if he should assign the new influences.
!!! info "Video"
    Check [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=18m27s) to see copy/paste in action.   


## MirrorTopo
This is using the Edgeflow Algorithm where he takes an edge in the middle, and searches through the whole mesh to find
which vertex belongs to which.  
It works on meshes that have different shape left and right, as long as the topology is symmetrical. By *Topology* we refer
to the way how edges are connected together.
!!! info "Video"
    Check [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=18m57s) for better explanation.   



## Mirror
For all cases where we don't have Symmetrical Topology, we use the standard *Mirror* tool. This also works with multiple
meshes selected, and he can mirror from left to right meshes.

**Mirror Middle** is the second button in that tool - it just averages left/right, best apply it just to vertices close to the symmetry line.



## Move
Moves weights between joints. 
You specify joints in the tab. Weights from joints in the left column get assigned to the joints in the right column.  
*Sounds simple, right?* Well, it also has a ton of hidden options:  

- You can move weights from *one or more than one joints* to *one or more than one joints*.  
- The left column in the tab can have * and ? in the name.
- For the right ones - if you add a comma (","), he does text replacing (left part of the comma with right part)
example: "^, namespace0:" will find the To joints in the namespace "namespace0:"
- You can also add joints to the columns by right click *Set From Selected*

!!! tip
    This is also a great tool to use in Python for creating your own tools.
    
    ``` python
    import kangarooTabTools.weights as weights
    weights.moveSkinClusterWeights(sMesh, xJoints={'jnt_m_faceZero':'jnt_m_zero'})
    ```


## Prune
Similar to the Maya prune, but first assigns stuff into weight islands. This means you can prune with a higher value
without getting weight artefacts.
!!! info "Video"
    Check [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=16m37s) for better explanation.   
    Actually to get the full picture it's best starting from 
    [Why can I not paint Weights Kangaroo Skin Tools?](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=15m57s).


## MaxInf
This makes sure that each vertex has only a specific amount of influences. Very important when you are rigging for Game Engines.
Only works on full meshes (no vertex selection)


## Normalize
Nothing fancy, just does what the maya normalize does, except that you can choose a specific skinCluster



## Python
You can also run those tools in python
!!! info "Video"
    Check how to run those tools in python [here](https://www.youtube.com/watch?v=z4GYYWd6gS4&t=3m32s)
