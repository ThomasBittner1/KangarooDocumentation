Model changes can be annoying but happen so often in production.

But the good news is that kangaroo is really good in dealing with model changes!

Here's just a roadmap of everything you can to do when model changes.


#*bWorldSpaceIfNotMatching* flag in loadDeformers()
Just set that to True


# Mesh Names changed
Oh, that is so ducking annoying, but no matter how often you tell modelers, they'll always change the names
of the meshes.....  
*Got a robot with lots of different meshes and they all changed in not just names but also topology?*    
No problem, just use the DeformerImport tools - **Load Best Fitting SkinClusters**

But apart from that, if you have a face rig or pose editor on those meshes that changed the names, it'll be a bit 
more manual setup inside the build folder functions, adjusting names etc.
So for the main meshes such as skinCluster, it's best to pray that modeling doesn't decide to change the names. 