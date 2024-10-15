'use client'
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react"

interface Props {
    initData : any
    setData : Function,
    name : any
}
export default function Summernote ({
    initData, setData, name
} : Props) {
    const summernoteRef = useRef<any>(null);
    useEffect(()=>{
        const config: Summernote.Options = {
            
            tabDisable: true, // 키보드 Tab키를 사용가능할게 할지(Default false)
            height : 300,
            toolbar: [
            // 작성해준 순서대로 toolbar에 삽입된다.
            // 중복으도 선언가능하며, toolbar삽입 위치를 자유롭게하기 위해서 중복으로 타입이 되어있어 보인다.
                ['style', ['style']],
                ["font", ["bold", "italic", "underline", "superscript"]],
                ["fontsize", ["fontsize", "fontname", "color"]],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['fullscreen', 'codeview']],
            ],
            // 사용하고 싶은 fontSize들만 정의
            fontSizes: ["10", "12", "14", "16"],
            // 사용하고 싶은 Color들 정의, [[[]]] 이란걸 주의하자!, 최종안에 배열의 색상값이 한줄에 표시된다.
            // 아래처럼 선언할시 첫번째줄 red 하나, 두번째줄 black하나, 세번째줄 yellow 하나 이렇게 나타난다.
            colors: [[["red"]], [["black"]], [["yellow"]]],
            // fontSize단위
            fontSizeUnits: ["px"],
            // tooltip에 언어를 설정하는것같은데, 사용을 원할 경우 언어 summernote-ko.js파일도 추가가 필요 해보인다.
            lang: "ko-KR",

            callbacks: {
                onInit: () => {
                    // if(initData)
                    // $('#summernote').summernote('code', initData);
                    $(summernoteRef.current).summernote('code', initData);
                },
                onChange: (contents: string, $editable: JQuery) => {
                    setData((prev:any) => ({...prev, [name] : contents}))
                },
                onImageUpload : async (files:any) => {
                    for (let file of files) {
                        const formData = new FormData()
                        formData.append('file', file)
                        // const res = await axios.post('/admin/setToastFileUpload.php', formData)
                        // if(res) {
                        //     $('#summernote').summernote('insertImage', res.data.imageUrl)
                        // }
                    }
                },
                onKeyup: (ev: KeyboardEvent) => {
                },
                onKeydown: (ev: KeyboardEvent) => {
                },
                onPaste: (e: Event & { originalEvent: ClipboardEvent }) => {
                    const clipboardData = e.originalEvent.clipboardData?.getData("text");
                },
            },
        };
        $(summernoteRef.current).summernote(config);

        // return () => {
        //     $(summernoteRef.current).summernote('destroy');
        // };
    }, [initData, setData])

    useEffect(() => {
        const links = [
            {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard.css"
            },
            {
                rel: "stylesheet",
                href: "https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
            },
            {
                rel: "stylesheet",
                href: "https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-bs4.min.css"
            }
        ];

        links.forEach(({ rel, href }) => {
            const link = document.createElement("link");
            link.rel = rel;
            link.href = href;
            document.head.appendChild(link);
        });

        // Cleanup function to remove the links when the component is unmounted or updated
        return () => {
            links.forEach(({ href }) => {
                const link = document.querySelector(`link[href="${href}"]`);
                if (link) {
                    document.head.removeChild(link);
                }
            });
        };
    }, []);
    
    return(
        <>
        <textarea ref={summernoteRef} id="summernote"></textarea>
        </>
    )
}