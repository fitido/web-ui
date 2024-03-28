import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react';

const MenuBar = ({note, onChange}) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  editor.on('update', ({ editor }) => {
    note.content=editor.getHTML();
    onChange(note);
  })

  return (
    <>
      <button
        class="border rounded-md p-2 mr-2 mb-2 bg-white"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
      >
        bold
      </button>
      <button
        class="border rounded-md p-2 mr-2 mb-2 bg-white"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
      >
        italic
      </button>
      <button
        class="border rounded-md p-2 mr-2 mb-2 bg-white"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
      >
        strike
      </button>
      <button class="border rounded-md p-2 mr-2 mb-2 bg-white" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
    </>
  )
}

const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]

export default function TiptapEditor({note, onChange}) {
  return (
    <EditorProvider  
    class="border bg-white"
    slotBefore={<MenuBar note={note} onChange={onChange}/>} 
    extensions={extensions} 
    content={note.content}>
    </EditorProvider>
  )
}