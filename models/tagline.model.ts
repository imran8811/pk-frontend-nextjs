import { TemplateString } from "next/dist/lib/metadata/types/metadata-types"

export type ITaglineProps = {
  title : null | string | TemplateString | undefined,
  description : null | string | undefined,
  keywords?: null | string | Array<string>;
}