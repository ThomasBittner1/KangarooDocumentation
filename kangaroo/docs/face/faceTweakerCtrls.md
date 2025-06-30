# Face Tweaker Ctrls

Tweaker Ctrls are some extra ctrls on top of your setup that animators can use to add some secondary behavior.

!!! info
    Remember [Tweaker Ctrls in Puppet](../puppet/tweakerCtrls.md)? The Tweaker ctrls we are talking about here work with the same logic, and most
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



# Squash & Stretch
The function *createBendSetup()* does that.