import { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { createPortal } from "react-dom";

type NewWindowProps = {
  title: string;
  children?: React.ReactNode;
  onClose?: () => void;
};

const NewWindowComponent: React.FC<NewWindowProps> = ({
  title,
  children,
  onClose = () => {},
}) => {
  const [windowRef, setWindowRef] = useState<Window | null>(null);
  const [portalRef, setPortalRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (windowRef) {
      windowRef.document.title = title;
      windowRef.document.body.innerHTML = "";

      if (portalRef) {
        portalRef.innerHTML = "";
        createPortal(children, portalRef);
      }
    }
  }, [windowRef, title, children, portalRef]);

  const handleCloseWindow = () => {
    if (windowRef && !windowRef.closed) {
      windowRef.close();
      onClose();
    }
  };

  const handleOpenWindow = () => {
    const newWindow = window.open("", "", "width=600,height=400");
    setWindowRef(newWindow);
  };

  return (
    <>
      <Button onClick={handleOpenWindow}>Open Window</Button>
      <Button onClick={handleCloseWindow}>Close Window</Button>
      {windowRef &&
        createPortal(<div ref={setPortalRef} />, windowRef.document.body)}
    </>
  );
};

export default NewWindowComponent;
