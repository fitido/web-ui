import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function ReadOnlyEditor({note}) {
    return (
        <Editor
        apiKey='u60c9h9tist2cprhxi7h4sy7adek92wil3bl1gxb0xpgrdvs'
        initialValue={note.content}
        init={{
            branding:false,
            readonly: true,
            menubar: false,
            toolbar: false,
            editable_root: false,
            elementpath: false,
            min_height: 640,
            content_style: "body { user-select: all;} ",
        }}
        />
    );
}