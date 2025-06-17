const { React, findModule } = require("@vendetta/metro");
const del = findModule(m => m.deleteMessage);

function isOwn(el) {
  const inst = React.getOwnerInstance(el);
  return inst?.props?.message?.author?.id === findModule("getCurrentUser").getCurrentUser().id;
}

function onDoubleClick(e) {
  const msg = e.target.closest("[data-message-id]");
  if (!msg || !isOwn(msg)) return;
  del.deleteMessage(msg.getAttribute("data-message-id"));
}

module.exports = {
  onLoad() {
    document.addEventListener("dblclick", onDoubleClick);
  },
  onUnload() {
    document.removeEventListener("dblclick", onDoubleClick);
  }
};
