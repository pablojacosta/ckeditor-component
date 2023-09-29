import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { defaultFontFamily } from "../src/utils/ckEditorConfig";
import CKEditorComp, { ICKEditorComp } from "../src/CKEditorComp/CKEditorComp";

const meta: Meta = {
  title: "CKEditor Component",
  component: CKEditorComp,
};

export default meta;

const Template: StoryFn<ICKEditorComp> = (args) => <CKEditorComp {...args} />;

export const CKEditorFieldDefault = Template.bind({});
CKEditorFieldDefault.args = {
  getData: (editor: any) => {},
  initialBody: "",
  fontFamilyConfig: defaultFontFamily,
};
