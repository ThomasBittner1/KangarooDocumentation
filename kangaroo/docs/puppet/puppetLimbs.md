
This document gives you an overview about all the limbs that are there.


## Feature Ctrl Type
The *Feature Ctrl* is a ctrl that holds some of the global arguments for this limb, such as FK2IK Switch or some extra visibiltiy switches.  
You set it with the attributes called *Feature Ctrl Type* and *CustomFeatureCtrlName*.   
For the *Feature Ctrl Type* you have 3 options: *Custom Ctrl*, *New Global Ctrl* and *Shape on All Ctrls*  
![Alt text](../images/puppetLimbs_featureCtrlType.jpg)
#### Custom Ctrl
It's the simplest one, you just specify the name of a ctrl in the *Custom Feature Ctrl Name* field such as *cog_ctrl*.   
But make sure that in the hierarchy this ctrl is built before the current limb!

#### New Global Ctrl
This is probably the most widely used one, it creates those cross ctrls:  
![Alt text](../images/puppetLimbs_featureCrossCtrls.jpg)  

#### Shape on All Ctrls
Animators often ask for the global attributes to be accessible on each ctrl. But in Maya you cannot add one attributes onto more than
one ctrl, and the closest thing how to solve this is putting the attributes on a shape node. In Maya you can create one shape node and
make it appear on more than one transform (ctrl).  
![Alt text](../images/puppetLimbs_shapeNode.jpg)   
!!! warning
    Some external tools such as *Studio Library* don't support this. And writing your own animation tools will likely be more complex 
    since you always have to check on the ctrls if there's a shape node.

## Simple Limbs
The most simple limbs are the **SingleTransform** and **SingleBone**. They are really just simple one ctrl limbs. Here's a few examples we use them for:  

- placement_ctrl (*SingleTransform*)
- cog_ctrl (*SingleTransform*)
- head_ctrl (*SingleBone*)
- jaw_ctrl (*SingleBone*)

You have a quite a lot of options about how much translation, rotation and scale values you want to expose. And also if you want pivot ctrls or super ctrls.

!!! warning
    Be careful with the Scale options. If this limb has child limbs, it's not good to expose all or some scale axes, since 
    scaling things non-uniformely will not pass well onto the other child limbs.  
    So whenever you have child limbs, either switch between **off** or **uniform**. And if you do need to expose all
    or some scale axes, make sure that limb doesn't have any child limbs.

They also have some more advanced features of *singleTransform/singleBone*, but those are discussed in other documents: 
[Bell Collider](bellCollider.md), [Springs](dynamics.md#springs), [Feature Ctrls](tweakerCtrls.md)  


## Limb - Spine

The **Spine Limb** is probably the most multifunctional limb.
While we use it - as the name suggests - we also use it every time we have a simple FK chain.

<!--, Cables, Tails, Straps, Pony Tails... -->


### Blueprints
There's 2 attributes - the *blueprint joint count* and the *blueprint joint count*.   
It's best to start with setting them the same value, so you can control where which joint is.
But there's 2 situations where you'd want to make the blueprint count lower:  

- Your spine joint count is very high (> 8) and you just don't want to take care of so many blueprint joints  
- You want to quickly add more spine joints without having to go into the blueprints  

<iframe width="560" height="315"
src="https://www.youtube.com/embed/kEA6R8v1gDk"
title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>
In version 5 the spine got a big update, where the **fkSpline** got those extra features:

- Reverse FK
- preIK in fkSpline (better for performance compared to switching to ikSpline)


### Spine Feature - fk
Let's start with the simplest case. Just some completely unfancy fk ctrls.
![Alt text](../images/puppetLimbs_simpleFk.gif)  

!!! tip
    For the simple fk, it's recommended to keep *blueprint joint count* and *blueprint joint count* as
    the same number, so you can specify exactly where the joints and ctrls should be. 

## Limb - ArmLeg

## Single Limbs

## Limb - Belt

## Custom Limbs
Yes, you can define Custom Limbs. It's rare that we need to do that since the existing ones have a lot of options,
and additional features might be easier to handle by just adding additional functions.  
But if you do want to go into detail and make your own limb, you can find how to do that [here](../python.md#custom-limbs)

!!! warning
    A decent Python level is required for creating Custom Limbs! Before writing your own custom limb it's recommended to see if you can 
    solve it with simple [Python Functions](../python.md#simple-way-of-adding-a-function)