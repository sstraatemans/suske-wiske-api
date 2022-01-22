import { useState, useRef, useEffect, FC } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default), {
  ssr: false,
}) as FC<MDEditorProps>;

type Props = {
  name: string;
  value: string | undefined;
  handleInputValue: (name: string, value: string | undefined) => void;
};

export const Editor: FC<Props> = ({ name, value, handleInputValue }) => {
  const onChange = (val: string | undefined) => {
    handleInputValue(name, val);
  };

  return (
    <div className='container'>
      <MDEditor
        value={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
};
