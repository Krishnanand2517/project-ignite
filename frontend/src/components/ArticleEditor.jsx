import MDEditor from "@uiw/react-md-editor";

const ArticleEditor = ({ mdContent, setMdContent }) => {
  return (
    <div>
      <MDEditor
        value={mdContent}
        onChange={setMdContent}
        height="100%"
        minHeight={150}
        visibleDragbar={false}
        className="p-6 font-inconsolata"
      />
    </div>
  );
};

export default ArticleEditor;
