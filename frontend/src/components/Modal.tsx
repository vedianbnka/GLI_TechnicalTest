type DeleteModalProps = {
  show: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({
  show,
  title,
  message,
  confirmLabel = "Ya",
  cancelLabel = "Batal",
  onConfirm,
  onCancel,
}: DeleteModalProps) => {
  if (!show) return null;

  const overlayClass =
    "fixed inset-0 bg-white/50 flex items-center justify-center z-50 p-4";
  const cardClass = "bg-white rounded-lg shadow-xl max-w-md w-full p-6";
  const actionRowClass = "flex gap-3 justify-end";
  const cancelBtnClass =
    "px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded text-sm font-medium";
  const confirmBtnClass =
    "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium";

  return (
    <div className={overlayClass}>
      <div className={cardClass}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className={actionRowClass}>
          <button className={cancelBtnClass} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={confirmBtnClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
