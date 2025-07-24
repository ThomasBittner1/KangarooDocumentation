With the *Deformer Import* tool you can do the same thing as what the *loadDeformer()* function does but with a few more options.

![Alt text](../images/builder_importDeformers.jpg)

The purpose of this tool is to fix some deformers if:  

- models changed, or
- you like the weights on a certain part of the mesh more in a previous version


!!! warning "Only SkinClusters"
    This does only the standard skinClusters. It will not work on other deformers such as deltamush or post skinClusters with suffixes.
     

## When to NOT use it
### Simple Mesh Changes
Whenever the mesh names changed, just rename the *.wts* files inside the *deformers* folder. They all have the same naming convention
(TYPE__MESHNAME.wts or TYPE__MESHNAME__SUFFIX.wts).   
Make sure to keep the the double underscores in the names!

### Simple Topology Changes
If the topolgoy changed, and you have set the **bWorldSpaceIfNotMatching** attribute set to *True* in the 
*loadDeformer()* function, it'll load things automatically by worldspace. This works because all the *.wts* files contain
information about the mesh.



## Load 

For whatever meshes you have selected it'll search for the files and loads them.  
Sounds simple but the real power is that it supports vertex (soft) selection.   

So you could select vertices across different meshes:  
![Alt text](../images/deformerImport_vertexSelection.jpg)   

Maybe even switch to an older version where you liked the weights more (note how it turning red means you are not on
current version):  
![Alt text](../images/deformerImport_olderVersion.jpg)   

And click the **Load** button.



## Load best fitting skinClusters
This button is great for when your character has many meshes, and modellers decided to just blindly rename a lot of meshes.


