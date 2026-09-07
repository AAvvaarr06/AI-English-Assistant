console.log("AI助手启动");


const button = document.getElementById("analyzeBtn");

const fileInput = document.getElementById("fileInput");

const result = document.getElementById("result");



let running = false;



button.onclick = async function(){


    if(running){

        console.log("阻止重复点击");

        return;

    }


    running = true;



    console.log("开始一次分析");



    let file = fileInput.files[0];
    console.log("选择的文件:", file);



    if(!file){

        alert("请选择文件");

        running=false;

        return;

    }



    let formData = new FormData();


    formData.append(
        "file",
        file
    );



    result.innerHTML="正在分析...";



    try{


        let response = await fetch(
            "http://127.0.0.1:8000/upload",
            {

                method:"POST",

                body:formData

            }
        );



        let data = await response.json();



        console.log(data);



        result.innerHTML =
        `
        <h2>${data.message}</h2>

        <pre>${data.result}</pre>
        `;



    }


    catch(e){

        console.log(e);

        result.innerHTML="失败";

    }



    running=false;


}
window.addEventListener("beforeunload", function(){

    console.log("网页正在刷新");

});