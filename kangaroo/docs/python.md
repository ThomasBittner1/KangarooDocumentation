

As you remember from the builder documentations, everything is written in Python. And we can customize a lot

# PyCharm
If you have pycharm installed, there's lots of quick ways to jump to a specific code.  
But for that we have to link it first.  
On the settings, 
![Alt text](images/python_pycharm.jpg)

And then you can go to any function to the builder and with right click quickly jump to the code.  
![Alt text](images/python_goToFunction.gif)

Same thing happens on Errors in the Kangaroo Log - those are links you can just click on 
![Alt text](images/python_error.jpg)


# Simple way of adding function
The simplest way to add a function is just in the character script. Basically the python file that is 
inside your version folder.  
It's the file that is shown in *white*

In there add a function that looks like this:
```python
@builderTools.addToBuild(iOrder=16)
def simpleFunction(iLuckyNumber=20, sObjects=[]):
    print ('Hello, your lucky number is %d' % iLuckyNumber)
    print ('And the objects are: %s' % sObjects)
```

And then to get that into the builder, you need to click the reload button. Basically every time you change
any of the scripts, the builder will only know about it if you click that button. Unless you switch to the
character with the upper comboboxes, then he'll reload anyway
![Alt text](images/python_reloadButton.jpg)

Now let's look at the function. The important thing is the decorator that starts with *@builderTools.add...*. 
If you don't have that, the function won't show up in the Builder.
Do you see the **iOrder=16** parameter in the code above? That's the order number where shows up in the 
builder. The numbers are listed on the right side of the *Function Table*. Basically for finding the correct 
order number, just look in the table at which place you'd like it to be. If you want the function to run after
the *LoadDeformer()*, the priority attribute needs to be something higher than 50.
![Alt text](images/python_order.jpg)


## Attributes
Now let's run the function with the *Run Selected* button. It should come to no surprise that when you change
the attribute in the builder, he'll log the sentence with the new number ;-)  
![Alt text](images/python_runSimpleFunction.jpg)


## Scene Selection
Getting the scene selection into the attributes is fast, on any attribute that is declared with an empty list,
you can do the right click -> **Scene Selection** option  
![Alt text](images/python_selectedObjects.gif)


## Buttons
Let's add a button. Change the above code to this.


```python
def buttonFunction():
    print ('a button was clicked')


@builderTools.addToBuild(iOrder=16, dButtons={'new button':buttonFunction})
def simpleFunction(iLuckyNumber=20, sObjects=[]):
    print ('Hello, your lucky number is %d' % iLuckyNumber)
    print ('And the objects are: %s' % sObjects)
```
AFter clicking the reload button, you'll get this button:
![Alt text](images/python_button.jpg)


## Marking Menus
If you want marking menus into the button, you just nest a few dictionaries:



```python
def buttonA():
    print ('buttonA was clicked')

def buttonC():
    print ('buttonB was clicked')

def buttonD():
    print ('buttonC was clicked')

@builderTools.addToBuild(iOrder=16, dButtons={'new button':{'buttonA': buttonA, 'more buttons': {'buttonB':buttonB, 'buttonC':buttonC}}})
def simpleFunction():
    pass
```


Clicking the reload button with this new code, you'll that that super cool looking marking menu. You can even
extract the function with that **<-->** button, which can be very handy if the menu gets complex.

![Alt text](images/python_markingMenu.gif)



## Let python change your attributes
```python
def incrementNumber(iLuckyNumber, _uiArgs={}):
    print ('Lucky number is %d' % iLuckyNumber)
    iLuckyNumber += 1
    _uiArgs['iLuckyNumber'].setText(str(iLuckyNumber))



@builderTools.addToBuild(iOrder=16, dButtons={'increment':incrementNumber})
def simpleFunction(iLuckyNumber=20):
    print ('Hello, your lucky number is %d' % iLuckyNumber)
```

See how the button changes the attribute's value? This is basically what all those *fill* buttons in kangaroo
are doing:
![Alt text](images/builder_incrementNumber.gif)
