local isMenuOpen = false

function SendMenuMessage(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end
function OpenMenu(data)
    if isMenuOpen then
        return
    end
    
    isMenuOpen = true
    SetNuiFocus(true, true)
    
    SendMenuMessage('setVisible', true)
    Wait(50)
    
    SendMenuMessage('openMenu', data)
end

function CloseMenu()
    if not isMenuOpen then return end
    
    isMenuOpen = false
    SetNuiFocus(false, false)
    
    SendMenuMessage('closeMenu', {})
end

exports('openMenu', OpenMenu)
exports('closeMenu', CloseMenu)

RegisterNUICallback('menuItemSelected', function(data, cb)
    isMenuOpen = false
    SetNuiFocus(false, false)
    
    if data.params then
        if data.params.event then
            if data.params.isServer then
                TriggerServerEvent(data.params.event, data.params.args or {})
            elseif data.params.isCommand then
                ExecuteCommand(data.params.event)
            elseif data.params.isAction then
                data.params.event(data.params.args or {})
            else
                TriggerEvent(data.params.event, data.params.args or {})
            end
        end
    end
    
    cb({status = 'ok'})
end)

RegisterNUICallback('closeMenu', function(_, cb)
    isMenuOpen = false
    SetNuiFocus(false, false)
    cb({status = 'ok'})
end)

CreateThread(function()
    while true do
        Wait(0)
        if isMenuOpen and IsControlJustPressed(0, 0x3C3DD371) then
            CloseMenu()
        end
    end
end)