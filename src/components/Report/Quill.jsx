import React, { useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { request } from "../../utils/axios-utils"
import './../../index.css'
import './QuillEditor.css'
import { saveAs } from 'file-saver';

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



const QuillEditor = () => {
    let { projectId } = useParams();
    console.log('project Id: ', projectId);
    const [value, setValue] = useState('');
    const editorRef = useRef(null);
    const [projectName, setProjectName] = useState(''); // added this line
    const handleDownload = () => {
        request({
            url: `/project/zipimage/${projectId}`, // Replace with your zip file path
            method: 'GET',
            responseType: 'blob',
        })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'application/zip' });
                saveAs(blob, 'images.zip');
            })
            .catch((error) => console.error('There was an error!', error));
    };

    useEffect(() => {
        const contentHtml = `
        <br>
        <h1><span style="color: rgb(153, 51, 255);">아파트 내부 인테리어에 관한 가족회의 보고서 </span></h1>
        <br>
        <p class="ql-align-right"><strong>날짜:</strong> 2023년 7월 5일</p>
        <p class="ql-align-right"><strong>회의 참석자:</strong> 가족 전체</p>
        <br>
        <h2>1. 인테리어 필요성</h2>
        
        <p>우리 가족 아파트의 인테리어 개선은 단순히 물질적인 만족도만을 증가시키는 것이 아닙니다. 보다 편안하고, 아름다운 환경에서 생활하는 것은 우리 가족 모두의 삶의 질을 향상시키고, 행복감을 늘려줄 것이라고 확신하고 있습니다. 이러한 생각은 우리 가족 모두가 공감하고 있으며, 따라서 이번 내부 인테리어는 가족 모두의 기대와 열정으로 시작되었습니다.</p>
        <br>
        <h2>2. 인테리어 계획</h2>
        
        <p>우리 가족은 각 방에 따라 다른 인테리어 계획을 세우기로 결정했습니다. 이는 각 방의 기능과 사용목적, 그리고 가족 구성원의 개인적인 취향을 고려하기 위함입니다.</p>
        <h3>2-a. 거실</h3>
        <p>거실은 가족이 함께 모여 대화하고, 휴식을 취하는 공간입니다. 이에 걸맞게 벽지는 흐린 초록색으로, 바닥은 헤링본 패턴의 진한 갈색으로 결정하였습니다. 이러한 색조는 평온하고 따뜻한 분위기를 더해줄 것입니다. 또한, 편안한 환경을 위해 하얀색 소파를 구매할 예정이며, 식물 그림 액자를 최소 3개 이상 구매하여 신선함을 더할 예정입니다.</p>
        <h3>2-b. 침실</h3>
        <p>침실은 가장 개인적인 공간으로, 편안하고 쾌적한 환경이 필요합니다. 필요한 가구로는 침대, 옷장, 테이블, 의자, 선반, 조명이 있으며, 이에 대한 예산은 300만원으로 설정하였습니다.</p>
        <h3>2-c. 손님방</h3>
        <p>손님방은 가족의 환대의 표현이기 때문에, 침대 및 여분의 이불을 준비하여 손님들이 편안하게 머무를 수 있도록 할 예정입니다.</p>
        <h3>2-d. 화장실</h3>
        <p>화장실은 깨끗하고 신선한 이미지를 유지하는 것이 중요합니다. 예산 한도는 600만원으로 설정하였으며, 깔끔함을 강조하기 위해 타일은 하얀색으로 결정하였습니다.</p>
        <br>
        <h2>3. 추가 구매가 필요한 가구 및 도구들</h2>
        <p>위의 계획을 실행하기 위해 액자, 쿠션, 4인용 식탁, 조명 등을 추가로 구매할 예정입니다. 이들 가구와 도구는 각 방의 분위기를 더욱 풍성하게 하고, 가족들의 편의를 증진시킬 것입니다.</p>
        
        <p>이번 내부 인테리어는 우리 가족의 삶의 질을 향상시키고, 더욱 행복한 생활 환경을 만들어 주기 위한 첫걸음입니다. 가족 모두의 공동 노력으로 이를 성공적으로 완수할 수 있기를 바랍니다.</p>
    
        `;
    
        setValue(contentHtml);
        console.log(contentHtml);
    }, []); 
    

    useEffect(() => {
        // Fetch the project name
        request({
            method: 'get',
            url: `/project/name/${projectId}`,
        })
        .then(res => {
            setProjectName(res.data.name); // assuming the response has a "name" field
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    const exportAsPDF = () => {
        const editor = document.querySelector('.ql-editor');
        html2canvas(editor, {scale : 2}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            console.log(imgData)

            const pdfWidth = 190;
            const pageHeight = pdfWidth * 1.414;
            const pdfHeight = canvas.height * pdfWidth / canvas.width;
            const heightLeft = pdfHeight;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps= pdf.getImageProperties(imgData);
            // const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'PNG', 10, 0, pdfWidth, pdfHeight);
            pdf.line(15, 8, 195, 8);
            pdf.line(15, 289, 195, 289);
            pdf.save("download.pdf");
        });
    };    

return (
<div className='py-2'>
<div style={{ display: 'flex', justifyContent: 'center' }}>
        <button 
            className="button mr-3 inline-block mb-2 bg-purple-700 rounded px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white" 
            onClick={exportAsPDF}
            style={{ marginRight: '80px' }}>
                보고서 다운로드 (PDF)
        </button>

        <button 
            onClick={handleDownload} 
            className="button mr-3 inline-block mb-2 bg-purple-700 rounded px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white">
                프로젝트 사진 다운로드 (ZIP)
        </button> 
    </div>
    <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue}
        modules={modules}
        ref={editorRef}
        style={{height: "72vh"}}
    />
</div>

);
};

export default QuillEditor;