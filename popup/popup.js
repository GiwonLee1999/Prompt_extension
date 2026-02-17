document.addEventListener("DOMContentLoaded", async () => {
    const textarea = document.getElementById("prePrompt");
    const saveBtn = document.getElementById("saveBtn");
  
    const result = await chrome.storage.sync.get(["prePrompt"]);
    textarea.value = result.prePrompt || "";
  
    saveBtn.addEventListener("click", async () => {
      await chrome.storage.sync.set({
        prePrompt: textarea.value
      });
      alert("Saved!");
    });
  });
  