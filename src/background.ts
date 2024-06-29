chrome.action.onClicked.addListener((tab) => {
    if (!tab.id) return;
    chrome.sidePanel.open({ tabId: tab.id });
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });