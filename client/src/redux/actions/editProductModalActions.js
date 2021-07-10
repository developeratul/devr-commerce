const openModal = (payload) => {
  return { type: "OPEN_MODAL", payload };
};
const closeModal = () => ({ type: "CLOSE_MODAL" });

export { openModal, closeModal };
