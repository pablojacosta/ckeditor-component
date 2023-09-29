# @milludds/ckeditor-component

# CKEditor Component

CKEditor Component is a ready-to-use component including all free features from CKEditor and an upload adapter already created for uploading images directly to the editor.

## Install NPM package

Run `yarn add @milludds/ckeditor-component` in your project.

## How to use it in a field of react-final-form

```
import { Field } from "react-final-form";
import CKEditorComp from "@milludds/ckeditor-component/dist/index";
import { defaultFontFamily } from "@utils/ckeditor/ckEditorConfig";
import { API_URL } from "@constants/env";
import localStorageService from "@utils/localStorage.service";

const ExampleForm = ({ handleSubmit }: IFormProps): ReactElement => {
  const authToken = localStorageService.getLocalUserStorage()?.token;

  return (
    <form onSubmit={handleSubmit}>
        <Field name="body">
          {({ input }) => (
            <CKEditorComp
              getData={(value: string) => input.onChange(value)}
              fontFamilyConfig={defaultFontFamily}
              clientForUpload="clientName"
              apiUrlForUpload={API_URL}
              authTokenForUpload={authToken}
            />
          )}
        </Field>
    </form>
  );
};

export default ExampleForm;

```

In the given example, the file is sent to `${API_URL}/files/${clientName}/file.png`.

The `authTokenForUpload` variable is passed in the "Authorization" header of the send request.

This can be seen in detail in the upload adapter code, copied below.

### You can configure wich fonts to use with the fontFamilyConfig prop

```
export const defaultFontFamily = {
  options: [
    "Arial",
    "Georgia",
    "Impact",
    "Montserrat",
    "Stolzl",
    "Tahoma",
    "Times New Roman",
    "Verdana",
  ],
};
```

### Here's the upload adapter code to understand how to configure your backend.

Basically the upload adapter sends a file to the backend and expects an URL in return.

```
export class UploadAdapter {
  loader: any;
  client: string;
  apiUrl: string;
  authToken: string;
  xhr: any;

  constructor(loader: any, client: string, apiUrl: string, authToken: string) {
    this.loader = loader;
    this.client = client;
    this.apiUrl = apiUrl;
    this.authToken = authToken;
  }

  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    xhr.open("POST", `${this.apiUrl}/files/`, true);
    xhr.responseType = "json";
  }

  _initListeners(resolve: any, reject: any, file: any) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      resolve({
        default: response.url,
      });
    });
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt: any) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  _sendRequest(file: any) {
    const data = new FormData();
    data.append("upload", file);
    data.append("client", this.client);
    this.xhr.setRequestHeader("Authorization", this.authToken);
    this.xhr.send(data);
  }
}
```
