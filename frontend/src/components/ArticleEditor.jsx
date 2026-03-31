import MDEditor from "@uiw/react-md-editor";

const ArticleEditor = ({ mdContent, setMdContent }) => {
  return (
    <div data-color-mode="dark">
      <MDEditor
        value={mdContent}
        onChange={setMdContent}
        height={400}
        minHeight={200}
        visibleDragbar={false}
        style={{
          background: "transparent",
          fontFamily: "'DM Mono', monospace",
        }}
      />
    </div>
  );
};

export default ArticleEditor;
