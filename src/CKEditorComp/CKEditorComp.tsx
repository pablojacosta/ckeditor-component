import * as React from "react";
import { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@milludds/ckeditor5-full-free-build-and-emojis";
import "./ckContentStyles.css";
import { useEditorStore } from "../store/editorStore";
import { UploadAdapter } from "../utils/ckUploadAdapter";

export interface ICKEditorComp {
  getData: (editor: any) => void;
  initialBody?: string;
  fontFamilyConfig?: {
    options: string[];
  };
  clientForUpload?: string;
  apiUrlForUpload?: string;
  authTokenForUpload?: string;
}

const CKEditorComp = ({
  getData,
  initialBody,
  fontFamilyConfig,
  clientForUpload,
  apiUrlForUpload,
  authTokenForUpload,
}: ICKEditorComp) => {
  const { setShowEditor, storeShowEditor } = useEditorStore();

  useEffect(() => {
    setShowEditor(true);

    return () => {
      setShowEditor(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function UploadAdapterPlugin(editor: any) {
    if (!clientForUpload || !apiUrlForUpload || !authTokenForUpload) {
      return;
    }

    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new UploadAdapter(
        loader,
        clientForUpload,
        apiUrlForUpload,
        authTokenForUpload
      );
    };
  }

  return (
    <>
      {storeShowEditor && (
        <CKEditor
          data={initialBody}
          onChange={(_event: any, editor: { getData: () => any }) => {
            getData(editor.getData());
          }}
          editor={Editor}
          config={{
            fontFamily: fontFamilyConfig,
            mediaEmbed: {
              previewsInData: true,
            },
            extraPlugins: [UploadAdapterPlugin],
            removePlugins: ["Style", "TextPartLanguage"],
          }}
        />
      )}
    </>
  );
};

export default CKEditorComp;
