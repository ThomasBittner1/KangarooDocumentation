
## Plane Cutter
Plane Skinner is a tool that can get you quick first pass **SkinCluster** or **Proxy Geometries**

<video autoplay muted loop controls width="1266">
    <source src="../../images/planeCutter_selectedPolysAllPlanes.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

 

!!! info "Video"
    While this document explains it all - if you find it simpler to follow in a video, click [here](https://www.youtube.com/embed/sQqQVCS2vWY){target="_blank"}


!!! info "LinkedIn"
    If you are curious what people say on LinkedIn about this: 
    <a href="https://www.linkedin.com/posts/thomas-bittner-6bb6302_this-tool-generates-a-skincluster-from-nurbs-activity-7216376145527644160-BsOr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAABy3u8BK03tH_Bovh-T4-W99NGXldU3f_g" 
    target="_blank">LinkedIn Post</a>


## Create the Planes

Here we'll show how to set it up for a Biped. For quadrupeds it would be similar.

### 1. Create
After you built the character, in the **Segments** tab, under **Create**, click **Create for All Joints**:  
![Alt text](../images/planeCutter_createForAllJoints.jpg)    
This creates simple planes, and takes care of the hierarchy.


### 2. Shape the Clavicle
The clavice plane is one of the few that you have to sculpt. Sculpt it so it cuts off the clavicle from the body:  
![Alt text](../images/planeCutter_shapeClavicle.jpg)    

### 3. Inspect the fingers
In this case the fingers already work well, but sometimes you might have to adjust the cvs a bit, especially when in the
model the fingers are very close to each others.  
![Alt text](../images/planeCutter_inspectFingers.jpg)      
!!! note
    Those planes between the fingers are created based on the finger joint orientations. If you see that the planes are
    aligned a bit strangely, this might be a good time to go back into the blueprints.

### 4. Shape the Upper Legs
![Alt text](../images/planeCutter_upperLeg.jpg)        


### 5. Take care of the ankle
By default, the ankle plane (*plane_l_legWrist*) is oriented based on the joints. But that's not a good thing. In the following image, this plane
would cut the heel off the foot:  
![Alt text](../images/planeCutter_ankleBad.jpg)  
So we need to rotate the CVs, so the plane cuts the foot as a whole:  
![Alt text](../images/planeCutter_ankleGood.jpg)  


### 6. Check the Toes
![Alt text](../images/planeCutter_inspectToes.jpg)  


### 7. Mirror all the planes
![Alt text](../images/planeCutter_mirrorAllPlanes.jpg)    


### 8. Try it out
![Alt text](../images/planeCutter_skinCluster.jpg)    
Then move around the ctrls, or apply some ROM. Is probably not perfect at the first time, so just adjust the planes, mirror, and 
click the **Selected Polys all Planes** button again.



