import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ onContentChange }) => {
  const [content, setContent] = useState('');

  const handleEditorChange = (content) => {
    setContent(content);
    onContentChange(content); // Pass HTML content to parent component
  };

  return (
    <Editor
      apiKey="YOUR_TINYMCE_API_KEY" // Optional but recommended for production
      value={content}
      onEditorChange={handleEditorChange}
      init={{
        height: 400,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link image | removeformat | help',
        content_style: 'body { font-family:Arial,Helvetica,sans-serif; font-size:14px }',
      }}
    />
  );
};

export default RichTextEditor;
