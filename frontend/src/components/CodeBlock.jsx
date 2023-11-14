const CodeBlock = ({ paragraph, language }) => {
  return (
    <pre className="my-8">
      <code className={`language-${language}`}>
        {paragraph.replace("```jsx", "").replace("```", "")}
      </code>
    </pre>
  );
};

export default CodeBlock;
