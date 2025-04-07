---
layout: article.njk
title: A neat way to quickly toggle MongoDB Windows background service
hasThumb: true
eleventyNavigation:
  key: mongodb-service-toggle-windows-shortcut
  title: Windows shortcut to toggle MongoDB service
  parent: articles
date: 2024-06-27
showNavigationBreadcrumbs: true
tags:
  - articles
  - '2024'
  - automation
  - mongodb
  - service
  - toggle
  - windows
  - shortcut
  - powershell
  - script
---

<!--
@changed 2024.06.27, 14:35
-->

{% import "macros.njk" as macros with context %}

This is a small trick to create a powershell script companied with a desktop shortcut to quickly toggle MongoDB Windows background service

I use MongoDB both on my server and on my Windows desktop in development mode.

But I don't need it to work all the time.

And I'm too lazy to go deep into the system panels and switch it on and off permanently.

Moreover, it is impossible to remember the current state of the service.

Yes, I remember with pleasure the service from the apache server with a notification icon in the taskbar.

So I decided to write a powershell script to automate this small task.

This is it, step by step.

Allow MessageBox component (to show gui dialogs).

```powershell
if ($null -eq ('System.Windows.MessageBox' -as [type])) {
    Add-Type -AssemblyName PresentationFramework
}
```

Try to find the MongoDB system service by name.

```powershell
$Service = Get-Service -Displayname '*MongoDB Server*'
if (!$Service) {
    $Message = 'MongoDB service not found'
    Write-Error $Message
    [void][System.Windows.MessageBox]::Show($Message, 'Error!', 'OK', 'Error')
    exit 1
}
```

Detect the current status of the service.

```powershell
$PrevStatus = $Service.Status -eq 'Running'
$NextStatus = -Not $PrevStatus
```

Try to change the state (it's good to put this code within try...catch construction to process the errors).

```powershell
if ($NextStatus) {
    Start-Service -InputObject $Service
}
else {
    Stop-Service -InputObject $Service
}
```

The most intriguing part is to change the shortcut icon to indicate the current status (`~/OneDrive/Desktop/MongoDB Service.lnk` is the shortcut link on the desktop).

```powershell
$ShortcutPath = $HOME + '\OneDrive\Desktop\MongoDB Service.lnk';
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($ShortcutPath)
if ($Shortcut -And $Shortcut.TargetPath) {
    $DisabledIcon = '%SystemRoot%\System32\imageres.dll,100'
    $EnabledIcon = '%SystemRoot%\System32\imageres.dll,101'
    $Icon = if ($NextStatus) {$EnabledIcon} else {$DisabledIcon}
    $Shortcut.IconLocation = $Icon
    $Shortcut.Save()
}
```

We've used two icons from default windows set (`.../System32/imageres.dll`):

{{ macros.imgFigure('./images/available-icons.png', 'Available windows standard icons.') }}

- #100: 'Disabled: a red shield with a cross',
- #101: 'Enabled: a green shield with a check mark'.

And the final part is to display the operation status dialog.

```powershell
$MessageTitle = 'MongoDB Service'
$MessagePrefix = 'Service has been'
$MessagePostfix = if ($NextStatus) {'started'} else {'stopped'}
$MessageText = $MessagePrefix + ' ' + $MessagePostfix
[void][System.Windows.MessageBox]::Show(
    $MessageText,
    $MessageTitle,
    'OK',
    'Information'
)
```

## The shortcut and the icon

It's supposed that icon is located on the windows desktop under the name `MongoDB Service.lnk`.

And the target is (`~/sbin/toggle-mongodb-service.ps1` is our script name):

```cmd
powershell
-WindowStyle hidden
-ExecutionPolicy Bypass
-File "%HOME%\sbin\toggle-mongodb-service.ps1"
```

It's required to switch the 'Run as Administrator' checkbox on:

{{ macros.imgFigure('./images/shortcut-properties-dialog.png', 'Shortcut properties dialog.') }}

And, finally, we could have different icons on the desktop for each status:

{{ macros.imgFigure('./images/desktop-icon-started.png', 'The service is started.') }}

{{ macros.imgFigure('./images/desktop-icon-stopped.png', 'The service is stopped.') }}

## Links

- [Managing services](https://learn.microsoft.com/en-us/powershell/scripting/samples/managing-services?view=powershell-7.4)
- [Get-Service](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-service?view=powershell-7.4)
- [Start-Service](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/start-service?view=powershell-7.4)
- [Stop-Service](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/stop-service?view=powershell-7.4)

## TODO

It's required to add ability to update the service state on demand/on the system start, because at the moment it saves only the last state, what couldn't be always actual. But there is a solution, if the "manual" mode was set for the service, it will restore its last state.
