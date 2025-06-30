# Bell Collider
The **singleBone** limb comes with a Bell Collider. Bell Collider looks like dynamics but it's really just
interactive angle calculations. It works great for short pants. 
![Alt text](../images/bellCollider.gif)  
While it looks great in the video, it does
come with the disadvantage that he can only handle cylinders. Those can be scaled, and translated and rotated though.
And with some multiply attributes you can specify it to be weaker in either front, back or on the sides.

It's quick to setup. Just add a singleBone limb, declare it as a bell with the **isBell** attribute, and
define the **ringer** in the attacher below. The ringer in this case is another *singleBone* limb that is 
located close to the bell. And the ringer itself doesn't need any extra settings. Actually it doesn't even know that 
it's a ringer. We just named it ringer.  
![Alt text](../images/bellCollider_settings.jpg)  
The **Bell Up Vector** is an important attribute to know about. Keep it at default (0,1,0) at first, but if it's flipping 
strangely as you rotate the limb up 90 degrees, try setting it to (0,0,1) instead  
The **Bell Settings** is the translate/rotate/scale/multiply attributes on the cylinders. But those are being
set automatically when right-clicking on the limb: **Custom: Store Bell Settings**   
![Alt text](../images/bellCollider_rightClick.gif)

TIP: Sometimes you might feel like the bell joint jumps a bit too quickly as the ringer touches it. 
To fix that it can help to setup the bell's attacher to move slightly with the ringer by around 50 % .

