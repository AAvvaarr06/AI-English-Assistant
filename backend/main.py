from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from docx import Document

import os



app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def home():

    return {
        "message":"AI英语助手运行成功"
    }




@app.post("/upload")
async def upload(file: UploadFile = File(...)):



    print("收到文件:",file.filename)



    # 保存文件

    file_path = "uploads/" + file.filename


    with open(file_path,"wb") as f:

        f.write(await file.read())




    # 读取docx

    doc = Document(file_path)


    text = ""


    for paragraph in doc.paragraphs:

        text += paragraph.text + "\n"




    print("文章内容:")

    print(text)



    result = f"""

【原文内容】

{text}



【重点单词】

等待AI分析...



【中文翻译】

等待AI分析...



【语法解析】

等待AI分析...



"""



    return {

        "message":"文章读取成功",

        "result":result

    }