chrome.commands.onCommand.addListener(async (command) => {
    if (command !== "trigger-masterprompt") return;
  
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });
  
    if (!tab?.id) return;
  
    chrome.tabs.sendMessage(tab.id, {
      action: "APPLY_MASTERPROMPT"
    });
  });
  