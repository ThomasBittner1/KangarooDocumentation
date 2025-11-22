---
title: Model Naming Conventions for Kangaroo Builder
description: Kangaroo is relatively flexible when it comes to mesh names in the models. Check here for rules.
---


Generally Kangaroo is relatively flexible when it comes to model names.

But there are some rules, and this document lists them:

## No clashing names
Having 2 meshes with the same name is bad news. Not just for Kangaroo!


## No double underscores 
That's because Kangaroo is using double underscores (__) in the name for something else.


## Flexible with left/right
The safest thing is putting *\_l\_* or *\_r\_* into the name, such as *mesh_l_wrist*. But kangaroo accepts a wide
variaty of side indications.


## Prefixes/Suffixes
Prefixes or suffixes are recommended but not mandatory.  
It is much cleaner to have a mesh called for example *mesh_l_wrist* or *l_wrist_geo*, instead of *l_wrist*.    
It also reduces the danger of creating clashing names by mistake.


## Reserved Names
The following names are reserved, please don't use them for your meshes:

- master
- modules
- model
- skeleton
- ctrls


## No Namespaces in the meshes
Namespaces in models are common when you create References instead of just importing the model.
But in Kangaroo Builder you won't have many advantages from referencing the model anyway, because all the tools are 
optimized for rebuilding the rig whenever the model changed.
An exception to this rule is the *PoseEditor* in Standalone mode. The *PoseEditor* does support namespaced models.
