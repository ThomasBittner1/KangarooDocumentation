Most tools in the Kangaroo UI can be called through Python. To see the functions, just check the Log after running them. And then copy/paste that into your Python script.


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