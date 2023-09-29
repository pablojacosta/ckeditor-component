import * as React from "react";
import { ReactNode } from "react";
import "./ckContentStyles.css";

export interface ICKEditorView extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CKEditorView = ({ children, className, ...props }: ICKEditorView) => {
  return (
    <div className={`ck-content ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CKEditorView;
