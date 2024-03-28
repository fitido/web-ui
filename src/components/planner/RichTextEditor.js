import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({note, onChange}) {
    const handleChange = (newValue, editor) => {
        note.content = newValue
        onChange(note)
    }

    return (
        <Editor
        apiKey='u60c9h9tist2cprhxi7h4sy7adek92wil3bl1gxb0xpgrdvs'
        onEditorChange={handleChange}
        init={{
            branding: false,
            menubar: false,
            plugins: 'anchor autolink emoticons image link lists media searchreplace table visualblocks linkchecker',
            toolbar: 'undo redo | blocks | bold italic underline strikethrough  | align lineheight | checklist numlist bullist indent outdent ',
            elementpath: false,
        }}
        value={note.content}
        />
    );
}