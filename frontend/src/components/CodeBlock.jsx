const CodeBlock = ({ paragraph, language }) => {
  return (
    <pre className="line-numbers my-8">
      <code className={`language-${language}`}>
        {paragraph.replace("```jsx", "").replace("```", "")}
      </code>
    </pre>
  );
};

export default CodeBlock;
