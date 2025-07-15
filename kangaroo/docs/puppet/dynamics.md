## Springs
The following limbs come with a **Spring** attribute:

 * singleBone    
 * singleTransform    
 * spine (fk, fkSpline)

They work with a very basic spring equation done with Expressions:
```
Acceleration = (Target - Position) * STIFFNESS - Velocity * DAMPING
Velocity += Acceleration
```
*STIFFNESS* and *DAMPING* are the attributes that are exposed and can be tweaked, even by animators.   
For tweaking those values, it's best to first keep them the same value, and try variations from 0-1.   
*STIFFNESS* is how fast it comes back (stronger values = coming back quicker)  
*DAMPING* is how loose it is (weaker values = looser)  

## Spine Dynamics
The Spine limb also has Dynamics attribute in the **advanced** section, which is using *hairSystem* under the hood.  
Can give great results, too. But trickier to tweak the behavior. 

