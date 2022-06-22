-- [DIFFICULTIES]: NORMAL, HARD, VERY_HARD
-- Keep in mind, the command can be performed by anyone from the game, no permissions or group system.

RegisterCommand("skillcheck", function(source, args, rawCommand)

    if Config.TestCommand then

        if source > 0 then
            TriggerClientEvent("tp-skillcheck:onSkillCheckStart", source, "tp_openvault", "NORMAL", "empty", "Open Vault")
        end
    else
        print("/skillcheck test command is currently disabled.")
    end
end, true) -- this true bool means that the user cannot execute the command unless they have the 'command.commandName' ACL object allowed to one of their identifiers.