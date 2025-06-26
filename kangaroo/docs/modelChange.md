Kangaroo has some good tools for dealing with model changes. But certain things have to be done manually.

Here's an overview of everything you can/should to do when a model changes.


# Different Proportions
### Puppet
For different proportions you'll need to adjust the blueprints in the **puppet** tool.  
If the topology is the same, you could additionally use the **geometry -> warpXforms** tool to just warp all the 
blueprints. This is useful if the whole character change quite a bit in proportions   
TIP: this can also be a very useful tool if you are creating a new character with same topology but differnet 
proportions

### others
And then basically every blueprint group in the mayaImport folder needs to be warped to the new mesh.



# Same Topology - Different shape
Deformer files will just work.   
But blendShapes, such as in ShapeEditor or PoseEditor need to be updated
### PoseEditor model update
### Shape Editor model update
### Other Target geos 
Any other mesh you can just warp with the **Geometry -> Warp Pose**


# Topology change
### *bWorldSpaceIfNotMatching* flag in loadDeformers()
Just set that to True and it'll load all the deformer files. After that you can just reexport the files. And it's 
easy to find out which ones he changed. **Export -> Deformers -> Select Changed Meshes**

### PoseEditor model update
### Shape Editor model update
### Other Target geos 
Any other mesh you can just warp with the **Geometry -> Warp Pose**
### Custom attacher 
Custom attacher setups should be fine in most cases, except when you specified a vertex



# Mesh Names changed
## change deformer files
Very often the fastest thing is to change the names of the files in the deformer folder. Because those files contain
the geometry name and the *loadDeformers()* function grabs the model from those names  

## Load Best Fitting SkinClusters
If you have a character with a ton of different meshes, and suddenly all their names and topologies changed -> just use 
**Export -> DeformerImport -> Load Best Fitting SkinClusters**

## Custom Attachers
If you've used the custom attachers in the puppet tool, that's also a bit more manual setup at this point. 
You could open the puppet.rig file and text/replace if you are careful.

## Face Rig
If you have a face rig more manual setup inside the build folder functions, adjusting names etc.
So on a mesh that has the Face Rig, it's best to pray that modeling doesn't decide to change the name. 
