---
title: Kangaroo's Pose Editor (Maya)
description: Improve your deformations with just a few clicks
---

From Kangaroo Builder Version **5.16** you can also use the Pose Editor on rigs that are *not* built with Kangaroo Builder.

Keep in mind that this workflow has been tested and verified with *mGear* and *AdvancedSkeleton* rigs, and therefore should
also work for all other maya rigs out there. 
However since it hasn't gone through completed productions with non-kangaroo rigs yet, this part is still *experimental*.  
So if you are running into any issues, please don't hesitate to reach out in the [Forum](https://kangaroobuilder.discourse.group/){target="_blank"}!
We'll answer those requests with high priority.


To open the Pose Editor on standalone, start by running these lines in Python:    
``` python
from kangarooTools import poseEditorStandalone
poseEditorStandalone.showUI(sDefaultCtrlTwistAxis='x') 
```

!!! note "Ctrl Twist Axis"
    *MGear* and *AdvancedSkeleton* usually have their *Ctrl Twist Axis* at **X**, so you can leave the default when you have one of these rigs.
    But if your twist axis is mostly **Y** (as on Kangaroo Rigs), then switch that flag to **Y**.  
    Keep in mind this only affects the default options when you create interpolators. Adjusting the interpolator options manually after
    interpolator creation has the same outcome.

And in there open the Pose Editor with this button:  
![Alt text](../images/poseEditorStandalone_openPoseEditor.jpg)  



## Export/Import
With the **Export** and **Import** buttons you can export/import the setup.
!!! warning
    Do **NOT** import it twice! Importing it is only meant to do on a clean rig that you've rebuilt. If you are not rebuilding 
    rigs, import/export wouldn't help you much at this point.


If you want to import by script (Python), you can do it this way:
```python
from kangarooTools import poseEditorStandalone
poseEditorStandalone.loadFromFolderPath(sDir)
```

## Reusing Interpolators from another character {#reuseinterpolators}
Reusing Interpolator from another character easily works with the [Export/Import](#exportimport) options.  
But you can also copy/paste a few interpolators, using the [JSONEditor](../builder/jsonEditor.md). For more info, check further below at [Making adjustments on exported data](#making-adjustments-on-exported-data)


## Model Update
If you have a model update, and you can rebuild your rig - open the **poseEditorExports.ma** file, and use the model change
buttons - all at the bottom of the starter UI:  
![Alt text](../images/poseEditorStandalone_modelChange.jpg)  
Basically you just select the new model (drag it into your scene first), and the corresponding *_poseEditorBlendShapes* mesh,
and click those buttons. 
For more information check [Model Change](poseEditor2.md#model-change)


## Making adjustments on exported data
One big advantage of exporting and importing again ist that you can adjust the data outside your rig scene.  
When you click **Edit "poseEditorData.json" File**, it opens the [JSONEditor](../builder/jsonEditor.md) on the data file.
In there you can delete, duplicate, copy/paste things from another character, ... 

