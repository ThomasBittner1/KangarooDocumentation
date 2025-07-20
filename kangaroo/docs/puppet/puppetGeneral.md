## Puppet

Puppet is the second most important tool for building characters. It defines the main
ctrls of the character, such as spine logics, arm/leg FK/IK, Auto Clavicle, etc.
The puppet generates the blueprints.ma file (guide joints) and the puppet.rig - which then the builder uses to build the rig.

Let's look at all the cool elements in the UI:
![Alt text](../images/puppet_ui.jpg)

The first table shows the **Limbs**, and below is the **Library**. You can just drag a limb from the 
library into the Limbs. And whatever limb you have selected, you can adjust the limb attributes on the right side

## Change the Guide Joint Locations
To change the Locations, click in this order:  
1. Clean  
2. Import BP Skeleton    
3. Build BP Rig  

You'll do those things a million times, so I just did a GIF for you to show it :-)
![Alt text](../images/cleanImportBuild.gif)

Basically the **BP Skeleton** is a file with simple joints. And the **BP Rig** is a small rig
build on top of those Skeleton that helps you place it. 

Once you have the BP Rig built, place the joints using the ctrls. 

When you are done, click the button **Extract+Export Skel**.  
Theoretically it also lets you export without building the BP Rig.
**But never export without building the BP Rig!**  
**And also never open the previous BP Rig and export from there!**  
I can talk for an hour to explain why those are bad things, but here I'll keep it simple: Don't Do It!

You can however move around the joint roots inbetween importing BP Skeleton and building BP Rig. 

## Limbs
You can easily add limbs by dragging one from the libarary table into the limbs table:

To see what you can do with all those limbs more in detail, check [The Limbs](puppetLimbs.md)


## Attachers
Attachers are all about spaces. For example the Hand IK following the COG or the Spine. 
And they need to be fully understood to really use Kangaroo efficiently.  
Look at how many attachers just the arm limb has:  
![Alt text](../images/attachers_armLeg.jpg) 
And this is not even everything, with attachers you can even make things follow some deformers!    

For each of the attachers you can add/remove output points by adjusting the count value:  
![Alt text](../images/attachers_adjustCount.jpg) 
!!! note
    Not all attachers have that count value! Especially for the root you'll notice on some
    that can only one output point.

### translate/rotate/scale
You see how every attacher has either **(t)**, **(tr)**, **(r)** or **(s)**? Those specify if 
translate, rotate or scale is affected.   
Whereever you see **(tr)**, you can split it into *(t)* and *(r)*:  
![Alt text](../images/attachers_splitTR.gif)  
!!! tip
    This is very important for head or top neck ctrls. Animators always want to control the 
    position separate to the orientation.
    

### Switch vs Blend
By default it's just a switch. Animators prefer that in most cases since it's the simplest:  
![Alt text](../images/attachers_switchAttr.gif)  

If you activate the **blend** checkbox, you'll get an extra attribute for each output point:  
![Alt text](../images/attachers_blendAttributes.gif)    
Those attributes DON'T behave the same as constraint weights. Instead it's an additive system
being clamped to stay within 0 and 1.  
Basically from top to bottom they overwrite the previous/upper ones. The first one (in this case *parentA*)
is always 1.0 and locked.  
If you set *parentB* to 0.8, *parentB* has 80 % influence and *parentA* has 20 %.
If then you set *parentC* to 0.5, *parentC* has 50 %, *parentB* has 50 % also, and *parentA* has 0

!!! tip
    Animators usually prefer switch, but blend can be very useful when you setup some special rigs such as props or costumes.  


### Custom Attachers
Custom Attachers are primarily used to have some ctrls follow the the geometry or deformers. Most of the time
we do deformers, which looks like it's following the mesh but actually just has some nodes that replicate the
deformer behavior at the point where the ctrl is.  

![Alt text](../images/attachers_customAttacher.gif)  

!!! note
    Custom attachers are heavily used for [Tweaker Ctrls](tweakerCtrls.md)



## Display Attributes
### display_ctrl
In all the template characters there's the *display_ctrl* that has a lot of display attributes:  
![Alt text](../images/puppet_displayCtrl.jpg)  

And that's just a simple *singleTransform* limb with its own blueprint:
![Alt text](../images/puppet_displayLimb.jpg)  
But don't parent it around in the puppet tool! It's important that this is at the top, first limb
after the master limb (*m_placement* in this case)  

And all the limbs have display attributes to which tag (attribute) they belong to:  
![Alt text](../images/puppet_displayCtrlAttributes.jpg)     

*But what about all the ctrls generated in functions outside of the puppet tool?*  
Usually these functions have an attribute called *sDisplayAttr*:  
![Alt text](../images/puppet_displayCtrlFaceFunctions.jpg)     

!!! tip
    If you don't like the order of the attributes on the ctrl, those are easily changed on the
    *buildPuppet()* function. Just open that attribute in the [JSON Editor](../builder/jsonEditor.md), and add
    and/or reorder entries.
    ![Alt text](../images/puppet_displayCtrlOrderOfAttributes.jpg)     
    
### visibilityAttributes()
For any ctrls that are not setup-ed for the *displayCtrl*, you can use the *visibilityAttributes()* function.
![Alt text](../images/puppet_visibilityAttrs.jpg)     
Just open the JSONEditor on the *dData* attribute, and add/adjust entries. If the attribute (most left label,
*master.cuffCtrlVis* in this image) doesn't exist, he creates one. So you could even specify one that is created 
on the display_ctrl, and just set it up to also switch some geometry visibility.

### Python
In the points above we've seen how to just add simple on/off switches. But if you need anything more fancy than
that, it's best to solve that with a [Python](../python.md) function.


## Updating limbs
Every limb has versions. The is important because when a limb gets improved, you'll ususally want to keep the 
old behavior in existing characters that have already been animated.  
But if you do want to change the versions, on the right side just switch them:  
![Alt text](../images/puppet_limbVersions.jpg)  
And if you want to just switch all limbs automatically to the latest one, you can do that with the 
button **Maximize All Limbs**:  
![Alt text](../images/puppet_maximizeLimbs.jpg)

!!! warning
    Don't forget to click the **save** button!


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


## Mirror
### Mirror Limbs


### Mirror Blueprints



## Nearest Worldspace Matrix
