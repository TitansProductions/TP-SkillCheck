# TP-SkillCheck

## Requirements

TP-SkillCheck does not have any requirements, it is standalone.


## » How to use «

In order to create a skillcheck, you can use the following event:

Client Side:

            TriggerEvent("tp-skillcheck:onSkillCheckStart", param1, param2, param3, param4)

Server Side:

            TriggerClientEvent("tp-skillcheck:onSkillCheckStart", source, param1, param2, param3, param4)
            

Now, we have to understand the required parameters before actually creating a skillcheck.

- parameter1: Skill Check Name (A name of the skillcheck in order to get when the skillcheck was successfull or failed, ex: "open_crate").
- parameter2: Difficulty ("NORMAL", "HARD", "VERY_HARD").
- parameter3: Image Name (Default images: "dollar", "kg", "empty").
- parameter4: Skill Check Title (The title that will be displayed when opening a skillcheck).


### Examples: 

After understanding the required parameters, this is how we actually create a skillcheck based on our current knowledge.

Server Side:

            TriggerClientEvent("tp-skillcheck:onSkillCheckStart", source, "open_crate", "HARD", "empty", "Opening Crate")
            
Client Side:

            TriggerEvent("tp-skillcheck:onSkillCheckStart", "open_crate", "HARD", "empty", "Opening Crate")

## Issues

Please use the GitHub issues system to report issues.
