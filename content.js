function findChatInput() {
    return document.querySelector("div[contenteditable='true']");
  }
  
  function insertText(element, text) {
    element.focus();
  
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(true);
  
    selection.removeAllRanges();
    selection.addRange(range);
  
    document.execCommand("insertText", false, text + "\n\n");
  }
  
  // Auto-send after a short delay
  function sendEnter(element) {
    const enterEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13
    });
    element.dispatchEvent(enterEvent);
  }
  
  async function applyMasterPrompt() {
    const input = findChatInput();
    if (!input) {
      console.log("MasterPrompt: input not found");
      return;
    }
  
    const { prePrompt } = await chrome.storage.sync.get(["prePrompt"]);
    if (!prePrompt?.trim()) return;
  
    // Insert text first
    insertText(input, prePrompt);
  
    // Wait 100ms for React to register change, then send
    setTimeout(() => sendEnter(input), 100);
  }
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "APPLY_MASTERPROMPT") {
      applyMasterPrompt();
    }
  });
  