---
title: Maya Rig Builder - Kangaroo Builder
description: Learn how to use Kangaroo Builder, a Maya rigging tool for creating character rigs. Includes body rig builder, face rig builder, pose editor, and a lot more.
---


## Slide Deformer

From version 5.21 you have a sliding deformer. 
![Alt text](../images/sliding_deformer.gif)    

With a bit of setup, you can create something like this:

<video autoplay muted loop controls width="1000">
    <source src="../images/sliding_deformer_wolf.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>


Here's a minimalistic python code to get it to work. When you run that, you should have a locator that when you move it around, 
it makes the sphere slide on its own:  
```python

skin_mesh = cmds.polySphere(n="skin_mesh")[0]
ref_skin_mesh = cmds.polySphere(n="ref_skin_mesh")[0]
cmds.setAttr('%s.v' % ref_skin_mesh, False)

sLoc = cmds.spaceLocator()[0]

sDeformer = cmds.deformer('skin_mesh', type='tbslide', name='test')[0]
cmds.connectAttr('%s.worldMesh[0]' % ref_skin_mesh, '%s.refMesh' % sDeformer)
cmds.connectAttr('%s.t' % sLoc, '%s.target' % sDeformer)
cmds.setAttr('%s.multipl' % sDeformer, 1.0)

```