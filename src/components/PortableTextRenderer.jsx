import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanityClient";

const components = {
  types: {
    image: ({ value }) => {
      return (
        <img
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          className="my-6 rounded-xl"
        />
      );
    },
  },
};

export default function PortableTextRenderer({ value }) {
  return <PortableText value={value} components={components} />;
}
