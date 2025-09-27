import ReactDOM from "react-dom";
import "./ConfirmDialog.css";

interface ConfirmDialogProps{
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({ title, description, onConfirm, onCancel }:ConfirmDialogProps) {
  return ReactDOM.createPortal(
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="confirm-dialog-actions">
          <button onClick={onConfirm} className="confirm-btn">
            Delete
          </button>
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmDialog;
