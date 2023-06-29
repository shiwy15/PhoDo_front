import React, { useState, useRef } from 'react'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";
import './../../index.css'

Quill.register('modules/ImageResize', ImageResize);

const modules = {
	toolbar: [
        [{ 'font': ['sans-serif', 'arial', 'IBM Plex Sans KR', 'courier'] }],
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['link', 'image'],
		[{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
		['clean']
	],

  	/* 추가된 코드 */
	ImageResize: {
		parchment: Quill.import('parchment')
	}
};


const config = {
    styles: {
        header_1: {
            font: 'IBM Plex Sans KR', // default is 'Helvetica-Bold'
            fontSize: 18 // default is 16
        }
    }
};

const QuillEditor = () => {
    const [value, setValue] = useState('');
    const editorRef = useRef(null);


    const exportAsPDF = async () => {
        const delta = editorRef.current?.editor?.getContents(); // gets the Quill delta
        console.log('delta: ', delta)
        const pdfAsBlob = await pdfExporter.generatePdf(delta, config); // converts to PDF
        console.log('pdfasblob: ', pdfAsBlob)
        saveAs(pdfAsBlob, "pdf-export.pdf"); // downloads from the browser
};
    

    return (
        <div>
        <h1 className='flex-auto text-center'> 여기가 보고서용 </h1>
        <button className="button" onClick={exportAsPDF}>
            Export as pdf
          </button>
        <ReactQuill 
            theme="snow" 
            className='h-screen'
            value={value} 
            onChange={setValue}
            modules={modules}
            ref={editorRef}
            
        />
        
        </div>
    );
};

export default QuillEditor;