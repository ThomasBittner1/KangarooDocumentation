---
title: Python for Kangaroo in Maya
description: Create functions that appear in Kangaroo Builder's UI 
---


A lot of functions used by Kangaroo tools are very useful. This document shows the most useful ones for whenever you want
to add a python function to your asset.


## Utility Nodes
The Kangaroo-Builder is using a ton of Maya Utility nodes. If you are creating your own custom scripts, you can use some of the functions that are used inside the Kangaroo-Builder. Those should help you to write your code faster and more readable.

Just make sure you import the nodes module
``` python
import kangarooTools.nodes as nodes
```

And then you can use all those functions.
They all return an output attribute that you can either use in the next function or to connect it with the *cmds.connectAttr()* function.
*sTarget* is a convenience flag that is in almost all functions. You can keep it as *None*, or you can add an attribute name. In that case it will automatically connect the output of that function into the that attribute name.

### MultiplyDivide Node (1 dimensional)
```python 
sMultipl = nodes.createMultiplyNode(xInputA, xInputB, sTarget=None, sOperation='multiply')
cmds.connectAttr(sMultipl, 'locator1.tx')

# to write it shorter, don't assign it to a variable but set the sTarget flag instead:
nodes.createMultiplyNode(xInputA, xInputB, sTarget='locator1.tx', sOperation='multiply', sName='noname')
```


### Create MultiplyDivide Node (3 dimensional)
While most other functions have the *bVector* flag,  for the *multiplyDivide* node we have an extra function
``` python
sMultipl = nodes.createVectorMultiplyNode(xInputA, xInputB, sTarget=None, sOperation='multiply', sName='noname') cmds.connectAttr(sMultipl, 'locator1.tx')
```

### Create PlusMinusAverage Node (1 dimensional)
``` python 
nodes.createAdditionNode(xInputs, sTarget=None, sName='noname', sOperation='plus')
# xInputs is a list of strings and/or numbers. For example ['a.tx', 2, 'b.ty']
```

### Create PlusMinusAverage Node (3 dimensional)
``` python 
nodes.createVectorAdditionNode(xInputs, sTarget=None, sName='noname', sOperation='plus')
# xInputs is a list of strings and/or vectors. For example ['a.t', [2,0,0], 'b.t']
```

### Create ReverseNode
``` python
nodes.createReverseNode(xInput, sTarget=None)
# This is the result of 1-xInput
```


### Create Range Node
Here instead of having a specific vector node, we use the *bOutRangeIsVector*. If that’s on, the *xOutMin*, *xOutMax* need to be vectors or string attributes that are vectors
``` python
nodes.createRangeNode(xValue, xInMin, xInMax, xOutMin, xOutMax, sName='noname', sTarget=None, bOutRangeIsVector=False)
```

### Create Angle Node
``` python
nodes.createAngleNode(xInputA, xInputB, sTarget=None, sName='noname')
```

### Create Clamp Node
``` python 
nodes.createClampNode(xInputA, xMin, xMax, bVector=False, sTarget=None)
```

### Create Distance Node
``` python 
nodes.createDistanceNode(xInputA, xInputB, sTarget=None, sName='noname', fNormalized=None, sDivide=None)
```
if you set fNormalized to 1.0, it makes sure that the output is 1.0 on the current pose. sDivide can be used to divide the output by the global scale

### Create Condition Node
``` python
nodes.createConditionNode(xFirstTerm, sOperator, xSecondTerm, xOutputTrue, xOutputFalse, sName='noname', sFullName=None, bVector=False, sTarget=None, bForce=False)
# sOperator can be '==', '<', '<=', '>=' or '!='
```

## String Expression to Nodes
There's a function that takes a spring expression and puts that into nodes.
``` python
sExpr = nodes.fromEquation('(3 + node.out) * 0.5')
```
  
Looks fancy - but we've ended up using the utility node functions above more. There's only one place in the armLeg limb, where we
use it on a more complex function:
``` python
sExpr = '%s * (1.0 - (%0.8f ^ ((%s - %s) / %s))) + %s' % (sSoftAttr, math.e, sSoftAttrRev, sDistanceNormalized, sSoftAttrSafe, sSoftAttrRev)
sSoftExpr = nodes.fromEquation(sExpr, sFullName=self._createNodeName('softIk'))
```

One little gotcha you need to know is that this function cannot handle the scientific notifications which sometimes kicks in
on very small numbers, such as **1e-06**.  
This one for example:  
```
nodes.fromEquation(f'{fStrength} + 3.0')
```
might create the scientific notation from the fStrength variable. Instead, do it like this:
```
nodes.fromEquation(f'{fStrength:.8f} + 3.0')
```




## Driven Keys 
### direct
``` python
nodes.setDrivenKey(sDriverAttr, fDriverVals, sDrivenAttrPath, fDrivenVals, sInTanType='clamped', sOutTanType='clamped')
# fDriverVals is a list of driver values, and fDrivenVals is a list of driven values

# In this example below if locator1.ty is 2, locator2.ty will be 10
nodes.setDrivenKey('locator1.ty', [0,1,2], 'locator2.ty', [5,2,10]) 

```
### indirect
Sometimes when the driver values on the sDriverAttr are a result of a specific pose of a control, it’s more convenient to set the values by the control.
In this function we also have sDriverAttr, however no fDriverVals. Those are created under the hood from the sCtrlAttr and fCtrlValues flags.
``` python
nodes.setDrivenKeyController(sCtrlAttr, fCtrlValues, sDriverAttr, sDrivenAttr, fDrivenVals, sInTanType='linear', sOutTanType='linear', sFullName=None)
```


## Curves

Import the following functions like this:
``` python
import kangarooTools.curves as curves
```

### Create *pointOnCurveInfo* node
``` python
sNode, sPoint = curves.createPointInfoNode(sBeltCurve, fParam=0.5)
```

That node needs the parameter. To quickly convert between parameter, positions and percentages chech the following chapter.


### Getting Curves Values

There's a ton of functions that convert between points, params and percs with functions. They are easy to find since
they all have the same naming convention.

Here some examples:
``` python
#  Getting points from the joint Percentages:
fPointsOnCurve = curves.getPointsFromPercs(sCurve, [0, 0.2, 0.5, 0.8, 1.0], bReturnNumpy=True)

# Getting points from the joint Percentages:
fPointsOnCurve = curves.getParamsFromPercs(sCurve, [0, 0.2, 0.5, 0.8, 1.0], bReturnNumpy=True)

# Getting percentages from Params:
aPercs = curves.getPercsFromParams(sCtrlBpCurves[0], [0, 0.5, 1.4])

```


## Joints to Ctrls Weighting
The *getCtrlWeightings2()* function takes joint params (or percentages) and ctrl params (or percentages) and gives you back a list
with the length of the joints.

For each joint something like *[2, 3, 0.25]*. In this example it means the weighing for this joint is between ctrl 2 
and ctrl 3, with the ratio of 0.25 (0.0 would mean fully at ctrl 2, and 1.0 would mean fully at ctrl 3)

``` python
xCtrlWeightings = xforms.getCtrlWeightings2(fJointParams, fCtrlParams, fIsCircleWithParamLength=None)
```


## Create Deformers
Since the *loadDeformer()* handles mainly weights, in some cases it's cleaner to create the deformers in python
before the *loadDeformer()* function.
``` python
import kangarooTools.deformers as deformers
```
### Create Morph
For blending a mesh to another, use the morph
``` python
deformers.createMorph(sChild, sParent)
```

### Legacy Wrap Deformer
``` python
sUnorderedWraps, sBase = deformers.createWrap(sChildren, sParent, bExclusiveBind=True)
```

### Proximity Wrap Deformer
``` python
deformers.createProximityWrap(sChild, sDrivers, sName=None, bCreateBaseMesh=False, fFalloffScale=10.0)
```

### Add blendShape Targets
``` python
import kangarooTools.blendShapes as blendShapes
sTargetAttrs = blendShapes.addTargets(sMesh, sTargetMeshes)
```