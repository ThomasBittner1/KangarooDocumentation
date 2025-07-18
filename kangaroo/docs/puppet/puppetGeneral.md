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

Now let's look at some of the important Limbs. Below you'll see a lot of videos. 
Keep in mind those videos are from 2022, but 95 % of those workflows is still the same today
Just make sure to read the text here to see what changed.



## Attachers
Attachers are all about spaces. For example the Hand IK following the COG or the Spine. 
![Alt text](../images/puppet_attachers.jpg)  
And they come with a few different options. Like you can either have a switch or a blend. Or you can choose to
have just orientation, orientation+translation, or orientation and translation separately.
And there's an animation tool that lets the animators switch between the spaces (attachers) easily without changing the pose.

This video here explains very well how they work, but make sure to read the text below (*update 0*), about custom attachers,
since those changed a bit in later versions.
<iframe width="560" height="315"
src="https://www.youtube.com/embed/8mK2lHDqR7c"
title="YouTube video player" frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>
update 0: At around 2:00 in the video: To specify deformers/meshes for custom attachers, click the **Attach Deformers UI** 
option on the same marking menu. And make sure you exclude deformers that are driven by this limb 
![Alt text](../images/puppet_deformerAttacherWindow.jpg)  
In this UI you can even specify a Vertex Id of where it should get attached. It's better to 
leave it empty at first and let it find the closest vertex by itself. But in 1 out of 20 
cases it doesn't find a nice vertex, then you can set one.
Also, keep in mind that when you test build the character, it won't attach it yet, the actual attachment
is happening later in the *puppetCustomAttachment()* function



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
