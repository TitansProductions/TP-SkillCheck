local isInMenu                                          = false
local uiType                                            = ""

-- ------------------------------------------------------------------------------------------------------
-- Skill Check Default Events.
-- ------------------------------------------------------------------------------------------------------

AddEventHandler('onResourceStart', function(resource)
    if resource == GetCurrentResourceName() then
	SetNuiFocus(false,false)
    end
end)

-- onPlayerDeath (ESX SUPPORT)
AddEventHandler('esx:onPlayerDeath', function(data)

    if isInMenu then
        SendNUIMessage({action = "closeUIProperly"})
    end
end)

-- onPlayerDeath (QBCore SUPPORT)
AddEventHandler('hospital:server:SetDeathStatus', function(data)

    if isInMenu then
        SendNUIMessage({action = "closeUIProperly"})
    end

end)

RegisterNetEvent('tp-skillcheck:onSkillCheckStart')
AddEventHandler('tp-skillcheck:onSkillCheckStart', function(skillCheck, difficulty, imageType, title)
    onSkillCheckStart(skillCheck, difficulty, imageType, title)
end)
-- ------------------------------------------------------------------------------------------------------
-- End of Skill Check Events.
-- ------------------------------------------------------------------------------------------------------

-- ------------------------------------------------------------------------------------------------------
-- Skill Check Callback Events (Success, Failed).
-- ------------------------------------------------------------------------------------------------------

AddEventHandler('tp-skillcheck:onSkillCheckSuccess', function(data)
    if Config.Debugging then
        print(data.skillcheck .. ": Success | Progress: ".. data.progress)
    end
end)

AddEventHandler('tp-skillcheck:onSkillCheckFailed', function(data)
    if Config.Debugging then
        print(data.skillcheck .. ": Failed | Progress: ".. data.progress)
    end
end)

-- ------------------------------------------------------------------------------------------------------
-- End of Skill Check Callback Events.
-- ------------------------------------------------------------------------------------------------------

-- ------------------------------------------------------------------------------------------------------
-- Callbacks.
-- ------------------------------------------------------------------------------------------------------

RegisterNUICallback('success', function (data)
    TriggerEvent("tp-skillcheck:onSkillCheckSuccess", data)

    currentID = nil
end)

RegisterNUICallback('failed', function (data)
    TriggerEvent("tp-skillcheck:onSkillCheckFailed", data)

    currentID = nil
end)


RegisterNUICallback('closeNUI', function()
	EnableGui(false, uiType)

end)

-- ------------------------------------------------------------------------------------------------------
-- End of callbacks.
-- ------------------------------------------------------------------------------------------------------

-- ------------------------------------------------------------------------------------------------------
-- Skill Check Functions.
-- ------------------------------------------------------------------------------------------------------
function onSkillCheckStart(skillCheck, difficulty, imageType, title)

    if not isInMenu then

        if skillCheck == nil or skillCheck == "" or skillCheck == " " then
            print("Skillcheck failed to open, Skillcheck Name (Requirement) cannot be null.")
            return
        end

        isInMenu  = true

        DisableControlAction(0, 57)
        
        SendNUIMessage({
            action = "addInformation",
    
            skillcheck_name             = skillCheck,
    
            difficulty                  = string.lower(difficulty),
            type                        = imageType,
    
            skillcheck_title            = title,
            skillcheck_success          = Locales['skillcheck_success'],
    
            skillcheck_no_success       = Locales['skillcheck_no_success'],
            skillcheck_press_title      = Locales['skillcheck_press_title'],
            skillcheck_stop_title       = Locales['skillcheck_stop_title'],
        })
    
        uiType = "enable_skillcheck"
        
        EnableGui(true, uiType)

    end
end

function EnableGui(state, ui)
	SetNuiFocus(state, state)

	SendNUIMessage({
		type = ui,
		enable = state
	})

    isInMenu = state

end


function closeMenu()
    if isInMenu then
        EnableGui(false, uiType)
    end
end

-- ------------------------------------------------------------------------------------------------------
-- End of Skill Check Functions.
-- ------------------------------------------------------------------------------------------------------
