export interface Asset {
  id: string;
  description: string;
  imageUrl: string;
  metadataUri: string;
  name: string;
  projectId: string;
  properties: {
    fields: {
      type: string;
      name: string;
      value: string;
    }[]
  };
  slug: string;
}
