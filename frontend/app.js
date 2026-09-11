console.log("AI英语助手启动");


// =====================
// 获取元素
// =====================

const btn = document.getElementById("analyzeBtn");

const fileInput = document.getElementById("fileInput");

const result = document.getElementById("result");

const wordCard = document.getElementById("wordCard");



console.log("按钮:", btn);
console.log("文件:", fileInput);
console.log("结果:", result);




// =====================
// 上传分析
// =====================


btn.onclick = async function(){


    console.log("按钮点击");


    const file = fileInput.files[0];


    if(!file){

        alert("请选择Word文件");

        return;

    }



    result.innerHTML =
    "正在分析，请稍等...";



    let formData = new FormData();


    formData.append(
        "file",
        file
    );




    try{


        const response = await fetch(

            "http://127.0.0.1:8000/upload",

            {

                method:"POST",

                body:formData

            }

        );



        const data = await response.json();



        console.log(
            "后端返回:",
            data
        );




        // =====================
        // 英文拆词
        // =====================


        let words = data.content.split(/\s+/);



        let html = "";



        words.forEach(word=>{


            let cleanWord =
            word.replace(
                /[.,!?;:'"()]/g,
                ""
            );



            html += `

            <span 
            class="word"
            onclick="showWord('${cleanWord}')">

            ${word}

            </span>


            `;



        });






        result.innerHTML = `


        <h2>
        原文内容:
        </h2>



        <div class="content">

        ${html}

        </div>




        <h2>
        中文翻译:
        </h2>




        <div class="content">

        ${data.translation}

        </div>



        `;



        console.log(
            "显示完成"
        );



    }



    catch(error){


        console.log(
            "上传错误:",
            error
        );


        result.innerHTML =
        "上传失败";


    }



};







// =====================
// 点击单词查询
// =====================


window.showWord = async function(word){



    console.log(
        "查询单词:",
        word
    );




    wordCard.style.display =
    "block";




    document.getElementById(
        "wordTitle"
    ).innerHTML =
    word;





    document.getElementById(
        "wordMeaning"
    ).innerHTML =
    "中文：查询中...";





    document.getElementById(
        "wordExample"
    ).innerHTML =
    "例句：查询中...";





    try{


        const response = await fetch(

            `http://127.0.0.1:8000/word?word=${encodeURIComponent(word)}`

        );




        const data =
        await response.json();




        console.log(
            "单词返回:",
            data
        );





        document.getElementById(
            "wordMeaning"
        ).innerHTML =
        "中文：" + data.meaning;





        document.getElementById(
            "wordExample"
        ).innerHTML =
        "例句：" + data.example;




    }



    catch(error){


        console.log(
            "单词查询失败:",
            error
        );



        document.getElementById(
            "wordMeaning"
        ).innerHTML =
        "中文：查询失败";


    }




};









// =====================
// 关闭单词卡片
// =====================


document.getElementById(
    "closeWord"
)
.onclick=function(){


    wordCard.style.display =
    "none";


};