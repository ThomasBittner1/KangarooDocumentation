With the *Deformer Import* tool you can do the same thing as what the *loadDeformer()* function does but with a few more options.

![Alt text](../images/builder_importDeformers.jpg)

The purpose of this is to fix some deformers if:  

- models changed, or
- you like the weights on a certain part of the mesh more in a previous version


!!! warning "Only SkinClusters"
    This does only the standard skinClusters. It will not work on other deformers such as deltamush or post skinClusters with suffixes.
     


The button **Load best fitting skinClusters** for example is a great button for situations where you are dealing with a character that has
many meshes, and modellers decided to just blindly rename a lot of meshes
!!! note
    after using that tool to fix weights, you'll have to reexport them, so the *loadDeformer()* function 
    loads it properly again.
