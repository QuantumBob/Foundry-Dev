Hooks.on("init", () => {
    // keybinding to toggle sidebar with CTRL S
    const { CONTROL } = foundry.helpers.interaction.KeyboardManager.MODIFIER_KEYS;
    game.keybindings.register("rwk-toggle-sidebar", "toggleSidebar", {
        name: "ToggleSidebar",
        editable: [
            { key: "KeyS", modifiers: [CONTROL] }
        ],
        onDown: () => {
            if (canvas.ready) {
                if (ui.sidebar.expanded){
                    console.log("sidebar open. Collapsing...");
                    ui.sidebar.collapse();
                }
                else
                {
                    console.log("sidebar collapsed. Opening...");
                    ui.sidebar.expand();                 
                }
            }

            return true;
        },
        restricted: false,
        precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
    });
});