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
  name: "DoubleTapDelete",
  description: "Deleta mensagens com dois toques.",
  version: "1.0.0",
  authors: ["crilguizin"],
  load() {
    document.addEventListener("dblclick", onDoubleClick);
  },
  unload() {
    document.removeEventListener("dblclick", onDoubleClick);
  }
};
