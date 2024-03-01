import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({note, onChange}) {
    const handleChange = (newValue, editor) => {
        note.content=newValue;
        onChange(note)
    }

    return (
        <Editor
        apiKey='u60c9h9tist2cprhxi7h4sy7adek92wil3bl1gxb0xpgrdvs'
        onEditorChange={handleChange}
        init={{
            branding: false,
            plugins: 'anchor autolink emoticons image link lists media searchreplace table visualblocks checklist mediaembed casechange export pageembed linkchecker a11ychecker permanentpen powerpaste advtable advcode editimage advtemplate mentions mergetags autocorrect typography inlinecss',
            toolbar: 'undo redo | blocks | bold italic underline strikethrough  | align lineheight | checklist numlist bullist indent outdent ',
            line_height_formats: '0.5 1 1.2 1.4 1.6 2',
            min_height:640,
            content_style: "body { line-height: 0.5; }",
        }}
        value={note.content}
        />
    );
}