

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-lg leading-relaxed text-gray-800 mb-6">{content}</p>
    </div>
  );
}
