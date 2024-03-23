import DialogNotification from "components/dialog/DialogNotification";
import { Fragment, ReactNode, createContext, useState } from "react";

interface DialogOpenModel {
  title: string;
  content: string;
  textConfirm?: string;
  textCancel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface DialogContextModel {
  openDialog: ({
    title,
    content,
    textConfirm,
    textCancel,
    onConfirm,
    onCancel,
  }: DialogOpenModel) => void;
  closeModel: () => void;
}

export const DialogContext = createContext<DialogContextModel>({
  openDialog: () => {},
  closeModel: () => {},
});

interface IDialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: IDialogProviderProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<DialogOpenModel>({
    title: "",
    content: "",
    textConfirm: "",
    textCancel: "",
    onConfirm: () => {},
    onCancel: () => {},
  });
  const openDialog = ({
    title,
    content,
    textConfirm,
    textCancel,
    onConfirm,
    onCancel,
  }: DialogOpenModel) => {
    setShowModal(true);
    setModalInfo({
      title,
      content,
      textConfirm,
      textCancel,
      onConfirm,
      onCancel,
    });
  };
  const closeModel = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    modalInfo?.onCancel?.();
    closeModel();
  };

  const handleConfirm = () => {
    closeModel();
    modalInfo?.onConfirm?.();
  };
  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeModel,
      }}
    >
      <Fragment>
        {showModal && (
          <DialogNotification
            title={modalInfo?.title}
            content={modalInfo?.content}
            textCancel={modalInfo?.textCancel}
            textConfirm={modalInfo?.textConfirm}
            open={showModal}
            onCancel={handleClose}
            onConfirm={handleConfirm}
          />
        )}
        {children}
      </Fragment>
    </DialogContext.Provider>
  );
}
