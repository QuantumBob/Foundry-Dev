# Kill any node process running main.js
Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" |
    Where-Object { $_.CommandLine -and ($_.CommandLine -match "F:/RPG/Foundry/FoundryVTT-13/main.js") } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force }

# Start Foundry
Start-Process node -ArgumentList "F:/RPG/Foundry/FoundryVTT-13/main.js", "--dataPath=F:/RPG/Foundry/Foundry-Data/FVTT-Dev-Data"
