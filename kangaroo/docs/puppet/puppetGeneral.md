## Puppet

The Puppet tool defines the main ctrls of the character, such as spine logics, arm/leg FK/IK, Auto Clavicle, etc.  
It generates the blueprints.ma file (guide joints) and the puppet.rig - which then the builder uses to build the rig.

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

**BP Skeleton** is a file with simple joints that tells the builder where the locations are.
And the **BP Rig** is a small rig with ctrls and some logic build on top of the *BP Skeleton* that helps you place it. 

Once you have the BP Rig built, place the joints using the *BP Rig* ctrls. 

!!! tip
    A quick way of importing the model is just clicking the button **Import Model**. 
    This runs the importModel() function from the builder.

![Alt text](../images/puppetGeneral_placeBlueprints.gif)  

There's a lot of ctrls that can make the placing process very efficient, as long as you move around the ctrls in the
right order:  
![Alt text](../images/puppetGeneral_fingerBlueprints.gif)  

The feet might overwhelm you a bit at the first time:  
![Alt text](../images/puppetGeneral_legBlueprints.jpg)   
But if you have a character that just has shoes, you might be able to get rid of the toes!   
Then it becomes a little simpler:  
![Alt text](../images/puppetGeneral_legBlueprintsSimpler.jpg)   

The big ctrl in the middle with the three arrows is the one that tells the orientation of the foot. 

!!! Note 
    If you want to have the feet translate in worldspace (animators usually hate it if they are not), you don't actually
    have to put that ctrl in worldspace. Check [World Orient Ctrl](puppetGeneral.md#worldorientctrlarmlegik)

The light red sphere ctrls are the pivots that animation will get for doing things like foot roll and footRocker. For the side 
sphere you might be wondering why there's 2 on each side. That's because they also define the orientation. The pivot point
is basically in the middle and aiming to them.

!!! note
    On the hands you have the same complexity with all the pivots. Because hands also have the same rocker/roll setup, 
    except that in most cases it's barely used. 

When you are done placing the blueprints, click the button **Extract+Export Skel**.  
There are 2 very strict rules:

- **Never export without having built the BP Rig!**  
- **Never open the previous BP Rig and export from there!**
  
Always just follow the Clean/Import BP Skeleton/Build BP Rig workflow from above. It's just to keep things clean, 
and any unintentional change resulting from some bad shortcuts can get expensive when we
are talking about animation ctrls.

!!! tip 
    You can however move around the joint roots inbetween importing BP Skeleton and building BP Rig. 
    But ONLY joint roots! If you do want to move around child joints, make sure to only translate them in X. And don't
    change the sign (postive <-> negative)  
    Moving around joint roots can be useful when placing them for the first time after creation.  

!!! note
    Theoretically it does let you export without building the BP Rig, but that's not recommended it's only there
    for debugging purposes. 


## Adding Limbs
You can easily add limbs by dragging one from the libarary table into the limbs table:  
![Alt text](../images/puppetGeneral_addingLimb.gif)   
And the first thing you do after you created a new limb (and maybe adjusted some attributes) is place the blueprints.
If you've already built the *Blueprint Rig* at this point, you have to rebuild it.  
First import the *Blueprint Skeleton*. At this point you could build the *Blueprint Rig*, but often it'll make your
life easier if between building *Blueprint Skeleton* and *Blueprint Rig* you click *Create Missing BP Joints*, 
and move around **just the root** (Careful with child joints in this step!)     
![Alt text](../images/puppetGeneral_limbFirstBlueprintPlacement.gif)  

!!! tip
    For a full reference of what limbs are there, check the [Limbs Reference](puppetLimbs.md)


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
Mirroring the limbs is easy. Just right click -> miror from selected. *Recursive* means that he'll also mirror the children:  
![Alt text](../images/puppetGeneral_mirrorLimb.gif)   

### Mirror Blueprints
The blueprints will get mirrored automatically. But if you want to have them unsymmetrical, you can specify that with
the triangle ctrl (*bpGlobal_ctrl*):  
Left/right limbs:  
![Alt text](../images/puppetGeneral_blueprintMirror.gif)   

For some Middle Limbs he'll try to keep the joints in the symmetry axis, unless you tell him not to with the triangle ctrl:   
![Alt text](../images/puppetGeneral_symmetryForMiddleOnes.gif)   




## Nearest Worldspace Matrix
Animators often want ctrls to be oriented straight in worldspace. 
On some limbs such as *Spine* and *SingleBone* you can find a few attributes starting with **Orient To Nearest Straight Matrix**:  
![Alt text](../images/puppetGeneral_nearestStraightMatrix.jpg)   
Those will orient the ctrls to be in world space.  
!!! tip
    Whenever you want some ctrls to be oriented straight, you should always check first if you can solve that with the blueprints.
    Those *Orient To Nearest...* attributes should only be used if orienting the blueprints doesn't work well. 

While most of the time this is easily adjustable with 
blueprints, in some places it's more convenient to not rotate them straight.

